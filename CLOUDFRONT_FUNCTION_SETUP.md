# CloudFront Function Setup for Next.js Static Site

This document explains how to set up a CloudFront function to handle routing for your Next.js static site, solving the issue where direct URL access (like `/aa`) returns 404 errors.

## Problem

When using Next.js with static export (`output: 'export'`), the generated files follow this structure:
- `/aa` → `/aa/index.html`
- `/about` → `/about/index.html`

However, when users directly access URLs like `https://yourdomain.com/aa`, CloudFront looks for a file at `/aa` instead of `/aa/index.html`, resulting in 404 errors.

## Solution

A CloudFront function intercepts viewer requests and rewrites the URI to append `/index.html` when needed.

## Files Created

1. **`cloudfront-function.js`** - The CloudFront function code
2. **`deploy-cloudfront-function.sh`** - Script to deploy the function via AWS CLI
3. **`cloudfront-config.json`** - Updated CloudFront configuration
4. **`deploy.sh`** - Enhanced deployment script with function deployment option

## Setup Instructions

### Method 1: Using AWS CLI (Recommended)

1. **Deploy the CloudFront function:**
   ```bash
   ./deploy-cloudfront-function.sh
   ```

2. **Update your CloudFront distribution configuration:**
   - Replace `YOUR_ACCOUNT_ID` in `cloudfront-config.json` with your actual AWS account ID
   - Apply the configuration to your CloudFront distribution

3. **Deploy your site with function:**
   ```bash
   ./deploy.sh --function
   ```

### Method 2: Using AWS Console

1. **Create the CloudFront Function:**
   - Navigate to CloudFront service in AWS Console
   - Click "Functions" in the left menu
   - Click "Create function"
   - Name: `next-js-rewrite`
   - Copy the code from `cloudfront-function.js`
   - Click "Save changes"
   - Go to "Publish" tab and click "Publish function"

2. **Associate with Distribution:**
   - Go to your CloudFront distribution
   - Click "Behaviors" tab
   - Select the default behavior and click "Edit"
   - Scroll to "Function associations"
   - For "Viewer request" event type, select "CloudFront Function"
   - Choose `next-js-rewrite` from the dropdown
   - Click "Save changes"

3. **Invalidate Cache:**
   - Go to "Invalidations" tab
   - Create invalidation for `/*`

## How It Works

The CloudFront function code:

```javascript
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
```

**Logic:**
- If URI ends with `/` (e.g., `/aa/`), append `index.html` → `/aa/index.html`
- If URI has no file extension (e.g., `/aa`), append `/index.html` → `/aa/index.html`
- Otherwise, leave URI unchanged

## Testing

After deployment, test these URLs:
- `https://yourdomain.com/` → Should serve `/index.html`
- `https://yourdomain.com/aa` → Should serve `/aa/index.html`
- `https://yourdomain.com/about` → Should serve `/about/index.html`
- `https://yourdomain.com/style.css` → Should serve `/style.css` (unchanged)

## Deployment Commands

```bash
# Deploy function only
./deploy-cloudfront-function.sh

# Deploy site with function
./deploy.sh --function

# Standard deployment (without function)
./deploy.sh

# Show help
./deploy.sh --help
```

## Configuration Details

### CloudFront Function Association

The function is associated with the default cache behavior:

```json
"FunctionAssociations": {
    "Quantity": 1,
    "Items": [
        {
            "EventType": "viewer-request",
            "FunctionARN": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:function/next-js-rewrite"
        }
    ]
}
```

### Next.js Configuration

Your `next.config.ts` should have:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

## Troubleshooting

### Function Not Working
1. Verify the function is published (not just saved)
2. Check the function ARN in your distribution configuration
3. Ensure the function is associated with the correct behavior
4. Create a cache invalidation for `/*`

### 404 Errors Persist
1. Check that your S3 bucket contains the correct file structure
2. Verify the function code is correct
3. Test the function in the CloudFront console
4. Check CloudFront logs for function execution

### Deployment Issues
1. Ensure AWS CLI is configured with correct profile
2. Verify you have CloudFront permissions
3. Check that the function name doesn't conflict with existing functions

## Cost Considerations

CloudFront functions are very cost-effective:
- First 2 million requests per month: Free
- Additional requests: $0.50 per million requests

This is significantly cheaper than Lambda@Edge for simple routing logic.

## Security Notes

- CloudFront functions run at edge locations
- They have access to the request object only
- No access to AWS services or external APIs
- Perfect for simple request/response transformations

## Next Steps

After successful setup:
1. Monitor CloudFront metrics for function execution
2. Test all your site's routes
3. Update your deployment process to include function deployment
4. Consider adding more complex routing logic if needed
