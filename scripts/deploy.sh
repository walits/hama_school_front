#!/bin/bash
set -e

# Hama School Front 배포 스크립트
# AWS S3 + CloudFront로 Next.js static site 배포

echo "🏗️  Building Next.js..."
npm run build

echo "📦 Uploading to S3..."
BUCKET_NAME=$(cd terraform && terraform output -raw s3_bucket_name)
aws s3 sync out/ s3://$BUCKET_NAME/ --delete

echo "🔄 Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Website: $(cd terraform && terraform output -raw website_url)"
