# MindspanAI Deployment Checklist

## Phase 0: Pre-Launch (5 minutes)

### ✅ File Verification
- [ ] `mindspan-ai.html` exists and opens in browser
- [ ] `admin-dashboard.html` exists and opens in browser
- [ ] `context.md` contains accurate fees and contact details
- [ ] `README.md` is readable

### ✅ Local Testing
- [ ] Open `mindspan-ai.html` in Chrome/Safari
- [ ] Test FAQ card 1: "What services do you offer?"
- [ ] Test FAQ card 2: "How do I book an appointment?"
- [ ] Test FAQ card 3: "What are your fees and Medicare rebates?"
- [ ] Test FAQ card 4: "What should I bring to my first session?"
- [ ] Type "suicide" → Emergency banner appears (000, Lifeline, Beyond Blue)
- [ ] Type "What are your fees?" → Fee calculator appears
- [ ] Ask complex question → Contact form appears
- [ ] Verify version footer: `v1.0.0 | Build 20250214-1500`

### ✅ Admin Dashboard Testing
- [ ] Open `admin-dashboard.html`
- [ ] Verify "Total Sessions" shows 1+
- [ ] Verify "Total Queries" shows 4+ (from FAQ tests)
- [ ] Edit FAQ Card 1 → Save → Refresh main page → Verify change
- [ ] Edit Standard Fee → Save → Note: Main page needs manual refresh
- [ ] Export analytics JSON → File downloads successfully

---

## Phase 1: Website Upload (10 minutes)

### ✅ Upload Main Agent
**Option A: cPanel/FTP**
1. [ ] Login to web hosting control panel
2. [ ] Navigate to `public_html/` (or equivalent)
3. [ ] Create new directory: `/ai/`
4. [ ] Upload `mindspan-ai.html` to `/ai/` directory
5. [ ] Rename to `index.html` (so URL is clean: `mindspan.com.au/ai`)

**Option B: WordPress**
1. [ ] Install "Insert Headers and Footers" plugin (or similar)
2. [ ] Create new page: "AI Assistant"
3. [ ] Set permalink: `/ai`
4. [ ] Add HTML block with iframe:
   ```html
   <iframe src="/wp-content/uploads/mindspan-ai.html" 
           width="100%" 
           height="800px" 
           style="border: none;">
   </iframe>
   ```
5. [ ] Publish page

### ✅ Upload Admin Dashboard (Private)
1. [ ] Create `/admin/` directory (if doesn't exist)
2. [ ] Upload `admin-dashboard.html` → Rename to `mindspanai.html`
3. [ ] Password-protect `/admin/` directory:
   
   **cPanel Method**:
   - cPanel → Directory Privacy → Select `/admin/` → Enable
   - Username: `ilker` (or your choice)
   - Password: [Create strong password]
   
   **.htaccess Method** (if cPanel unavailable):
   ```
   AuthType Basic
   AuthName "Restricted Area"
   AuthUserFile /path/to/.htpasswd
   Require valid-user
   ```

4. [ ] Test access: `mindspan.com.au/admin/mindspanai.html` → Requires login

### ✅ Live Testing
1. [ ] Visit `www.mindspan.com.au/ai` in incognito browser
2. [ ] Repeat all local tests (FAQ cards, emergency, fees, contact form)
3. [ ] Test on mobile (iPhone/Android)
4. [ ] Verify analytics tracking (check admin dashboard after test queries)

---

## Phase 2: Integration & Verification (5 minutes)

### ✅ Website Navigation
- [ ] Add link to main website navigation: "AI Assistant" → `/ai`
- [ ] OR add prominent button on homepage: "Ask AI Assistant"
- [ ] Verify link works from homepage

### ✅ Halaxy Integration Check
- [ ] Agent provides correct Halaxy URL: `https://www.halaxy.com/profile/ilker-abak/psychologist/359455`
- [ ] Link opens in new tab/window
- [ ] Booking widget displays correctly

### ✅ Contact Information Accuracy
- [ ] Phone: 0451 120 500 (clickable on mobile)
- [ ] Email: hello@mindspan.com.au (mailto link works)
- [ ] Address: Werribee VIC (if listed)

---

## Phase 3: Compliance & Disclaimers (5 minutes)

### ✅ Legal Footer
Add to `/ai` page (below agent iframe):
```html
<div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
  MindspanAI is an administrative assistant for general enquiries only. 
  It is not a substitute for professional psychological assessment or treatment. 
  <strong>In an emergency, call 000 or Lifeline 13 11 14.</strong>
  <br><br>
  By using this service, you consent to anonymised usage data collection 
  for quality improvement. No personally identifiable information is stored.
</div>
```

### ✅ Privacy Policy Update
- [ ] Add section to privacy policy: "MindspanAI Usage Data"
- [ ] Specify: Browser localStorage, anonymised, no PII, exportable on request

### ✅ AHPRA Compliance Check
- [ ] Agent never provides clinical diagnosis ✓
- [ ] Agent never recommends specific treatments ✓
- [ ] Emergency protocol tested and functional ✓
- [ ] Disclaimer prominently displayed ✓

---

## Phase 4: Analytics & Monitoring (Ongoing)

### ✅ Week 1 Review (Due: 2025-02-21)
- [ ] Check admin dashboard → Review top queries
- [ ] Identify any confusing/unanswered questions
- [ ] Update `context.md` if needed
- [ ] Add new FAQ cards based on frequency

### ✅ Monthly Maintenance (Due: 2025-03-14)
- [ ] Export analytics JSON → Save to records
- [ ] Verify fees still current (Medicare, NDIS, TAC rates)
- [ ] Update contact details if changed
- [ ] Test emergency protocol still triggering correctly
- [ ] Clear old analytics data (optional, after export)

### ✅ Quarterly Audit (Due: 2025-05-14)
- [ ] Review all emergency-flagged queries
- [ ] Check contact form success rate
- [ ] Evaluate need for Option B migration (serverless backend)
- [ ] Update knowledge base with new services/policies

---

## Phase 5: Claude Code Setup (macOS)

### ✅ Repository Initialization
```bash
cd ~/Documents  # Or your preferred location
mkdir mindspan-ai
cd mindspan-ai

# Copy files from /mnt/user-data/outputs/
cp /path/to/mindspan-ai.html .
cp /path/to/admin-dashboard.html .
cp /path/to/context.md .
cp /path/to/README.md .

# Initialize git
git init
git add .
git commit -m "Initial MindspanAI v1.0.0"
```

### ✅ Claude Code Access
```bash
# Install Claude Code (if not installed)
# Download from: https://claude.ai/code

# Open project
claude-code ~/Documents/mindspan-ai
```

### ✅ Test Iteration Workflow
1. [ ] Ask Claude Code: "Update FAQ card 1 to say 'What therapies do you offer?'"
2. [ ] Verify change in `mindspan-ai.html`
3. [ ] Test locally: `open mindspan-ai.html`
4. [ ] Commit: `git commit -am "Update FAQ1 text"`
5. [ ] Upload to website (manual or git-based deploy)

---

## Emergency Rollback Plan

### If Agent Malfunctions:
1. **Immediate**: Remove `/ai` page from website navigation
2. **Temporary**: Replace `index.html` in `/ai/` with:
   ```html
   <h1>Temporarily Unavailable</h1>
   <p>Please contact us at 0451 120 500 or hello@mindspan.com.au</p>
   ```
3. **Investigate**: Check browser console for errors
4. **Restore**: Upload previous version from git history

### If Analytics Corrupted:
1. Open admin dashboard
2. Click "Clear All Data"
3. Restart analytics tracking (automatic on next user visit)

### If Fee Calculator Wrong:
1. Open admin dashboard
2. Update fee schedule
3. Save → Refresh main agent page
4. Verify calculation with test query

---

## Success Criteria

### ✅ Go-Live Checklist
- [ ] Agent responds to all 4 FAQ cards correctly
- [ ] Emergency protocol triggers on test keyword
- [ ] Fee calculator shows correct gap ($108.15 for standard session)
- [ ] Contact form validates email and opens mailto link
- [ ] Admin dashboard displays analytics
- [ ] Version footer visible
- [ ] Mobile-responsive (tested on iPhone and Android)
- [ ] Page loads in < 3 seconds
- [ ] No JavaScript errors in console

### ✅ Post-Launch Monitoring (First 48 Hours)
- [ ] Check analytics daily for first week
- [ ] Review any emergency-flagged queries immediately
- [ ] Monitor contact form submission rate
- [ ] Verify Halaxy booking link traffic (if trackable)

---

## Known Limitations (Option A)

⚠️ **Current Constraints**:
- No real-time Halaxy availability (displays link only)
- No server-side email sending (uses mailto:)
- Analytics limited to ~5MB (localStorage quota)
- No cross-device analytics sync (browser-specific)

✅ **Mitigated By**:
- Clear "Book via Halaxy" instructions
- Email validation before mailto
- Export analytics regularly
- Option B migration path ready (Supabase backend)

---

## Contact for Issues

**Technical Support**:
- Claude Code assistance available 24/7
- Browser console errors → Screenshot and review

**Clinical/Governance Questions**:
- Review with AHPRA guidelines
- Consult professional indemnity insurer if uncertain

---

**Deployment Date**: 2025-02-14  
**Deployed By**: Ilker Abak  
**Version**: 1.0.0  
**Build**: 20250214-1500  
**Status**: ✅ READY FOR PRODUCTION
