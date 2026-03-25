#!/bin/bash
# deploy-v2.sh - Deploy MindspanAI v2.0 to GitHub + Vercel
# Run this script from your Mac to push v2.0 live

set -e  # Exit on error

echo "🚀 MindspanAI v2.0 Deployment Script"
echo "===================================="
echo ""

# Check if we're in git repo
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Run this from: ~/Projects/mindspanai/"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Uncommitted changes detected"
    echo ""
    git status -s
    echo ""
    read -p "Commit all changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        echo "Enter commit message (or press Enter for default):"
        read commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="v2.0: AI-powered upgrade with Vercel + OpenRouter + Supabase"
        fi
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    else
        echo "❌ Deployment cancelled (uncommitted changes)"
        exit 1
    fi
fi

# Check current branch
current_branch=$(git branch --show-current)
echo "📍 Current branch: $current_branch"
echo ""

# Offer to create v2.0 branch if on main
if [ "$current_branch" == "main" ]; then
    read -p "Create v2.0 branch for testing? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout -b v2.0
        echo "✅ Created and switched to v2.0 branch"
        current_branch="v2.0"
    fi
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $current_branch
echo "✅ Pushed to GitHub: $current_branch"
echo ""

# Check if Vercel CLI installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found"
    echo "Install: npm install -g vercel"
    echo "Then run: vercel login"
    exit 1
fi

# Ask about Vercel deployment
read -p "Deploy to Vercel now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to Vercel..."
    echo ""
    
    # Check if .env.local exists
    if [ ! -f ".env.local" ]; then
        echo "⚠️  .env.local not found"
        echo "Copy .env.example and fill in your API keys:"
        echo "  cp .env.example .env.local"
        echo "  nano .env.local"
        echo ""
        read -p "Continue without .env.local? (environment variables must be set in Vercel dashboard) (y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ Deployment cancelled"
            exit 1
        fi
    fi
    
    # Deploy to Vercel
    if [ "$current_branch" == "main" ]; then
        vercel --prod
    else
        vercel
    fi
    
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "Next steps:"
    echo "1. Visit Vercel dashboard to see deployment URL"
    echo "2. Test live site"
    echo "3. Update SquareSpace iframe if URL changed"
    echo "4. Monitor Vercel function logs for errors"
else
    echo "⏭️  Skipping Vercel deployment"
    echo ""
    echo "To deploy later, run:"
    echo "  vercel --prod"
fi

echo ""
echo "======================================"
echo "🎉 Deployment script complete!"
echo "======================================"
echo ""
echo "GitHub: https://github.com/mindspanner/mindspanai"
echo "Vercel: https://vercel.com/dashboard"
echo "Supabase: https://supabase.com/dashboard"
echo ""
