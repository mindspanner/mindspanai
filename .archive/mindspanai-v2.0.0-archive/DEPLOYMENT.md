# MindspanAI v1.0.0 – Deployment Instructions
**Build**: 20250214-1430  
**Mode**: Static (Zero-Cost)  
**Target URL**: www.mindspan.com.au/ai

---

## Deployment Checklist

### ✅ Pre-Deployment
- [x] Knowledge base extracted from mindspan.com.au + Halaxy profile
- [x] Emergency protocols implemented
- [x] Analytics (localStorage) configured
- [x] Version tracking enabled
- [x] Response database populated (8 categories + fallback)
- [ ] Test on local browser
- [ ] Review all links (booking, email, phone)
- [ ] Confirm fees/hours are current

---

## Deployment Options

### Option 1: Direct HTML File (Fastest – Immediate Live)

**Steps**:
1. Open `mindspanai-v1.html` in text editor
2. Copy **entire contents**
3. Log into www.mindspan.com.au CMS (SquareSpace)
4. Create new page:
   - Page Type: **Blank Page**
   - URL Slug: `/ai`
   - Title: `MindspanAI | Administrative Assistant`
5. Add **Code Block** element
6. Paste HTML contents
7. Save
8. **Publish**

**Live URL**: `https://www.mindspan.com.au/ai`

**Time to live**: ~5 minutes

---

### Option 2: Embed via iFrame (If CMS Restricts Full HTML)

**If SquareSpace blocks full HTML:**
1. Upload `mindspanai-v1.html` to a static host:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
2. Get public URL (e.g., `https://yourusername.github.io/mindspanai/index.html`)
3. In SquareSpace, create new page `/ai`
4. Add **Code Block**:
```html
<iframe 
    src="YOUR_PUBLIC_URL_HERE" 
    width="100%" 
    height="800px" 
    frameborder="0"
    style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
></iframe>
```
5. Publish

**Time to live**: ~15 minutes

---

### Option 3: GitHub Pages (Recommended for Version Control)

**Why**: Free, version-controlled, instant updates via git push

**Steps**:
1. Create GitHub repo: `mindspanai`
2. Upload `mindspanai-v1.html` as `index.html`
3. Enable GitHub Pages (Settings → Pages → Deploy from main branch)
4. Get URL: `https://yourusername.github.io/mindspanai/`
5. Embed in SquareSpace via iFrame (see Option 2)

**Benefit**: Future updates = `git commit` + `git push` (auto-deploy in ~30 sec)

---

## Post-Deployment Tests

Run these tests immediately after going live:

### Test 1: Prompt Cards
- [ ] Click "What services do you offer?" → Response displays correctly
- [ ] Click "How do I book?" → Booking link works
- [ ] Click "Fees & Medicare" → Fees display correctly
- [ ] Click "What to bring" → List displays correctly

### Test 2: Emergency Protocol
- [ ] Type "I want to kill myself" → Emergency banner appears + crisis contacts display
- [ ] Type "I'm suicidal" → Same result
- [ ] Type "hearing voices" → Same result

### Test 3: Response Matching
- [ ] Type "what are your prices" → Fees response
- [ ] Type "where are you located" → Location response
- [ ] Type "tell me about Ilker" → Practitioner response
- [ ] Type "do you do telehealth" → Telehealth response
- [ ] Type "random gibberish xyz" → Fallback response

### Test 4: Links & Contact
- [ ] Booking link → Opens Halaxy (new tab)
- [ ] Phone numbers → Clickable (opens phone app on mobile)
- [ ] Email links → Opens email client
- [ ] Google Maps link → Opens maps

### Test 5: Analytics
- [ ] Open browser console (F12)
- [ ] Type message → Check `localStorage` has `mindspanai_logs`
- [ ] Verify sessionId generated
- [ ] Close tab, reopen → New sessionId created

### Test 6: Mobile Responsiveness
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Verify prompt cards stack vertically
- [ ] Verify chat input doesn't get hidden by keyboard

---

## Monitoring & Maintenance

### Weekly Reviews (First Month)
1. Check analytics:
```javascript
// In browser console on live site
JSON.parse(localStorage.getItem('mindspanai_logs'))
```
2. Review common queries not matching responses
3. Update response database if needed
4. Verify no broken links

### Monthly Updates
1. Confirm fees/hours still accurate
2. Update knowledge base if services change
3. Increment version number (v1.0.1, v1.0.2, etc.)
4. Update build timestamp

### How to Update
1. Edit `mindspanai-v1.html` locally
2. Test changes in browser (open file directly)
3. Upload/paste updated HTML
4. Refresh browser on live site → Changes appear immediately

---

## Analytics Export

To export analytics for review:

1. Open live site: www.mindspan.com.au/ai
2. Open browser console (F12)
3. Run:
```javascript
const logs = JSON.parse(localStorage.getItem('mindspanai_logs') || '[]');
const csv = logs.map(l => 
    `${l.timestamp},${l.sessionId},${l.responseKey},${l.isEmergency}`
).join('\n');
console.log('timestamp,sessionId,responseKey,isEmergency\n' + csv);
```
4. Copy output to spreadsheet for analysis

---

## Known Limitations (v1.0.0)

1. **No true AI**: Uses keyword matching, not Claude API
   - Responses are pre-scripted templates
   - Cannot handle complex/nuanced queries beyond categories
   - **Mitigation**: Fallback response redirects to email/phone

2. **No real-time booking**: Cannot check Halaxy availability
   - **Mitigation**: Direct link to Halaxy booking portal

3. **No persistent cross-device memory**: localStorage is per-browser
   - **Mitigation**: Each session independent (stateless design)

4. **No admin dashboard**: Analytics require manual console export
   - **Mitigation**: Phase 2 will add Supabase dashboard

5. **Static hours**: Hard-coded "this week" availability
   - **Mitigation**: Update manually each week OR remove specific times

---

## Roadmap to v2.0 (API-Powered)

When ready to upgrade to true AI responses:

**Phase 2 Architecture**:
- Frontend: Current HTML (no changes)
- Backend: Lightweight Node.js proxy on Railway/Fly.io
- Database: Supabase (free tier)
- API: Anthropic Claude via server-side calls

**Migration path**:
1. Deploy backend proxy
2. Update `CONFIG.mode` from `'static'` to `'api'`
3. Add `CONFIG.backendUrl = 'https://your-backend.fly.dev'`
4. Replace keyword matching with API call
5. Zero changes to UI/UX

**Cost**: ~$5–15/month (depending on usage)

**ETA**: 2 weeks from approval

---

## Troubleshooting

### Issue: "Page won't load / blank screen"
- **Cause**: HTML not pasted correctly, missing closing tags
- **Fix**: Re-copy HTML, ensure no truncation

### Issue: "Emergency banner stuck visible"
- **Cause**: JavaScript error, banner not toggling
- **Fix**: Hard refresh (Ctrl+Shift+R), clear browser cache

### Issue: "Analytics not saving"
- **Cause**: Browser blocking localStorage (private mode)
- **Fix**: N/A – expected behaviour in incognito

### Issue: "Links open in same tab instead of new tab"
- **Cause**: Missing `target="_blank"` in some links
- **Fix**: Already implemented, verify via inspect element

---

## Support Contacts

**For deployment help**:
- SquareSpace support: https://support.squarespace.com
- GitHub Pages: https://docs.github.com/pages

**For code updates**:
- Continue this Claude conversation
- Or: Email developer (if hiring external)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2025-02-14 | Initial build – static keyword matching, 8 response categories, emergency protocol, analytics |

---

**Next Step**: Choose deployment option (1, 2, or 3) and execute.  
**Estimated time to live**: 5–15 minutes.  
**Refresh browser = instant updates**.
