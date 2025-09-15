#!/bin/bash

# CloudFront Function Deployment Script
# This script creates and deploys the CloudFront function for Next.js routing

set -e  # Exit on any error

# Configuration
FUNCTION_NAME="next-js-rewrite"
AWS_PROFILE="client"
FUNCTION_CODE_FILE="cloudfront-function.js"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting CloudFront Function Deployment...${NC}"

# Check if function code file exists
if [ ! -f "$FUNCTION_CODE_FILE" ]; then
    echo -e "${RED}❌ Function code file $FUNCTION_CODE_FILE not found!${NC}"
    exit 1
fi

# Step 1: Check if function already exists
echo -e "${YELLOW}🔍 Checking if function already exists...${NC}"
FUNCTION_EXISTS=$(aws cloudfront get-function \
    --name $FUNCTION_NAME \
    --profile $AWS_PROFILE \
    --query 'ETag' \
    --output text 2>/dev/null || echo "NOT_FOUND")

if [ "$FUNCTION_EXISTS" != "NOT_FOUND" ]; then
    echo -e "${YELLOW}📝 Function exists, updating...${NC}"
    
    # Update existing function
    aws cloudfront update-function \
        --name $FUNCTION_NAME \
        --function-code fileb://$FUNCTION_CODE_FILE \
        --if-match $FUNCTION_EXISTS \
        --profile $AWS_PROFILE
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Function updated successfully!${NC}"
    else
        echo -e "${RED}❌ Function update failed!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}📝 Creating new function...${NC}"
    
    # Create new function
    aws cloudfront create-function \
        --name $FUNCTION_NAME \
        --function-code fileb://$FUNCTION_CODE_FILE \
        --function-config Comment="Next.js routing function for static site",Runtime="cloudfront-js-1.0" \
        --profile $AWS_PROFILE
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Function created successfully!${NC}"
    else
        echo -e "${RED}❌ Function creation failed!${NC}"
        exit 1
    fi
fi

# Step 2: Publish the function
echo -e "${YELLOW}📤 Publishing function...${NC}"
FUNCTION_ETAG=$(aws cloudfront get-function \
    --name $FUNCTION_NAME \
    --profile $AWS_PROFILE \
    --query 'ETag' \
    --output text)

aws cloudfront publish-function \
    --name $FUNCTION_NAME \
    --if-match $FUNCTION_ETAG \
    --profile $AWS_PROFILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Function published successfully!${NC}"
else
    echo -e "${RED}❌ Function publish failed!${NC}"
    exit 1
fi

# Step 3: Get function ARN
echo -e "${YELLOW}🔗 Getting function ARN...${NC}"
FUNCTION_ARN=$(aws cloudfront get-function \
    --name $FUNCTION_NAME \
    --profile $AWS_PROFILE \
    --query 'FunctionSummary.FunctionARN' \
    --output text)

echo -e "${GREEN}🎉 CloudFront Function deployment completed successfully!${NC}"
echo -e "${BLUE}📋 Function Name: $FUNCTION_NAME${NC}"
echo -e "${BLUE}📋 Function ARN: $FUNCTION_ARN${NC}"
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo -e "${YELLOW}   1. Update your CloudFront distribution configuration${NC}"
echo -e "${YELLOW}   2. Associate this function with your distribution's default behavior${NC}"
echo -e "${YELLOW}   3. Set EventType to 'viewer-request'${NC}"
echo -e "${YELLOW}   4. Create a cache invalidation for /*${NC}"
