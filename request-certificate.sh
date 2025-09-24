#!/bin/bash

# Request New ACM Certificate Script
# This script requests a new certificate for equal.in, moneyone.in, and onemoney.in

set -e  # Exit on any error

# Configuration
AWS_PROFILE="Production"
AWS_REGION="us-east-1"  # CloudFront requires certificates in us-east-1
CERTIFICATE_DOMAINS="equal.in,moneyone.in,onemoney.in"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Requesting New ACM Certificate...${NC}"

# Step 1: Request the certificate
echo -e "${YELLOW}📋 Requesting certificate for domains: $CERTIFICATE_DOMAINS${NC}"

CERTIFICATE_ARN=$(aws acm request-certificate \
    --domain-name "equal.in" \
    --subject-alternative-names "moneyone.in" "onemoney.in" \
    --validation-method DNS \
    --region $AWS_REGION \
    --profile $AWS_PROFILE \
    --query 'CertificateArn' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Certificate requested successfully!${NC}"
    echo -e "${BLUE}📋 Certificate ARN: $CERTIFICATE_ARN${NC}"
else
    echo -e "${RED}❌ Failed to request certificate!${NC}"
    exit 1
fi

# Step 2: Get validation records
echo -e "${YELLOW}🔍 Getting DNS validation records...${NC}"

aws acm describe-certificate \
    --certificate-arn $CERTIFICATE_ARN \
    --region $AWS_REGION \
    --profile $AWS_PROFILE \
    --query 'Certificate.DomainValidationOptions[*].{Domain:DomainName,Name:ResourceRecord.Name,Value:ResourceRecord.Value,Type:ResourceRecord.Type}' \
    --output table

echo -e "${YELLOW}📋 DNS Validation Records Required:${NC}"
echo -e "${YELLOW}   You need to add these DNS records to validate the certificate:${NC}"

# Get detailed validation info
aws acm describe-certificate \
    --certificate-arn $CERTIFICATE_ARN \
    --region $AWS_REGION \
    --profile $AWS_PROFILE \
    --query 'Certificate.DomainValidationOptions[*].{Domain:DomainName,Name:ResourceRecord.Name,Value:ResourceRecord.Value,Type:ResourceRecord.Type}' \
    --output json > certificate-validation.json

echo -e "${GREEN}🎉 Certificate request completed!${NC}"
echo -e "${BLUE}📋 Certificate ARN: $CERTIFICATE_ARN${NC}"
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo -e "${YELLOW}   1. Add the DNS validation records to your domain DNS${NC}"
echo -e "${YELLOW}   2. Wait for certificate validation (5-30 minutes)${NC}"
echo -e "${YELLOW}   3. Update CloudFront distribution to use this certificate${NC}"
echo -e "${YELLOW}   4. Update domain routing function for the new domains${NC}"
echo -e "${YELLOW}📄 Validation details saved to: certificate-validation.json${NC}"

