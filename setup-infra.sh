#!/bin/bash

# Complete Infrastructure Setup Script
# This script sets up all AWS resources needed for the OneEqual website

set -e  # Exit on any error

# Configuration
AWS_PROFILE="Production"
AWS_REGION="us-east-1"
S3_BUCKET="one-equal-website"
FUNCTION_NAME="OneEqual-Redirection-Function"
DOMAIN_FUNCTION_NAME="OneEqual-Domain-Routing-Function"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up complete infrastructure for OneEqual website...${NC}"

# Step 1: Create S3 bucket
echo -e "${YELLOW}📦 Creating S3 bucket...${NC}"

if aws s3api head-bucket --bucket $S3_BUCKET --profile $AWS_PROFILE 2>/dev/null; then
    echo -e "${GREEN}✅ S3 bucket $S3_BUCKET already exists${NC}"
else
    aws s3api create-bucket --bucket $S3_BUCKET --region ap-south-1 --profile $AWS_PROFILE
    echo -e "${GREEN}✅ S3 bucket $S3_BUCKET created${NC}"
fi

# Step 2: Configure S3 bucket for static website hosting
echo -e "${YELLOW}🌐 Configuring S3 bucket for static website hosting...${NC}"

aws s3api put-bucket-website \
    --bucket $S3_BUCKET \
    --website-configuration '{
        "IndexDocument": {"Suffix": "index.html"},
        "ErrorDocument": {"Key": "404.html"}
    }' \
    --profile $AWS_PROFILE

echo -e "${GREEN}✅ S3 bucket configured for static website hosting${NC}"

# Step 3: Disable S3 public access block restrictions
echo -e "${YELLOW}🔓 Configuring S3 public access block...${NC}"

aws s3api put-public-access-block \
    --bucket $S3_BUCKET \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
    --profile $AWS_PROFILE

echo -e "${GREEN}✅ S3 public access block configured${NC}"

# Step 4: Create Origin Access Control (OAC)
echo -e "${YELLOW}🔐 Creating Origin Access Control...${NC}"

OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config '{
        "Name": "oac-'$S3_BUCKET'.s3.ap-south-1.amazonaws.com-mff339f7m8l",
        "Description": "Created by CloudFront",
        "SigningProtocol": "sigv4",
        "SigningBehavior": "always",
        "OriginAccessControlOriginType": "s3"
    }' \
    --profile $AWS_PROFILE \
    --query 'OriginAccessControl.Id' \
    --output text)

echo -e "${GREEN}✅ OAC created with ID: $OAC_ID${NC}"

# Step 5: Create S3 bucket policy for CloudFront
echo -e "${YELLOW}📋 Creating S3 bucket policy...${NC}"

# Get CloudFront distribution ARN (we'll update this after creating the distribution)
ACCOUNT_ID=$(aws sts get-caller-identity --profile $AWS_PROFILE --query 'Account' --output text)
DISTRIBUTION_ARN_PLACEHOLDER="arn:aws:cloudfront::$ACCOUNT_ID:distribution/*"

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
            "Resource": "arn:aws:s3:::$S3_BUCKET/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "$DISTRIBUTION_ARN_PLACEHOLDER"
                }
            }
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $S3_BUCKET --policy file://bucket-policy.json --profile $AWS_PROFILE
rm bucket-policy.json

echo -e "${GREEN}✅ S3 bucket policy created${NC}"

# Step 6: Create CloudFront function for Next.js routing
echo -e "${YELLOW}⚡ Creating CloudFront function for Next.js routing...${NC}"

# Check if function exists
if aws cloudfront list-functions --profile $AWS_PROFILE --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].Name" --output text | grep -q "$FUNCTION_NAME"; then
    echo -e "${GREEN}✅ Function $FUNCTION_NAME already exists${NC}"
else
    # Create the function
    cat > next-js-function.js << 'EOF'
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
EOF

    aws cloudfront create-function \
        --name $FUNCTION_NAME \
        --function-config '{
            "Comment": "Next.js routing function for OneEqual website",
            "Runtime": "cloudfront-js-1.0"
        }' \
        --function-code fileb://next-js-function.js \
        --profile $AWS_PROFILE

    rm next-js-function.js
    echo -e "${GREEN}✅ Function $FUNCTION_NAME created${NC}"
fi

# Step 7: Create domain routing function
echo -e "${YELLOW}🌐 Creating domain routing function...${NC}"

if aws cloudfront list-functions --profile $AWS_PROFILE --query "FunctionList.Items[?Name=='$DOMAIN_FUNCTION_NAME'].Name" --output text | grep -q "$DOMAIN_FUNCTION_NAME"; then
    echo -e "${GREEN}✅ Function $DOMAIN_FUNCTION_NAME already exists${NC}"
else
    # Create the domain routing function
    cat > domain-routing-function.js << 'EOF'
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var host = request.headers.host.value;

    // Domain-based routing
    if (host === 'moneyone.in') {
        // For moneyone.in, always serve moneyone content
        if (uri === '/' || uri === '') {
            request.uri = '/moneyone/index.html';
        } else if (uri.startsWith('/moneyone/')) {
            // Keep moneyone paths as-is
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else if (uri.startsWith('/_next/') || uri.startsWith('/favicon.ico') || uri.startsWith('/icon.') || uri.includes('.')) {
            // Keep static assets (CSS, JS, images, etc.) at root level
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else {
            // Redirect other paths to moneyone
            request.uri = '/moneyone' + uri;
            if (request.uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!request.uri.includes('.')) {
                request.uri += '/index.html';
            }
        }
    } else if (host === 'onemoney.moneyone.in') {
        // For onemoney.moneyone.in, always serve onemoney content
        if (uri === '/' || uri === '') {
            request.uri = '/onemoney/index.html';
        } else if (uri.startsWith('/onemoney/')) {
            // Keep onemoney paths as-is
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else if (uri.startsWith('/_next/') || uri.startsWith('/favicon.ico') || uri.startsWith('/icon.') || uri.includes('.')) {
            // Keep static assets (CSS, JS, images, etc.) at root level
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else {
            // Redirect other paths to onemoney
            request.uri = '/onemoney' + uri;
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        }
    } else if (host === 'equal.moneyone.in') {
        // For equal.moneyone.in, serve root content (default behavior)
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        } else if (!uri.includes('.')) {
            request.uri += '/index.html';
        }
    } else {
        // Default behavior for other domains (CloudFront domain)
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        } else if (!uri.includes('.')) {
            request.uri += '/index.html';
        }
    }

    return request;
}
EOF

    aws cloudfront create-function \
        --name $DOMAIN_FUNCTION_NAME \
        --function-config '{
            "Comment": "Domain routing function for OneEqual website",
            "Runtime": "cloudfront-js-1.0"
        }' \
        --function-code fileb://domain-routing-function.js \
        --profile $AWS_PROFILE

    rm domain-routing-function.js
    echo -e "${GREEN}✅ Function $DOMAIN_FUNCTION_NAME created${NC}"
fi

# Step 8: Create CloudFront distribution
echo -e "${YELLOW}🌐 Creating CloudFront distribution...${NC}"

# Get function ARN
FUNCTION_ARN=$(aws cloudfront list-functions --profile $AWS_PROFILE --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].FunctionMetadata.FunctionARN" --output text | grep -o "arn:aws:cloudfront::[0-9][0-9]*:function/[a-zA-Z0-9_-]*" | head -1)

cat > cloudfront-config.json << EOF
{
    "CallerReference": "one-equal-website-$(date +%s)",
    "Aliases": {
        "Quantity": 0
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "$S3_BUCKET.s3.ap-south-1.amazonaws.com-mff32r0pwvr",
                "DomainName": "$S3_BUCKET.s3.ap-south-1.amazonaws.com",
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
        "TargetOriginId": "$S3_BUCKET.s3.ap-south-1.amazonaws.com-mff32r0pwvr",
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
    "WebACLId": "",
    "HttpVersion": "http2",
    "IsIPV6Enabled": true,
    "ContinuousDeploymentPolicyId": "",
    "Staging": false
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config file://cloudfront-config.json \
    --profile $AWS_PROFILE \
    --query 'Distribution.Id' \
    --output text)

rm cloudfront-config.json

echo -e "${GREEN}✅ CloudFront distribution created with ID: $DISTRIBUTION_ID${NC}"

# Step 9: Update S3 bucket policy with actual distribution ARN
echo -e "${YELLOW}📋 Updating S3 bucket policy with distribution ARN...${NC}"

DISTRIBUTION_ARN="arn:aws:cloudfront::$ACCOUNT_ID:distribution/$DISTRIBUTION_ID"

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
            "Resource": "arn:aws:s3:::$S3_BUCKET/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "$DISTRIBUTION_ARN"
                }
            }
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $S3_BUCKET --policy file://bucket-policy.json --profile $AWS_PROFILE
rm bucket-policy.json

echo -e "${GREEN}✅ S3 bucket policy updated with distribution ARN${NC}"

# Step 10: Get distribution domain name
DISTRIBUTION_DOMAIN=$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --profile $AWS_PROFILE --query 'Distribution.DomainName' --output text)

echo -e "${GREEN}🎉 Infrastructure setup completed successfully!${NC}"
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "${BLUE}   S3 Bucket: $S3_BUCKET${NC}"
echo -e "${BLUE}   CloudFront Distribution ID: $DISTRIBUTION_ID${NC}"
echo -e "${BLUE}   CloudFront Domain: $DISTRIBUTION_DOMAIN${NC}"
echo -e "${BLUE}   OAC ID: $OAC_ID${NC}"
echo -e "${BLUE}   Function: $FUNCTION_NAME${NC}"
echo -e "${BLUE}   Domain Function: $DOMAIN_FUNCTION_NAME${NC}"
echo -e "${YELLOW}⚠️  Note: Distribution may take 5-15 minutes to deploy globally${NC}"
echo -e "${YELLOW}🌐 Test URL: https://$DISTRIBUTION_DOMAIN/${NC}"

# Save configuration for deployment script
cat > infra-config.json << EOF
{
    "S3_BUCKET": "$S3_BUCKET",
    "DISTRIBUTION_ID": "$DISTRIBUTION_ID",
    "DISTRIBUTION_DOMAIN": "$DISTRIBUTION_DOMAIN",
    "OAC_ID": "$OAC_ID",
    "FUNCTION_NAME": "$FUNCTION_NAME",
    "DOMAIN_FUNCTION_NAME": "$DOMAIN_FUNCTION_NAME",
    "AWS_PROFILE": "$AWS_PROFILE",
    "AWS_REGION": "$AWS_REGION"
}
EOF

echo -e "${GREEN}💾 Configuration saved to infra-config.json${NC}"
