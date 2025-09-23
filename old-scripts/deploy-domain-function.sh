#!/bin/bash

# Domain Routing CloudFront Function Deployment Script
# This script creates and deploys the enhanced CloudFront function for domain-based routing

set -e  # Exit on any error

# Configuration
FUNCTION_NAME="OneEqual-Domain-Routing-Function"
AWS_PROFILE="Production"
FUNCTION_CODE_FILE="domain-routing-function.js"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Domain Routing CloudFront Function Deployment...${NC}"

# Check if function code file exists
if [ ! -f "$FUNCTION_CODE_FILE" ]; then
    echo -e "${RED}❌ Function code file $FUNCTION_CODE_FILE not found!${NC}"
    exit 1
fi

# Step 1: Check if function already exists
echo -e "${YELLOW}🔍 Checking if function already exists...${NC}"
FUNCTION_EXISTS=$(aws cloudfront list-functions \
    --profile $AWS_PROFILE \
    --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].Name" \
    --output text 2>/dev/null | grep -o "$FUNCTION_NAME" | head -1 || echo "NOT_FOUND")

echo -e "${BLUE}Debug: Function check result: $FUNCTION_EXISTS${NC}"

if [ "$FUNCTION_EXISTS" = "$FUNCTION_NAME" ]; then
    echo -e "${YELLOW}📝 Function exists, updating...${NC}"
    
    # Get fresh ETag for update
    FRESH_ETAG=$(aws cloudfront describe-function \
        --name $FUNCTION_NAME \
        --profile $AWS_PROFILE \
        --query 'ETag' \
        --output text)
    
    # Update existing function
    aws cloudfront update-function \
        --name $FUNCTION_NAME \
        --function-code fileb://$FUNCTION_CODE_FILE \
        --function-config Comment="Domain-based routing function for equal.in moneyone.in and onemoney.in",Runtime="cloudfront-js-1.0" \
        --if-match $FRESH_ETAG \
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
        --function-config Comment="Domain-based routing function for equal.in moneyone.in and onemoney.in",Runtime="cloudfront-js-1.0" \
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
FUNCTION_ETAG=$(aws cloudfront describe-function \
    --name $FUNCTION_NAME \
    --profile $AWS_PROFILE \
    --query 'ETag' \
    --output text)

aws cloudfront publish-function \
    --name $FUNCTION_NAME \
    --if-match $FUNCTION_ETAG \
    --profile $AWS_PROFILE \
    --output text

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Function published successfully!${NC}"
else
    echo -e "${RED}❌ Function publish failed!${NC}"
    exit 1
fi

# Step 3: Get function ARN
echo -e "${YELLOW}🔗 Getting function ARN...${NC}"
FUNCTION_ARN=$(aws cloudfront describe-function \
    --name $FUNCTION_NAME \
    --profile $AWS_PROFILE \
    --query 'FunctionSummary.FunctionARN' \
    --output text)

echo -e "${GREEN}🎉 Domain Routing CloudFront Function deployment completed successfully!${NC}"
echo -e "${BLUE}📋 Function Name: $FUNCTION_NAME${NC}"
echo -e "${BLUE}📋 Function ARN: $FUNCTION_ARN${NC}"
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo -e "${YELLOW}   1. Update CloudFront distribution with custom domains${NC}"
echo -e "${YELLOW}   2. Configure SSL certificates for equal.moneyone.in and mo.moneyone.in${NC}"
echo -e "${YELLOW}   3. Update distribution to use this new function${NC}"
echo -e "${YELLOW}   4. Configure DNS records to point to CloudFront${NC}"
