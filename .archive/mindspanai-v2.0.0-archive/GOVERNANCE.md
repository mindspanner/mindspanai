# MindspanAI – Clinical Governance & Legal Framework
**Version**: 1.0.0  
**Owner**: Ilker Abak, Mindspan Psychology  
**Review Date**: 2025-02-14  
**Next Review**: 2025-05-14 (quarterly)

---

## Purpose

This document establishes the governance, compliance, and risk management framework for MindspanAI, ensuring alignment with:
- **AHPRA** (Australian Health Practitioner Regulation Agency) standards
- **Psychology Board of Australia** guidelines
- **Privacy Act 1988** (Australian Privacy Principles)
- **Australian Consumer Law**
- Professional indemnity insurance requirements

---

## Scope & Definitions

### What MindspanAI IS
- Administrative Q&A assistant
- Pre-booking information service
- General educational resource
- Triage to appropriate contact channels (emergency, booking, email)

### What MindspanAI IS NOT
- Not a clinical assessment tool
- Not a diagnostic service
- Not a crisis intervention service
- Not a substitute for professional consultation
- Not a therapeutic chatbot
- Not a medical device (ARTG-exempt)

---

## Regulatory Compliance Matrix

| Requirement | Source | Implementation | Evidence |
|-------------|--------|----------------|----------|
| **Professional Boundaries** | AHPRA, Psychology Board | Hard-coded guardrails prevent clinical advice | Response database review |
| **Informed Consent** | AHPRA | Disclaimer visible on load + repeated in responses | HTML header + all responses |
| **Crisis Management** | Duty of Care | Emergency keyword detection + immediate crisis contacts | Test Suite 2 |
| **Privacy Protection** | Privacy Act 1988 | No PII collection, anonymised analytics, localStorage only | Code audit |
| **Advertising Standards** | AHPRA Guidelines | No misleading claims, factual service descriptions | Knowledge base review |
| **Record Keeping** | AHPRA | Analytics logs timestamp, query type, session ID (no identifiable data) | localStorage structure |
| **Professional Indemnity** | Insurance Policy | Agent classified as "administrative tool", not clinical service | Policy review with insurer |
| **Consumer Protection** | Australian Consumer Law | Accurate fees, clear disclaimers, no guarantees | Test Suite 8 |

---

## Privacy & Data Protection

### Data Minimisation (GDPR-Aligned, Privacy Act Compliant)

**What is collected**:
- Anonymised conversation logs (query keywords only, truncated to 200 chars)
- Session ID (non-identifiable random string)
- Timestamp
- Response category matched
- Emergency flag (boolean)

**What is NOT collected**:
- Names, DOB, addresses, phone numbers
- Diagnosis, symptoms, medications
- Payment information
- IP addresses, device fingerprints
- Geolocation
- Cookies (none set)

**Storage**:
- **Location**: User's browser (localStorage)
- **Retention**: Until user clears browser data
- **Access**: User only (no server transmission in v1.0.0)
- **Encryption**: Browser-native security
- **Backup**: None (ephemeral by design)

**User Rights**:
- Right to delete: Clear browser cache
- Right to access: Browser console (`localStorage.getItem('mindspanai_logs')`)
- Right to portability: Export logs via console (instructions in DEPLOYMENT.md)
- No profiling or automated decision-making

### Privacy Notice (To Be Added to Website Footer)

> **MindspanAI Privacy Notice**: This assistant stores anonymised interaction data (query type, timestamp) in your browser only. No personal information is collected, transmitted, or stored on our servers. You can delete this data at any time by clearing your browser cache. For more information, see our [Privacy Policy](link).

---

## Clinical Governance Framework

### 1. Scope of Practice Boundaries

**Hard Boundaries** (Code-enforced):
```javascript
// Emergency keywords → immediate redirect to crisis services
EMERGENCY_KEYWORDS = ['suicide', 'self-harm', 'crisis', ...]

// Clinical advice keywords → fallback response
CLINICAL_KEYWORDS = ['diagnosis', 'medication', 'treatment outcome', ...]
```

**Soft Boundaries** (Natural language in responses):
- "This is general information only, not clinical advice."
- "For personalised guidance, book an appointment."
- "Assessment happens in your first session."
- "That's best discussed with Ilker directly."

### 2. Duty of Care Protocol

**If emergency detected**:
1. **Immediate**: Display crisis contacts (000, Lifeline, Beyond Blue, Suicide Call Back)
2. **Log**: Mark interaction as `isEmergency: true`
3. **Persist**: Banner remains visible for session
4. **No gatekeeping**: User not blocked from re-engaging with agent
5. **Follow-up**: Weekly analytics review identifies emergency triggers

**Clinical scenarios**:
- Agent redirects to booking for:
  - Diagnosis requests ("Do I have PTSD?")
  - Treatment advice ("Should I try CBT?")
  - Medication queries ("Will antidepressants help?")
  - Prognosis ("How long until I'm better?")

### 3. Quality Assurance

**Weekly Review** (First Month):
- Export analytics logs
- Identify queries not matching responses (fallback triggers)
- Update keyword database if legitimate queries missed
- Review emergency triggers for false positives/negatives

**Monthly Audit**:
- Verify fees/hours still accurate
- Check all links functional
- Test emergency protocol
- Review any user complaints
- Update knowledge base if services change

**Quarterly Governance Review**:
- Full compliance audit against this framework
- Professional indemnity insurer notification (if material changes)
- AHPRA guideline updates check
- Board review (if applicable)

---

## Risk Register

| Risk | Severity | Likelihood | Mitigation | Owner | Review Frequency |
|------|----------|-----------|-----------|-------|-----------------|
| **Agent gives clinical advice** | High | Low | Hard-coded guardrails + disclaimers | Code architecture | Weekly (1st month), monthly thereafter |
| **User in crisis ignored** | Critical | Low | Emergency keyword detection + prominent banner | Test Suite 2 | Weekly |
| **Outdated fees cause complaint** | Medium | Medium | Monthly knowledge base update reminder | Ilker | Monthly |
| **PII inadvertently collected** | High | Very Low | No input fields for names/DOB, analytics anonymised | Code design + audit | Quarterly |
| **Link rot (broken booking link)** | Medium | Low | Monthly link checks | Automated tests (Phase 2) | Monthly |
| **Misleading advertising claim** | High | Very Low | Fact-check all responses against AHPRA ad guidelines | Content audit | Quarterly |
| **Privacy breach (localStorage leak)** | Medium | Very Low | localStorage is client-side only, no server transmission | Architecture | Quarterly |
| **User expects therapeutic relationship** | Low | Medium | Disclaimer on load: "Administrative assistant only" | UI design | Ongoing |
| **Reputational risk (poor UX)** | Low | Low | User testing pre-launch + iterative improvements | Test Suite 7 | Ongoing |

**Risk Scoring**: Severity (1-5) × Likelihood (1-5) = Risk Score  
**Action Threshold**: Score ≥12 requires immediate mitigation

---

## Legal Disclaimers & Terms of Use

### Disclaimer (Displayed on Load)

Current implementation:
```html
<div class="disclaimer">
    <strong>⚠️ Important Notice</strong>
    This is a general information assistant only, not a substitute for clinical assessment or emergency services. 
    For urgent mental health support, see emergency contacts below.
</div>
```

### Terms of Use (To Be Added to Footer or Modal)

**Recommended text**:

> **Terms of Use – MindspanAI**
> 
> By using this assistant, you acknowledge:
> 1. This is an administrative information service, not clinical advice or therapy.
> 2. Responses are general in nature and not personalised to your situation.
> 3. This is not a crisis service. If you are in immediate danger, contact 000 or crisis services listed above.
> 4. Information is current as of [date] and subject to change. Confirm details when booking.
> 5. Use of this service does not create a psychologist-client relationship.
> 6. For clinical concerns, book an appointment with a registered psychologist.
> 
> **Privacy**: This assistant stores anonymised interaction data in your browser only. No personal information is collected or transmitted. See our [Privacy Policy](link).
> 
> **Accuracy**: While we strive for accuracy, this assistant may not reflect real-time changes to fees, hours, or services. Verify details when booking.
> 
> **Limitation of Liability**: Mindspan Psychology is not liable for decisions made based on information from this assistant. This service is provided "as is" without warranties.

**Implementation**: Add modal trigger "Terms of Use" in footer, or display on first use.

---

## Advertising Compliance (AHPRA Guidelines)

**AHPRA Advertising Requirements** (Summary):

1. **No misleading claims**: ✅ Agent states facts only (fees, services, qualifications)
2. **No guarantees of cure**: ✅ No promises of outcomes ("will get better", "cure anxiety")
3. **No testimonials**: ✅ Not implemented
4. **No celebrity endorsements**: ✅ Not applicable
5. **No before/after claims**: ✅ Not applicable
6. **Qualifications accurately stated**: ✅ Verified in response database
7. **No alarming language**: ✅ Warm, professional tone

**Compliance Checklist**:
- [ ] All claims factual and verifiable
- [ ] No superlatives without evidence ("best psychologist")
- [ ] Fees stated clearly without hidden costs
- [ ] Disclaimers prominent and clear
- [ ] Emergency alternatives provided (not sole option)
- [ ] No comparison to other practitioners

---

## Incident Response Plan

### Scenario 1: User Reports Misleading Information

**Actions**:
1. Document complaint (email, screenshot)
2. Verify claim against knowledge base
3. If error confirmed:
   - Update response database immediately
   - Deploy corrected version
   - Email complainant with correction + apology
4. Log incident for quarterly review
5. Review if pattern emerges (systemic issue)

### Scenario 2: User Reports Privacy Breach

**Actions**:
1. Investigate: What data was allegedly exposed?
2. Review code: Confirm localStorage-only architecture
3. If breach confirmed:
   - Notify Privacy Commissioner (if required under Privacy Act)
   - Disable agent pending fix
   - Engage legal counsel
4. If false alarm:
   - Educate user on localStorage functionality
   - Document response

### Scenario 3: Emergency Situation Not Detected

**Actions**:
1. If reported: Review logs, identify missed keywords
2. Add keyword to emergency database
3. Test new keyword triggers emergency protocol
4. Deploy update
5. Document in risk register
6. Consider professional supervision consultation

### Scenario 4: AHPRA Inquiry

**Actions**:
1. Engage legal counsel immediately
2. Provide this governance document
3. Provide code audit trail (version control)
4. Provide analytics showing safeguards operational
5. Demonstrate compliance with professional standards
6. Cooperate fully with investigation

---

## Continuous Improvement

### Feedback Mechanisms

1. **User Feedback**: Add "Was this helpful?" rating to responses (Phase 2)
2. **Email Feedback**: Monitor info@mindspan.com.au for complaints/suggestions
3. **Analytics Review**: Weekly identification of unmatched queries
4. **Peer Review**: Quarterly review with psychology colleague (optional)

### Version Control

**Minor Updates** (v1.0.X):
- Bug fixes, typo corrections, link updates
- No governance review required

**Major Updates** (v1.X.0):
- New response categories, architectural changes
- Requires full governance review + test suite re-run

**Breaking Changes** (vX.0.0):
- Migration to API-powered (v2.0.0)
- Requires new risk assessment + insurer notification

---

## Accountability & Sign-Off

**Responsible Parties**:
- **Clinical Oversight**: Ilker Abak (Registered Psychologist)
- **Technical Oversight**: [Developer/IT Provider]
- **Governance Review**: Ilker Abak (quarterly)
- **Incident Response**: Ilker Abak (immediate)
- **Privacy Officer**: Ilker Abak (or delegate)

**Approval**:
- [ ] Clinical content reviewed and approved by Ilker Abak
- [ ] Legal disclaimers reviewed by legal counsel (recommended)
- [ ] Privacy framework compliant with Privacy Act 1988
- [ ] Professional indemnity insurer notified (if required by policy)
- [ ] Risk register reviewed and accepted

**Signature**: _________________  
**Date**: _________________  
**Next Review Date**: 2025-05-14

---

## Appendices

### Appendix A: Emergency Contact Resources

**Current List** (Updated 2025-02-14):
- Emergency Services: 000
- Lifeline: 13 11 14 (24/7)
- Beyond Blue: 1300 22 4636 (24/7)
- Suicide Call Back Service: 1300 659 467
- Kids Helpline: 1800 55 1800
- 1800 RESPECT: 1800 737 732

**Review Frequency**: Annually or when services change

### Appendix B: Keywords Database

See `mindspanai-v1.html` lines 150-300 for current implementation.

**Expansion Process**:
1. Identify new query pattern (via analytics)
2. Add keyword to relevant category
3. Test matching logic
4. Deploy update
5. Document in change log

### Appendix C: AHPRA Resources

- **Guidelines**: https://www.ahpra.gov.au/Publications/Advertising-resources.aspx
- **Complaints**: https://www.ahpra.gov.au/Notifications.aspx
- **Psychology Board**: https://www.psychologyboard.gov.au/

---

**End of Document**  
**Version**: 1.0.0  
**Status**: Active  
**Classification**: Internal Governance Document
