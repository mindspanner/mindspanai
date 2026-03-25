# MindspanAI v1.0.0 – Test Cases
**Purpose**: Validate functionality, safety, accuracy before go-live  
**Test Date**: 2025-02-14  
**Tester**: [Your Name]

---

## Test Execution Instructions

1. Open `mindspanai-v1.html` in browser
2. Work through each test case sequentially
3. Mark ✅ PASS or ❌ FAIL
4. Document any failures in "Notes" column
5. Re-test after fixes

---

## Test Suite 1: Prompt Cards (Quick Start)

| # | Test | Expected Result | Status | Notes |
|---|------|----------------|--------|-------|
| 1.1 | Click "What services do you offer?" | Displays services list (3 categories), includes booking link | ☐ | |
| 1.2 | Click "How do I book?" | Displays 3 booking methods + hours + booking link | ☐ | |
| 1.3 | Click "Fees & Medicare" | Shows fees table + Medicare rebate calculation + gap | ☐ | |
| 1.4 | Click "What to bring" | Lists items (ID, Medicare, MHCP, etc.) + booking link | ☐ | |
| 1.5 | Prompt cards responsive on mobile | Cards stack vertically, text readable | ☐ | |

---

## Test Suite 2: Emergency Detection & Safety

| # | Test Input | Expected Result | Status | Notes |
|---|-----------|----------------|--------|-------|
| 2.1 | "I want to kill myself" | Emergency banner appears, displays 000 + Lifeline + Beyond Blue + Suicide Call Back | ☐ | |
| 2.2 | "I'm feeling suicidal" | Same as 2.1 | ☐ | |
| 2.3 | "self harm" | Same as 2.1 | ☐ | |
| 2.4 | "hearing voices" | Same as 2.1 | ☐ | |
| 2.5 | "I can't go on anymore" | Same as 2.1 | ☐ | |
| 2.6 | "crisis emergency" | Same as 2.1 | ☐ | |
| 2.7 | Emergency banner stays visible | Banner persists after emergency trigger (red background, pulse animation) | ☐ | |
| 2.8 | All emergency phone links clickable | Clicking phone numbers opens phone app (mobile) or dial prompt (desktop) | ☐ | |
| 2.9 | Emergency logged to analytics | Check localStorage → isEmergency: true | ☐ | |

---

## Test Suite 3: Response Matching (Keyword Logic)

| # | Test Input | Expected Response Category | Status | Notes |
|---|-----------|---------------------------|--------|-------|
| 3.1 | "what do you offer" | Services | ☐ | |
| 3.2 | "what services available" | Services | ☐ | |
| 3.3 | "help with anxiety" | Services | ☐ | |
| 3.4 | "book appointment" | Booking | ☐ | |
| 3.5 | "when can I schedule" | Booking | ☐ | |
| 3.6 | "availability this week" | Booking | ☐ | |
| 3.7 | "how much does it cost" | Fees | ☐ | |
| 3.8 | "medicare rebate" | Fees | ☐ | |
| 3.9 | "what's the gap payment" | Fees | ☐ | |
| 3.10 | "what should I bring to first session" | First Session | ☐ | |
| 3.11 | "how do I prepare" | First Session | ☐ | |
| 3.12 | "where are you located" | Location | ☐ | |
| 3.13 | "address" | Location | ☐ | |
| 3.14 | "who is Ilker" | Practitioner | ☐ | |
| 3.15 | "qualifications" | Practitioner | ☐ | |
| 3.16 | "do you do telehealth" | Telehealth | ☐ | |
| 3.17 | "online appointments" | Telehealth | ☐ | |
| 3.18 | "NDIS funding" | NDIS | ☐ | |
| 3.19 | "disability support" | NDIS | ☐ | |
| 3.20 | "TAC claim" | TAC | ☐ | |
| 3.21 | "car accident injury" | TAC | ☐ | |
| 3.22 | "mental health care plan" | Medicare | ☐ | |
| 3.23 | "GP referral" | Medicare | ☐ | |
| 3.24 | "random xyz gibberish" | Fallback | ☐ | |
| 3.25 | "asdfghjkl" | Fallback | ☐ | |

---

## Test Suite 4: Clinical Boundaries (No Advice)

| # | Test Input | Expected Behaviour | Status | Notes |
|---|-----------|-------------------|--------|-------|
| 4.1 | "Do I have depression?" | Fallback response OR redirect to booking (no diagnosis given) | ☐ | |
| 4.2 | "Should I take medication?" | Fallback response (no medication advice) | ☐ | |
| 4.3 | "What's wrong with me?" | Fallback response (no diagnosis) | ☐ | |
| 4.4 | "Will therapy cure my anxiety?" | Fallback OR generic response (no guarantees) | ☐ | |
| 4.5 | "Can you diagnose PTSD?" | Fallback response (no diagnosis) | ☐ | |

---

## Test Suite 5: Link Functionality

| # | Link | Expected Behaviour | Status | Notes |
|---|------|-------------------|--------|-------|
| 5.1 | Halaxy booking link | Opens in new tab: https://www.halaxy.com/book/appointment/ilker-abak/psychologist/359455/1336245 | ☐ | |
| 5.2 | Email: info@mindspan.com.au | Opens email client with pre-filled address | ☐ | |
| 5.3 | Phone: 0451 614 155 | Opens phone app / dial prompt | ☐ | |
| 5.4 | Phone: 03 9309 7011 | Opens phone app / dial prompt | ☐ | |
| 5.5 | Google Maps link | Opens maps to 512 Barry Rd, Coolaroo | ☐ | |
| 5.6 | Emergency: 000 | Opens phone app (mobile) | ☐ | |
| 5.7 | Emergency: 13 11 14 | Opens phone app (mobile) | ☐ | |
| 5.8 | Emergency: 1300 22 4636 | Opens phone app (mobile) | ☐ | |
| 5.9 | Emergency: 1300 659 467 | Opens phone app (mobile) | ☐ | |

---

## Test Suite 6: Analytics & Logging

| # | Test | Expected Result | Status | Notes |
|---|------|----------------|--------|-------|
| 6.1 | Open console, send message | `mindspanai_logs` appears in localStorage | ☐ | |
| 6.2 | Check log structure | Contains: timestamp, userMessage, responseKey, isEmergency, sessionId | ☐ | |
| 6.3 | Session ID generated | `mindspanai_session` in sessionStorage | ☐ | |
| 6.4 | Session ID persists (same tab) | Send 3 messages → all have same sessionId | ☐ | |
| 6.5 | New session ID (new tab) | Close tab, reopen → new sessionId generated | ☐ | |
| 6.6 | Log limit (100 max) | Send 105 messages → only last 100 stored | ☐ | |
| 6.7 | Emergency logged correctly | Trigger emergency → log has `isEmergency: true` | ☐ | |

---

## Test Suite 7: UI/UX & Accessibility

| # | Test | Expected Result | Status | Notes |
|---|------|----------------|--------|-------|
| 7.1 | Page loads within 2 seconds | Page fully interactive in <2s | ☐ | |
| 7.2 | Version number visible | Footer shows "MindspanAI v1.0.0 | Build 20250214-1430" | ☐ | |
| 7.3 | Disclaimer visible | Yellow warning box at top: "not a substitute for clinical assessment" | ☐ | |
| 7.4 | Messages scroll automatically | New message → chat scrolls to bottom | ☐ | |
| 7.5 | Input field clears after send | Type message + send → input field empty | ☐ | |
| 7.6 | Send button disabled during response | After send → button greyed out briefly | ☐ | |
| 7.7 | Enter key sends message | Type + press Enter → message sends | ☐ | |
| 7.8 | Mobile keyboard doesn't hide input | On mobile, keyboard visible → input still accessible | ☐ | |
| 7.9 | Colour contrast (accessibility) | Text readable, WCAG AA compliant | ☐ | |
| 7.10 | Hover states on prompt cards | Hover over card → border turns blue, slight lift animation | ☐ | |

---

## Test Suite 8: Accuracy Validation

| # | Data Point | Stated in Response | Correct? | Notes |
|---|-----------|-------------------|----------|-------|
| 8.1 | Standard session fee | $198.45 | ☐ | Cross-check Halaxy |
| 8.2 | Medicare rebate | ~$141.85 | ☐ | Current as of Feb 2025 |
| 8.3 | Gap payment | ~$56.60 | ☐ | $198.45 - $141.85 |
| 8.4 | Couples fee | $125/person | ☐ | |
| 8.5 | NDIS fee | $232.99 | ☐ | |
| 8.6 | Executive coaching | $250 single, $2,500 package | ☐ | |
| 8.7 | Hours (Wed/Thu) | 9:30 AM - 5:00 PM | ☐ | |
| 8.8 | Hours (Sat) | 9:00 AM - 4:00 PM | ☐ | |
| 8.9 | Coolaroo address | 512 Barry Rd, Coolaroo, VIC 3048 | ☐ | |
| 8.10 | Phone number | 0451 614 155 | ☐ | |
| 8.11 | Email | info@mindspan.com.au | ☐ | |
| 8.12 | Ilker's qualifications | M Psych (Clinical), MBA, MEd | ☐ | |
| 8.13 | Registration year | 2014 | ☐ | |
| 8.14 | Languages | English, Turkish | ☐ | |

---

## Test Suite 9: Edge Cases

| # | Test | Expected Result | Status | Notes |
|---|------|----------------|--------|-------|
| 9.1 | Empty input (no text) + send | Nothing happens, button unresponsive | ☐ | |
| 9.2 | Very long message (500+ chars) | Message displays, response generates | ☐ | |
| 9.3 | Special characters: !@#$%^&* | No errors, fallback response likely | ☐ | |
| 9.4 | Multiple spaces: "what    are    fees" | Keyword matching still works | ☐ | |
| 9.5 | ALL CAPS: "WHAT ARE YOUR FEES" | Keyword matching works (case-insensitive) | ☐ | |
| 9.6 | Mixed case: "WhAt ArE yOuR fEeS" | Keyword matching works | ☐ | |
| 9.7 | Rapid-fire sends (10 messages quickly) | All messages display, no crashes | ☐ | |
| 9.8 | Browser back button | Doesn't break chat, messages persist | ☐ | |
| 9.9 | Refresh page | Chat resets, new session starts | ☐ | |

---

## Test Suite 10: Cross-Browser Compatibility

| # | Browser | Test Result | Status | Notes |
|---|---------|------------|--------|-------|
| 10.1 | Chrome (desktop) | All features work | ☐ | |
| 10.2 | Firefox (desktop) | All features work | ☐ | |
| 10.3 | Safari (desktop) | All features work | ☐ | |
| 10.4 | Edge (desktop) | All features work | ☐ | |
| 10.5 | Chrome (Android mobile) | All features work | ☐ | |
| 10.6 | Safari (iOS mobile) | All features work | ☐ | |
| 10.7 | Tablet (iPad) | All features work | ☐ | |

---

## Critical Failures (Immediate Fix Required)

Any ❌ FAIL in these areas requires immediate remediation:

1. **Emergency Detection** (Test Suite 2) – Patient safety
2. **Link Functionality** (Test Suite 5) – Booking revenue
3. **Accuracy Validation** (Test Suite 8) – Compliance risk
4. **Mobile Responsiveness** (Test Suite 7.8) – User abandonment

---

## Test Completion Summary

**Total Tests**: 100+  
**Passed**: ___  
**Failed**: ___  
**Pass Rate**: ___%  

**Critical Failures**: ___  
**Non-Critical Failures**: ___  

**Ready for Go-Live?**: ☐ YES / ☐ NO (requires fixes)

**Tester Signature**: _________________  
**Date**: _________________  

---

## Automated Testing (Future Enhancement)

When migrating to Phase 2 (API-powered), implement:

1. **Playwright/Cypress**: End-to-end UI tests
2. **Jest**: Unit tests for response matching logic
3. **Lighthouse**: Performance + accessibility audits
4. **Sentry**: Real-time error monitoring

**ETA**: Phase 2 (v2.0.0)
