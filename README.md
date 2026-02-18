# MindspanAI v3.2.0

**Status**: Production-Ready
**Target**: www.mindspan.com.au/agent

---

## 🎯 Executive Summary

**What**: Public-facing administrative Q&A agent for Mindspan Psychology
**Why**: Reduce repetitive admin queries, improve 24/7 accessibility, streamline booking
**How**: Vercel-hosted frontend + OpenRouter AI API
**Cost**: $0-2/month
**Governance**: AHPRA-compliant, privacy-safe, clinically bounded

---

## Live Deployment

**GitHub Repository**: https://github.com/mindspanner/mindspanai
**Vercel**: https://mindspanai.vercel.app
**Production URL**: www.mindspan.com.au/agent (via SquareSpace iframe)

**Automated Deployment**: Push to GitHub > Vercel auto-deploys in ~30 seconds

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

### Current Setup: Vercel + Auto-Deployment

The project is deployed to Vercel with automated updates.

**Making Updates**:
1. Edit files locally
2. Run: `./update.sh`
3. Vercel auto-deploys — changes are live on the iframe automatically

**SquareSpace Integration**:

See **[AGENT-SETUP-GUIDE.md](AGENT-SETUP-GUIDE.md)** for complete setup instructions including:
- /agent page embed code
- Global floating chat popup code
- Step-by-step instructions for both

**Quick embed** (for the /agent page):
```html
<iframe
    src="https://mindspanai.vercel.app/"
    width="100%"
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: white;"
    title="MindspanAI - Your 24/7 Assistant"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin allow-forms"
></iframe>
```

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
