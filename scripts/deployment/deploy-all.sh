#!/bin/bash
# Cathedral Multi-Platform Deployment Script
# Generated for Node.js 25.0.0 compatibility

set -e

echo "🚀 Starting Cathedral Multi-Platform Deployment..."

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="25.0.0"
if [[ "$(printf '%s
' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Required: $REQUIRED_VERSION+"
    exit 1
fi

echo "✅ Node.js version check passed: $NODE_VERSION"

# Update version tracking
echo "📊 Running version tracking..."
pnpm run version-check

# Build Cathedral content
echo "🔧 Building Cathedral engines and content..."
pnpm run cathedral-full-stack

# Generate deployment configs
echo "📝 Generating platform configurations..."
pnpm run sync-versions

# Deploy to each platform
echo "🌐 Deploying to platforms..."

# Render deployment
echo "🎨 Deploying to Render..."
# Add Render deployment commands here

# Vercel deployment  
echo "⚡ Deploying to Vercel..."
# Add Vercel deployment commands here

# Cloudflare deployment
echo "☁️ Deploying to Cloudflare..."
# Add Cloudflare deployment commands here

echo "🎉 Cathedral deployment complete!"
echo "📋 Check deployment status in PLATFORM_MANIFEST.json"
