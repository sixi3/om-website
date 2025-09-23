#!/bin/bash

# OneMoney Infrastructure Setup Script
# This script creates all AWS resources needed for the Next.js static site
# Usage: ./setup-infrastructure.sh [--help]

set -e  # Exit on any error

# Configuration
BUCKET_NAME="one-equal-website"
DISTRIBUTION_COMMENT="Distribution for OneEqual-Website Next.js website"
AWS_PROFILE="Production"
AWS_REGION="ap-south-1"
FUNCTION_NAME="one-equal-redirection-function"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
SHOW_HELP=false

for arg in "$@"; do
    case $arg in
        --help)
        SHOW_HELP=true
        shift
        ;;
        *)
        echo -e "${RED}❌ Unknown option: $arg${NC}"
        echo "Use --help for usage information"
        exit 1
        ;;
    esac
done

if [ "$SHOW_HELP" = true ]; then
    echo "OneMoney Infrastructure Setup Script"
    echo ""
    echo "This script creates:"
    echo "  - S3 bucket for static hosting"
    echo "  - CloudFront distribution"
    echo "  - CloudFront function for routing"
    echo "  - Origin Access Control (OAC)"
    echo "  - Bucket policy for CloudFront access"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help        Show this help message"
    echo ""
    echo "Prerequisites:"
    echo "  - AWS CLI configured with appropriate permissions"
    echo "  - AWS profile 'client' configured"
    echo "  - Next.js application built and ready"
    exit 0
fi

echo -e "${BLUE}🚀 Starting OneMoney Infrastructure Setup...${NC}"

# Step 1: Check AWS CLI and profile
echo -e "${YELLOW}🔍 Checking AWS CLI configuration...${NC}"
if ! aws sts get-caller-identity --profile $AWS_PROFILE >/dev/null 2>&1; then
    echo -e "${RED}❌ AWS CLI not configured or profile '$AWS_PROFILE' not found!${NC}"
    echo "Please run: aws configure --profile $AWS_PROFILE"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --profile $AWS_PROFILE --query 'Account' --output text)
echo -e "${GREEN}✅ AWS CLI configured. Account ID: $ACCOUNT_ID${NC}"

# Step 2: Create S3 bucket
echo -e "${YELLOW}🪣 Creating S3 bucket: $BUCKET_NAME...${NC}"
if aws s3api head-bucket --bucket $BUCKET_NAME --profile $AWS_PROFILE 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Bucket $BUCKET_NAME already exists${NC}"
else
    if [ "$AWS_REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket $BUCKET_NAME --profile $AWS_PROFILE
    else
        aws s3api create-bucket --bucket $BUCKET_NAME --region $AWS_REGION --create-bucket-configuration LocationConstraint=$AWS_REGION --profile $AWS_PROFILE
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ S3 bucket created successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to create S3 bucket!${NC}"
        exit 1
    fi
fi

# Step 3: Configure S3 bucket for static website hosting
echo -e "${YELLOW}🌐 Configuring S3 bucket for static website hosting...${NC}"
aws s3api put-bucket-website \
    --bucket $BUCKET_NAME \
    --website-configuration '{
        "IndexDocument": {"Suffix": "index.html"},
        "ErrorDocument": {"Key": "404.html"}
    }' \
    --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ S3 bucket configured for static hosting!${NC}"
else
    echo -e "${RED}❌ Failed to configure S3 bucket!${NC}"
    exit 1
fi

# Step 4: Create Origin Access Control (OAC)
echo -e "${YELLOW}🔐 Creating Origin Access Control...${NC}"
OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config '{
        "Name": "onemoney-oac",
        "Description": "OAC for onemoney-site S3 bucket",
        "SigningProtocol": "sigv4",
        "SigningBehavior": "always",
        "OriginAccessControlOriginType": "s3"
    }' \
    --profile $AWS_PROFILE \
    --query 'OriginAccessControl.Id' \
    --output text 2>/dev/null || echo "EXISTS")

if [ "$OAC_ID" = "EXISTS" ]; then
    echo -e "${YELLOW}⚠️  OAC already exists, getting ID...${NC}"
    OAC_ID=$(aws cloudfront list-origin-access-controls \
        --profile $AWS_PROFILE \
        --query 'OriginAccessControlList.Items[?Name==`onemoney-oac`].Id' \
        --output text)
fi

echo -e "${GREEN}✅ OAC ID: $OAC_ID${NC}"

# Step 5: Configure S3 bucket for CloudFront access
echo -e "${YELLOW}📋 Configuring S3 bucket for CloudFront access...${NC}"

# Disable public access block restrictions for OAC
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
    --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ S3 public access block configured!${NC}"
else
    echo -e "${RED}❌ Failed to configure S3 public access block!${NC}"
    exit 1
fi

# Create bucket policy for CloudFront access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$ACCOUNT_ID:distribution/*"
                }
            }
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ S3 bucket policy created!${NC}"
else
    echo -e "${RED}❌ Failed to create S3 bucket policy!${NC}"
    exit 1
fi

# Step 6: Create CloudFront function
echo -e "${YELLOW}⚡ Creating CloudFront function...${NC}"
if [ -f "cloudfront-function.js" ]; then
    # Check if function already exists
    FUNCTION_EXISTS=$(aws cloudfront list-functions \
        --profile $AWS_PROFILE \
        --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].Name" \
        --output text 2>/dev/null | head -1)
    
    if [ "$FUNCTION_EXISTS" = "$FUNCTION_NAME" ]; then
        echo -e "${YELLOW}⚠️  Function already exists, updating...${NC}"
        ./deploy-cloudfront-function.sh
    else
        echo -e "${YELLOW}📝 Creating new function...${NC}"
        ./deploy-cloudfront-function.sh
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ CloudFront function ready!${NC}"
    else
        echo -e "${RED}❌ Failed to create CloudFront function!${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ cloudfront-function.js not found!${NC}"
    exit 1
fi

# Step 7: Get function ARN
FUNCTION_ARN="arn:aws:cloudfront::965964925394:function/OneEqual-Redirection-Function"

echo -e "${BLUE}Debug: Function ARN: $FUNCTION_ARN${NC}"

# Step 8: Create CloudFront distribution
echo -e "${YELLOW}🌐 Creating CloudFront distribution...${NC}"
cat > distribution-config.json << EOF
{
    "CallerReference": "onemoney-site-$(date +%Y%m%d-%H%M%S)",
    "Aliases": {
        "Quantity": 0
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.$AWS_REGION.amazonaws.com",
                "OriginPath": "",
                "CustomHeaders": {
                    "Quantity": 0
                },
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                },
                "ConnectionAttempts": 3,
                "ConnectionTimeout": 10,
                "OriginShield": {
                    "Enabled": false
                },
                "OriginAccessControlId": "$OAC_ID"
            }
        ]
    },
    "OriginGroups": {
        "Quantity": 0
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "TrustedKeyGroups": {
            "Enabled": false,
            "Quantity": 0
        },
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": [
                "HEAD",
                "GET"
            ],
            "CachedMethods": {
                "Quantity": 2,
                "Items": [
                    "HEAD",
                    "GET"
                ]
            }
        },
        "SmoothStreaming": false,
        "Compress": true,
        "LambdaFunctionAssociations": {
            "Quantity": 0
        },
        "FunctionAssociations": {
            "Quantity": 1,
            "Items": [
                {
                    "EventType": "viewer-request",
                    "FunctionARN": "$FUNCTION_ARN"
                }
            ]
        },
        "FieldLevelEncryptionId": "",
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        "GrpcConfig": {
            "Enabled": false
        }
    },
    "CacheBehaviors": {
        "Quantity": 0
    },
    "CustomErrorResponses": {
        "Quantity": 0
    },
    "Comment": "$DISTRIBUTION_COMMENT",
    "Logging": {
        "Enabled": false,
        "IncludeCookies": false,
        "Bucket": "",
        "Prefix": ""
    },
    "PriceClass": "PriceClass_All",
    "Enabled": true,
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true,
        "SSLSupportMethod": "vip",
        "MinimumProtocolVersion": "TLSv1",
        "CertificateSource": "cloudfront"
    },
    "Restrictions": {
        "GeoRestriction": {
            "RestrictionType": "none",
            "Quantity": 0
        }
    },
    "WebACLId": "",
    "HttpVersion": "http2",
    "IsIPV6Enabled": true,
    "ContinuousDeploymentPolicyId": "",
    "Staging": false
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config file://distribution-config.json \
    --profile $AWS_PROFILE \
    --query 'Distribution.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ CloudFront distribution created!${NC}"
    echo -e "${BLUE}📋 Distribution ID: $DISTRIBUTION_ID${NC}"
else
    echo -e "${RED}❌ Failed to create CloudFront distribution!${NC}"
    exit 1
fi

# Step 9: Get CloudFront domain
CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --profile $AWS_PROFILE \
    --query 'Distribution.DomainName' \
    --output text)

# Step 10: Update deploy.sh with new distribution ID
echo -e "${YELLOW}📝 Updating deploy.sh with new distribution ID...${NC}"
sed -i.bak "s/DISTRIBUTION_ID=\"E1STWZPM97FGQV\"/DISTRIBUTION_ID=\"$DISTRIBUTION_ID\"/" deploy.sh
rm -f deploy.sh.bak

# Step 11: Cleanup temporary files
rm -f bucket-policy.json distribution-config.json

echo -e "${GREEN}🎉 Infrastructure setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "${BLUE}  S3 Bucket: $BUCKET_NAME${NC}"
echo -e "${BLUE}  CloudFront Distribution ID: $DISTRIBUTION_ID${NC}"
echo -e "${BLUE}  CloudFront Domain: https://$CLOUDFRONT_DOMAIN${NC}"
echo -e "${BLUE}  Function Name: $FUNCTION_NAME${NC}"
echo -e "${BLUE}  OAC ID: $OAC_ID${NC}"
echo ""
echo -e "${YELLOW}⏳ Note: CloudFront distribution deployment may take 10-15 minutes.${NC}"
echo -e "${YELLOW}🚀 Next step: Run './deploy.sh' to build and deploy your site!${NC}"
