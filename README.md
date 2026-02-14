# 🧠 MindspanAI v1.0.0 – Complete Package
**Build**: 20250214-1430  
**Status**: Production-Ready (Zero-Cost Static Deployment)  
**Target**: www.mindspan.com.au/ai

---

## 🎯 Executive Summary

**What**: Public-facing administrative Q&A agent for Mindspan Psychology  
**Why**: Reduce repetitive admin queries, improve 24/7 accessibility, streamline booking  
**How**: Static HTML with keyword-matching logic (zero API cost)  
**Cost**: $0 (v1.0.0), $5-15/month (v2.0.0 with AI)  
**Time to Live**: 5-15 minutes  
**Governance**: AHPRA-compliant, privacy-safe, clinically bounded

---

## 🔗 Live Deployment

**GitHub Repository**: https://github.com/mindspanner/mindspanai
**GitHub Pages**: https://mindspanner.github.io/mindspanai/
**Production URL**: www.mindspan.com.au/agent (via SquareSpace iframe)

**Automated Deployment**: Push to GitHub → Live in ~30 seconds

---

## 📦 Package Contents

### Core Deliverable
```
index.html (8KB)
├─ Embedded knowledge base
├─ Emergency detection system
├─ 8 response categories + fallback
├─ Analytics (localStorage)
└─ Version tracking
```

### Documentation
1. **DEPLOYMENT.md** – Step-by-step deployment (3 options), post-launch checklist
2. **TEST_CASES.md** – 100+ test cases across 10 suites, validation framework
3. **GOVERNANCE.md** – Clinical governance, legal compliance, risk register, AHPRA alignment
4. **mindspan-knowledge-base.md** – Scraped data from website + Halaxy, context for agent

### Quick Links
- **Go-Live Instructions**: Start with DEPLOYMENT.md → Option 1
- **Pre-Launch Testing**: Run TEST_CASES.md → Test Suites 1-5 minimum
- **Legal Review**: Read GOVERNANCE.md → Sign-off checklist

---

## ⚡ Deployment & Updates

### 🚀 Current Setup: GitHub Pages + Auto-Deployment

The project is already deployed and configured with automated updates!

**Making Updates** (10 seconds):
1. Edit `index.html` or any other file locally
2. Run: `./update.sh`
3. Wait ~30 seconds → Changes are live!

**SquareSpace Integration** (One-time setup):
1. Log into www.mindspan.com.au admin
2. Navigate to the page at `/agent`
3. Clear existing content and add **Code Block** element
4. Paste this iframe code:
```html
<iframe
    src="https://mindspanner.github.io/mindspanai/"
    width="100%"
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    title="MindspanAI Administrative Assistant"
></iframe>
```
5. Save and **Publish**

**Done!** Updates to GitHub automatically appear on your website.

---

## 🛡️ Safety & Compliance

✅ **No clinical advice**: Hard-coded guardrails prevent diagnosis/treatment recommendations  
✅ **Emergency protocol**: Immediate crisis contacts for keywords like "suicide", "self-harm"  
✅ **Zero PII collection**: No names, DOB, addresses stored  
✅ **AHPRA-compliant**: Advertising guidelines, accurate qualifications  
✅ **Privacy Act 1988**: Australian Privacy Principles, data minimisation

**See GOVERNANCE.md for full framework.**

---

## 🚀 Next Steps

1. **Deploy** using DEPLOYMENT.md
2. **Test** using TEST_CASES.md
3. **Monitor** analytics weekly (first month)
4. **Iterate** based on user queries

**Ready to go live.**
