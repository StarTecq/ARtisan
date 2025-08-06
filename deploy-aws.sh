#!/bin/bash

# AWS S3 Static Website Deployment Script
# Run this after configuring AWS CLI

# Configuration
BUCKET_NAME="artisan-web-static-site"
REGION="us-east-1"
CLOUDFRONT_DISTRIBUTION_ID=""  # Will be populated after first deployment

echo "🚀 Deploying ARtisan to AWS S3..."

# Create S3 bucket if it doesn't exist
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists"

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Upload files with proper content types
echo "📁 Uploading HTML files..."
aws s3 cp index.html s3://$BUCKET_NAME/ --content-type "text/html"

echo "🎨 Uploading CSS files..."
aws s3 cp styles.css s3://$BUCKET_NAME/ --content-type "text/css"

echo "⚡ Uploading JavaScript files..."
aws s3 cp script.js s3://$BUCKET_NAME/ --content-type "application/javascript"

echo "📄 Uploading configuration files..."
aws s3 cp package.json s3://$BUCKET_NAME/ --content-type "application/json"
aws s3 cp README.md s3://$BUCKET_NAME/ --content-type "text/markdown"

# Set bucket policy for public read access
echo "🔓 Setting bucket policy..."
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
    }
  ]
}'

# Invalidate CloudFront cache if distribution ID is set
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
fi

echo "✅ Deployment complete!"
echo "🌐 S3 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "🚀 Next steps:"
echo "1. Set up CloudFront distribution for HTTPS and better performance"
echo "2. Configure custom domain (optional)"
echo "3. Update CLOUDFRONT_DISTRIBUTION_ID in this script for future deployments"
