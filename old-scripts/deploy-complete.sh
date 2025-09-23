#!/bin/bash

# OneMoney Complete Deployment Script
# This script sets up infrastructure and deploys the Next.js site
# Usage: ./deploy-complete.sh [--infrastructure-only] [--deploy-only] [--help]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
INFRASTRUCTURE_ONLY=false
DEPLOY_ONLY=false
SHOW_HELP=false

for arg in "$@"; do
    case $arg in
        --infrastructure-only)
        INFRASTRUCTURE_ONLY=true
        shift
        ;;
        --deploy-only)
        DEPLOY_ONLY=true
        shift
        ;;
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
    echo "OneMoney Complete Deployment Script"
    echo ""
    echo "This script can:"
    echo "  1. Set up AWS infrastructure (S3, CloudFront, Function)"
    echo "  2. Build and deploy the Next.js application"
    echo "  3. Or do both in sequence"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --infrastructure-only    Only set up AWS infrastructure"
    echo "  --deploy-only           Only build and deploy (skip infrastructure)"
    echo "  --help                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                      # Full setup and deployment"
    echo "  $0 --infrastructure-only # Only create AWS resources"
    echo "  $0 --deploy-only        # Only deploy (infrastructure must exist)"
    echo ""
    echo "Prerequisites:"
    echo "  - AWS CLI configured with appropriate permissions"
    echo "  - Node.js and npm installed"
    echo "  - Next.js application ready"
    exit 0
fi

echo -e "${BLUE}🚀 Starting OneMoney Complete Deployment...${NC}"

# Step 1: Infrastructure Setup
if [ "$DEPLOY_ONLY" = false ]; then
    echo -e "${YELLOW}🏗️  Setting up AWS infrastructure...${NC}"
    ./setup-infrastructure.sh
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Infrastructure setup completed!${NC}"
    else
        echo -e "${RED}❌ Infrastructure setup failed!${NC}"
        exit 1
    fi
    
    if [ "$INFRASTRUCTURE_ONLY" = true ]; then
        echo -e "${GREEN}🎉 Infrastructure-only deployment completed!${NC}"
        echo -e "${YELLOW}💡 Run './deploy-complete.sh --deploy-only' to deploy your site later.${NC}"
        exit 0
    fi
    
    echo ""
fi

# Step 2: Application Deployment
if [ "$INFRASTRUCTURE_ONLY" = false ]; then
    echo -e "${YELLOW}📦 Deploying Next.js application...${NC}"
    ./deploy.sh
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Application deployment completed!${NC}"
    else
        echo -e "${RED}❌ Application deployment failed!${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}🎉 Complete deployment finished successfully!${NC}"
echo -e "${YELLOW}⏳ Note: CloudFront changes may take 10-15 minutes to propagate globally.${NC}"
