#!/bin/bash

# Deploy script for CareerMap website

echo "🚀 Deploying CareerMap website..."

# Build the project
echo "📦 Building project..."
npm run build:client

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in dist/spa/"
    echo ""
    echo "🌐 Ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo "1. GitHub Pages: Push to main branch (auto-deploy enabled)"
    echo "2. Netlify: Upload dist/spa folder to netlify.com"
    echo "3. Vercel: Connect GitHub repo to vercel.com"
    echo ""
    echo "📋 Build summary:"
    echo "- Output directory: dist/spa/"
    echo "- SPA mode: Enabled"
    echo "- Client-side routing: Configured"
    echo "- Assets optimized: Yes"
    echo ""
    echo "🎯 Your website is ready to go live!"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
