#!/bin/bash

# OneMoney Website Deployment Script
# This script builds the Next.js app, uploads to S3, and invalidates CloudFront cache

set -e  # Exit on any error

# Configuration
BUCKET_NAME="onemoney-site"
DISTRIBUTION_ID="E1STWZPM97FGQV"
AWS_PROFILE="client"
BUILD_DIR="out"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting OneMoney Website Deployment...${NC}"

# Step 1: Clean previous build
echo -e "${YELLOW}📦 Cleaning previous build...${NC}"
rm -rf $BUILD_DIR

# Step 2: Build the Next.js application
echo -e "${YELLOW}🔨 Building Next.js application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed! $BUILD_DIR directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Step 3: Upload to S3
echo -e "${YELLOW}☁️  Uploading to S3 bucket: $BUCKET_NAME...${NC}"
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --profile $AWS_PROFILE --delete

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Upload to S3 completed successfully!${NC}"
else
    echo -e "${RED}❌ Upload to S3 failed!${NC}"
    exit 1
fi

# Step 4: Invalidate CloudFront cache
echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --profile $AWS_PROFILE \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ CloudFront cache invalidation started!${NC}"
    echo -e "${BLUE}📋 Invalidation ID: $INVALIDATION_ID${NC}"
else
    echo -e "${RED}❌ CloudFront cache invalidation failed!${NC}"
    exit 1
fi

# Step 5: Get CloudFront domain
echo -e "${YELLOW}🌐 Getting CloudFront domain...${NC}"
CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --profile $AWS_PROFILE \
    --query 'Distribution.DomainName' \
    --output text)

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}🌐 Your website is available at: https://$CLOUDFRONT_DOMAIN${NC}"
echo -e "${BLUE}📋 CloudFront Distribution ID: $DISTRIBUTION_ID${NC}"
echo -e "${BLUE}📋 S3 Bucket: $BUCKET_NAME${NC}"
echo -e "${YELLOW}⏳ Note: It may take a few minutes for changes to propagate globally.${NC}"
