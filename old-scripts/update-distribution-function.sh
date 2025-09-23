#!/bin/bash

# Update CloudFront Distribution Function Script
# This script updates the CloudFront distribution to use the new domain routing function

set -e  # Exit on any error

# Configuration
DISTRIBUTION_ID="E3CED6WX6SU9JL"
FUNCTION_NAME="OneEqual-Domain-Routing-Function"
AWS_PROFILE="Production"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Updating CloudFront Distribution Function...${NC}"

# Step 1: Get current distribution configuration
echo -e "${YELLOW}📋 Getting current distribution configuration...${NC}"
aws cloudfront get-distribution-config \
    --id $DISTRIBUTION_ID \
    --profile $AWS_PROFILE \
    --query 'DistributionConfig' \
    --output json > current-distribution-config.json

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to get distribution configuration!${NC}"
    exit 1
fi

# Step 2: Get the ETag
ETAG=$(aws cloudfront get-distribution-config \
    --id $DISTRIBUTION_ID \
    --profile $AWS_PROFILE \
    --query 'ETag' \
    --output text)

echo -e "${GREEN}✅ Retrieved distribution configuration${NC}"

# Step 3: Get function ARN
echo -e "${YELLOW}🔍 Getting function ARN...${NC}"
FUNCTION_ARN=$(aws cloudfront list-functions \
    --profile $AWS_PROFILE \
    --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].FunctionMetadata.FunctionARN" \
    --output text | grep -o "arn:aws:cloudfront::[0-9][0-9]*:function/[a-zA-Z0-9_-]*" | head -1)

if [ -z "$FUNCTION_ARN" ]; then
    echo -e "${RED}❌ Function '$FUNCTION_NAME' not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Function ARN: $FUNCTION_ARN${NC}"

# Step 4: Update the configuration with new function
echo -e "${YELLOW}📝 Updating distribution configuration...${NC}"

# Create updated config with new function
cat > updated-distribution-config.json << EOF
{
    "CallerReference": "onemoney-site-2025-01-15-1944",
    "Aliases": {
        "Quantity": 2,
        "Items": [
            "equal.moneyone.in",
            "mo.moneyone.in"
        ]
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-one-equal-website",
                "DomainName": "one-equal-website.s3.ap-south-1.amazonaws.com",
                "OriginPath": "",
                "CustomHeaders": {
                    "Quantity": 0
                },
                "ConnectionAttempts": 3,
                "ConnectionTimeout": 10,
                "OriginShield": {
                    "Enabled": false
                },
                "OriginAccessControlId": "E3PWPBI65FJEG3"
            }
        ]
    },
    "OriginGroups": {
        "Quantity": 0
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-one-equal-website",
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
    "Comment": "Distribution for OneEqual-Website Next.js website with domain routing",
    "Logging": {
        "Enabled": false,
        "IncludeCookies": false,
        "Bucket": "",
        "Prefix": ""
    },
    "PriceClass": "PriceClass_All",
    "Enabled": true,
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": false,
        "ACMCertificateArn": "arn:aws:acm:us-east-1:965964925394:certificate/YOUR_CERTIFICATE_ID",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021",
        "CertificateSource": "acm"
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

# Step 5: Update the distribution
echo -e "${YELLOW}🚀 Updating CloudFront distribution...${NC}"
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file://updated-distribution-config.json \
    --if-match $ETAG \
    --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Distribution updated successfully!${NC}"
else
    echo -e "${RED}❌ Failed to update distribution!${NC}"
    exit 1
fi

# Step 6: Create cache invalidation
echo -e "${YELLOW}🔄 Creating cache invalidation...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --profile $AWS_PROFILE \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Cache invalidation created!${NC}"
    echo -e "${BLUE}📋 Invalidation ID: $INVALIDATION_ID${NC}"
else
    echo -e "${RED}❌ Failed to create cache invalidation!${NC}"
    exit 1
fi

# Cleanup
rm -f current-distribution-config.json updated-distribution-config.json

echo -e "${GREEN}🎉 Distribution function update completed successfully!${NC}"
echo -e "${BLUE}📋 Distribution ID: $DISTRIBUTION_ID${NC}"
echo -e "${BLUE}📋 Function ARN: $FUNCTION_ARN${NC}"
echo -e "${BLUE}📋 Custom Domains: equal.moneyone.in, mo.moneyone.in${NC}"
echo -e "${YELLOW}⏳ Note: Changes may take 5-15 minutes to propagate globally.${NC}"
