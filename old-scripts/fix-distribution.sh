#!/bin/bash

# Fix CloudFront Distribution Script
# This script fixes the Access Denied issue by updating the distribution configuration

set -e  # Exit on any error

# Configuration
DISTRIBUTION_ID="E16CMFSCAYXNCJ"
AWS_PROFILE="Production"
FUNCTION_NAME="OneEqual-Redirection-Function"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Fixing CloudFront Distribution...${NC}"

# Step 1: Get the function ARN
echo -e "${YELLOW}📋 Getting CloudFront function ARN...${NC}"

FUNCTION_ARN=$(aws cloudfront list-functions --profile $AWS_PROFILE --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].FunctionMetadata.FunctionARN" --output text | grep -o "arn:aws:cloudfront::[0-9][0-9]*:function/[a-zA-Z0-9_-]*" | head -1)

if [ -z "$FUNCTION_ARN" ]; then
    echo -e "${RED}❌ Function $FUNCTION_NAME not found!${NC}"
    echo -e "${YELLOW}💡 Please run: ./deploy-cloudfront-function.sh${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Function ARN: $FUNCTION_ARN${NC}"

# Step 2: Get current distribution config
echo -e "${YELLOW}📋 Getting current distribution configuration...${NC}"

aws cloudfront get-distribution-config --id $DISTRIBUTION_ID --profile $AWS_PROFILE > current-distribution-config.json

# Step 3: Update the distribution config
echo -e "${YELLOW}📋 Updating distribution configuration...${NC}"

# Create updated config with function association
cat > updated-distribution-config.json << EOF
{
    "CallerReference": "3636a747-5a1a-4071-b215-84885785c7cd",
    "Aliases": {
        "Quantity": 0
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "one-equal-website.s3.ap-south-1.amazonaws.com-mff32r0pwvr",
                "DomainName": "one-equal-website.s3.ap-south-1.amazonaws.com",
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
                "OriginAccessControlId": "E1JX0TGECK826X"
            }
        ]
    },
    "OriginGroups": {
        "Quantity": 0
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "one-equal-website.s3.ap-south-1.amazonaws.com-mff32r0pwvr",
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
                    "FunctionARN": "$FUNCTION_ARN",
                    "EventType": "viewer-request"
                }
            ]
        },
        "FieldLevelEncryptionId": "",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
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
    "Comment": "OneEqual Website Distribution",
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
    "WebACLId": "arn:aws:wafv2:us-east-1:965964925394:global/webacl/CreatedByCloudFront-e5322ac0/491601cd-786a-4fb3-a1a1-9cc1d5b1b9b6",
    "HttpVersion": "http2",
    "IsIPV6Enabled": true,
    "ContinuousDeploymentPolicyId": "",
    "Staging": false
}
EOF

# Step 4: Update the distribution
echo -e "${YELLOW}📋 Updating CloudFront distribution...${NC}"

aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file://updated-distribution-config.json \
    --if-match $(jq -r '.ETag' current-distribution-config.json) \
    --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Distribution updated successfully!${NC}"
    echo -e "${BLUE}📋 Distribution ID: $DISTRIBUTION_ID${NC}"
    echo -e "${YELLOW}⚠️  Note: Changes may take 5-15 minutes to propagate globally${NC}"
    echo -e "${YELLOW}🌐 Test URL: https://d2khd7r9ny8qtx.cloudfront.net/${NC}"
else
    echo -e "${RED}❌ Failed to update distribution!${NC}"
    exit 1
fi

# Cleanup
rm -f current-distribution-config.json updated-distribution-config.json

echo -e "${GREEN}🎉 Distribution fix completed!${NC}"
