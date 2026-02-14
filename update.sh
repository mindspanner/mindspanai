#!/bin/bash
# MindspanAI Update Script
# Automatically commits and pushes changes to GitHub
# GitHub Actions will deploy to GitHub Pages in ~30 seconds

echo "🔄 MindspanAI Update Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if there are changes
if [[ -z $(git status -s) ]]; then
    echo "✓ No changes detected"
    exit 0
fi

# Show what's changed
echo "📝 Changes detected:"
git status -s

# Stage all changes
git add -A

# Create commit with timestamp
COMMIT_MSG="Update MindspanAI: $(date +%Y-%m-%d\ %H:%M)"
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Changes pushed successfully!"
    echo "🚀 Live in ~30 seconds at:"
    echo "   https://mindspanner.github.io/mindspanai/"
    echo "   https://www.mindspan.com.au/agent"
else
    echo ""
    echo "❌ Push failed. Check your internet connection or GitHub authentication."
    exit 1
fi
