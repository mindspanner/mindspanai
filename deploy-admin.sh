#!/bin/bash

# MindspanAI - Deploy Admin Backend
# This script deploys the admin panel and website scraper to Vercel

echo "🚀 MindspanAI Admin Backend Deployment"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Are you in the project directory?"
    exit 1
fi

# Check for required files
echo "📋 Checking required files..."
required_files=(
    "admin/login.html"
    "admin/dashboard.html"
    "api/admin/auth.js"
    "api/scrape-website.js"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done
echo "✅ All required files present"
echo ""

# Check environment variables
echo "🔐 Checking environment variables..."
if ! vercel env ls | grep -q "GOOGLE_CLIENT_ID"; then
    echo "⚠️  Warning: GOOGLE_CLIENT_ID not set in Vercel"
    echo "   Run: vercel env add GOOGLE_CLIENT_ID"
fi

if ! vercel env ls | grep -q "GOOGLE_CLIENT_SECRET"; then
    echo "⚠️  Warning: GOOGLE_CLIENT_SECRET not set in Vercel"
    echo "   Run: vercel env add GOOGLE_CLIENT_SECRET"
fi

if ! vercel env ls | grep -q "OPENROUTER_API_KEY"; then
    echo "⚠️  Warning: OPENROUTER_API_KEY not set in Vercel"
    echo "   Run: vercel env add OPENROUTER_API_KEY"
fi
echo ""

# Git status
echo "📝 Git status:"
git status --short
echo ""

# Confirm deployment
read -p "🤔 Deploy to production? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

# Add all changes
echo "📦 Staging changes..."
git add .

# Commit
read -p "💬 Commit message (default: 'Deploy admin backend'): " commit_msg
commit_msg=${commit_msg:-"Deploy admin backend"}
git commit -m "$commit_msg"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔗 Next steps:"
echo "   1. Visit https://mindspanai.vercel.app to test"
echo "   2. Click the ⚙️ gear icon to access admin panel"
echo "   3. Sign in with your @mindspan.com.au Google account"
echo ""
echo "📚 Documentation:"
echo "   - GOOGLE-OAUTH-SETUP.md - Setting up Google authentication"
echo "   - ADMIN-BACKEND-PLAN.md - Admin features overview"
echo "   - WEBSITE-SCRAPING-PLAN.md - Scraping system details"
echo ""
