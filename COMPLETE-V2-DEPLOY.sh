#!/bin/bash
# MindspanAI V2.0 - Complete Unattended Deployment
# This will install dependencies and prepare for Vercel deployment

set -e

echo "🚀 MindspanAI V2.0 - Complete Deployment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

PROJECT_DIR="/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"
cd "$PROJECT_DIR"

# Step 1: Install Vercel CLI if needed
echo "📦 Step 1: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi
echo ""

# Step 2: Verify files
echo "📋 Step 2: Verifying V2 files..."
if [ -f "index.html" ] && [ -f "app.js" ] && [ -f "package.json" ] && [ -f "vercel.json" ]; then
    echo "✅ All V2 files present"
else
    echo "❌ Missing V2 files. Run DEPLOY-V2-AUTOMATED.sh first"
    exit 1
fi
echo ""

# Step 3: Display API key instructions
echo "🔑 Step 3: API Keys Required"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Before deploying to Vercel, you need:"
echo ""
echo "1️⃣  OpenRouter API Key (REQUIRED)"
echo "   • Visit: https://openrouter.ai/keys"
echo "   • Sign in with GitHub"
echo "   • Create key: 'MindspanAI Production'"
echo "   • Copy the key (starts with sk-or-v1-...)"
echo ""
echo "2️⃣  Supabase Credentials (OPTIONAL - for analytics)"
echo "   • Visit: https://supabase.com/dashboard"
echo "   • Create project: 'mindspanai'"
echo "   • Copy: Project URL and anon key"
echo "   • SQL Editor → Run supabase/schema.sql"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Do you have your OpenRouter API key ready? (y/n): " HAS_KEY

if [ "$HAS_KEY" != "y" ]; then
    echo ""
    echo "⏸️  Paused: Get your API keys first, then run this script again"
    echo ""
    echo "Quick link: https://openrouter.ai/keys"
    echo ""
    exit 0
fi

# Step 4: Deploy to Vercel
echo ""
echo "🚀 Step 4: Deploying to Vercel..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "When prompted by Vercel:"
echo "  • Set Up and Deploy? → Yes"
echo "  • Which scope? → Select your personal account"
echo "  • Link to existing project? → No"
echo "  • What's your project's name? → mindspanai (or your choice)"
echo "  • In which directory is your code located? → ./"
echo ""
echo "After deployment, Vercel will give you a URL."
echo "You'll need to add environment variables in the dashboard."
echo ""
read -p "Ready to deploy? (y/n): " READY

if [ "$READY" != "y" ]; then
    echo "Deployment cancelled"
    exit 0
fi

echo ""
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment initiated!"
echo ""
echo "📋 CRITICAL NEXT STEPS:"
echo ""
echo "1️⃣  Add Environment Variables to Vercel:"
echo "   • Go to: https://vercel.com/dashboard"
echo "   • Select your 'mindspanai' project"
echo "   • Settings → Environment Variables → Add:"
echo ""
echo "     OPENROUTER_API_KEY = sk-or-v1-your-key-here"
echo "     SUPABASE_URL = https://your-project.supabase.co (optional)"
echo "     SUPABASE_ANON_KEY = your-anon-key-here (optional)"
echo ""
echo "   • Click 'Save'"
echo "   • Go to Deployments → Redeploy (to use new env vars)"
echo ""
echo "2️⃣  Test Your Deployment:"
echo "   • Visit your Vercel URL (shown above)"
echo "   • Try asking: 'What services do you offer?'"
echo "   • Verify AI responses work"
echo ""
echo "3️⃣  Update SquareSpace:"
echo "   • Log into www.mindspan.com.au admin"
echo "   • Navigate to /agent page"
echo "   • Edit iframe code block"
echo "   • Change src to your Vercel URL"
echo "   • Save and Publish"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 V2.0 deployment complete!"
echo ""
echo "📖 For troubleshooting, see:"
echo "   • V2-DEPLOYMENT-SUMMARY.md"
echo "   • V2-UPGRADE-GUIDE.md"
echo ""
