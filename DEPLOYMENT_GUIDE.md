# OneMoney Website Deployment Guide

This guide explains how to deploy your Next.js static site to AWS using S3 and CloudFront with automatic routing.

## 🚀 Quick Start

### Option 1: Complete Setup and Deployment (Recommended)
```bash
# This will create all AWS resources and deploy your site
./deploy-complete.sh
```

### Option 2: Step-by-Step Deployment
```bash
# 1. Set up AWS infrastructure first
./setup-infrastructure.sh

# 2. Deploy your site
./deploy.sh
```

## 📁 Available Scripts

### 1. `setup-infrastructure.sh`
Creates all AWS resources needed for hosting:
- S3 bucket for static files
- CloudFront distribution
- CloudFront function for routing
- Origin Access Control (OAC)
- Bucket policies

**Usage:**
```bash
./setup-infrastructure.sh [--help]
```

### 2. `deploy-complete.sh`
Complete deployment solution with options:
- `--infrastructure-only`: Only create AWS resources
- `--deploy-only`: Only deploy site (infrastructure must exist)
- No flags: Full setup and deployment

**Usage:**
```bash
./deploy-complete.sh [OPTIONS]
```

### 3. `deploy.sh`
Deploy your Next.js site to existing infrastructure:
- `--function`: Deploy CloudFront function before site deployment
- `--help`: Show help

**Usage:**
```bash
./deploy.sh [--function] [--help]
```

### 4. `deploy-cloudfront-function.sh`
Deploy only the CloudFront function for routing.

**Usage:**
```bash
./deploy-cloudfront-function.sh
```

### 5. `associate-function.sh`
Associate an existing CloudFront function with your distribution.

**Usage:**
```bash
./associate-function.sh
```

## 🔧 Prerequisites

1. **AWS CLI configured:**
   ```bash
   aws configure --profile client
   ```

2. **Required permissions:**
   - CloudFront full access
   - S3 full access
   - IAM permissions for OAC creation

3. **Node.js and npm installed**

4. **Next.js application ready**

## 📋 What Gets Created

### AWS Resources
- **S3 Bucket**: `onemoney-site` (or your configured name)
- **CloudFront Distribution**: With custom domain support
- **CloudFront Function**: `next-js-rewrite` for routing
- **Origin Access Control**: Secure S3 access
- **Bucket Policy**: CloudFront-only access

### Files Created
- `cloudfront-function.js` - CloudFront function code
- `cloudfront-config.json` - CloudFront configuration
- Various deployment scripts

## 🌐 How Routing Works

The CloudFront function handles Next.js static export routing:

```
User Request          →  Function Rewrites To
/                     →  /index.html
/aa                   →  /aa/index.html
/about                →  /about/index.html
/style.css            →  /style.css (unchanged)
```

## 🚨 Troubleshooting

### Common Issues

1. **AWS CLI not configured:**
   ```bash
   aws configure --profile client
   ```

2. **Permission denied:**
   - Check AWS credentials
   - Verify IAM permissions

3. **Bucket already exists:**
   - Script will use existing bucket
   - Or change bucket name in configuration

4. **CloudFront function not working:**
   - Ensure function is published (not just saved)
   - Check function association in distribution
   - Create cache invalidation

### Debug Commands

```bash
# Check AWS configuration
aws sts get-caller-identity --profile client

# List S3 buckets
aws s3 ls --profile client

# List CloudFront distributions
aws cloudfront list-distributions --profile client

# Check CloudFront function
aws cloudfront get-function --name next-js-rewrite --profile client
```

## 📊 Monitoring

After deployment, monitor:
- CloudFront metrics in AWS Console
- S3 access logs
- Function execution metrics
- Cache hit rates

## 🔄 Updates and Maintenance

### Regular Deployments
```bash
# Just deploy changes
./deploy.sh
```

### Infrastructure Updates
```bash
# Update infrastructure
./setup-infrastructure.sh
```

### Function Updates
```bash
# Update only the routing function
./deploy-cloudfront-function.sh
```

## 💰 Cost Optimization

- CloudFront functions are very cost-effective
- S3 storage costs are minimal for static sites
- CloudFront pricing based on data transfer
- Consider using CloudFront's free tier

## 🔒 Security Features

- Origin Access Control (OAC) for secure S3 access
- HTTPS-only communication
- No direct S3 access (CloudFront only)
- Secure function execution at edge

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify AWS permissions
3. Check CloudFront distribution status
4. Review function logs in AWS Console
