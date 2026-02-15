# 📧 MindspanAI Email Automation Workflow
**Version**: 1.0.0
**Last Updated**: 2026-02-15
**Platform**: Universal (Zapier, Make.com, n8n, Power Automate, etc.)

---

## 🎯 Purpose

Automatically respond to common administrative questions sent to **hello@mindspan.com.au** using predefined answers and real-time data scraped from www.mindspan.com.au.

---

## 📋 Workflow Overview

```
Incoming Email → Keyword Detection → Response Selection → Data Scraping (if needed) → Send Reply
```

---

## 🔧 Technical Requirements

### Prerequisites:
- Email automation platform (Zapier, Make.com, n8n, etc.)
- Access to **hello@mindspan.com.au** email account
- Web scraping capability (built-in or via integration)
- GPT/AI integration (optional, for complex queries)

### Trigger:
- **New email received** at hello@mindspan.com.au

### Actions:
1. Parse email subject + body
2. Match against keyword database
3. Scrape website for current pricing (if applicable)
4. Generate personalized response
5. Send automated reply
6. Log interaction

---

## 📊 Response Categories & Keywords

### Category 1: Services Offered
**Keywords**: `services`, `what do you do`, `therapy types`, `treatment`, `help with`

**Response Template**:
```
Hi there,

Thank you for your enquiry. Mindspan Psychology offers:

• Comprehensive Psychological Assessment
• Individual Therapy (CBT, ACT, Schema Therapy)
• Couples Therapy
• Trauma-focused therapy
• Medico-legal assessments (TAC, WorkSafe, NDIS, migration)

We work with anxiety, depression, PTSD, OCD, relationship issues, and more.

For more details, visit: https://www.mindspan.com.au

Would you like to book an appointment? You can book online here:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Best regards,
Mindspan Psychology
```

**Dynamic Data**: None required (static information)

---

### Category 2: Booking & Availability
**Keywords**: `book`, `appointment`, `available`, `schedule`, `when can I see`, `next available`

**Response Template**:
```
Hi there,

Thank you for your interest in booking an appointment.

You can book directly online via our Halaxy booking system:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

This will show you real-time availability for both in-person (Werribee, VIC) and telehealth appointments.

Alternatively, you can contact us at:
📞 0451 120 500
📧 hello@mindspan.com.au

We typically respond to enquiries within 1 business day.

Best regards,
Mindspan Psychology
```

**Dynamic Data**: None required (booking system shows live availability)

---

### Category 3: Fees & Medicare
**Keywords**: `cost`, `price`, `fee`, `how much`, `medicare`, `rebate`, `gap`, `bulk bill`, `afford`

**Response Template** (with web scraping):
```
Hi there,

Thank you for your enquiry about fees.

**Standard Fees**:
[SCRAPE: https://www.mindspan.com.au → Fee information]
• Standard session (50-60 min): $[DYNAMIC_PRICE]
• Medico-legal services: $[DYNAMIC_PRICE_MEDICOLEGAL]/hour

**Medicare Rebates**:
With a valid GP Mental Health Treatment Plan (MHTP), you can claim a Medicare rebate of $141.85 per session (Item 80110 for Clinical Psychologist).

**Out-of-Pocket Cost**:
After Medicare rebate, your gap payment is typically around $[CALCULATED: DYNAMIC_PRICE - 141.85].

**Private Health Insurance**:
You may be able to claim the gap from your private health fund, depending on your level of cover.

For TAC, WorkSafe, or NDIS-funded clients, different fee arrangements apply. Please enquire for specific details.

To book: https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Best regards,
Mindspan Psychology
```

**Dynamic Data Required**:
- **Scrape Target**: https://www.mindspan.com.au (main page or fees section)
- **Extract**: Hourly rate for standard sessions
- **Extract**: Medico-legal rate
- **Calculate**: Gap fee (session fee - $141.85)
- **Fallback**: If scraping fails, use static values ($250 standard, $300 medico-legal)

**Web Scraping Instructions**:
```javascript
// Example scraping logic (pseudo-code)
1. Fetch HTML from https://www.mindspan.com.au
2. Search for patterns like: "$XXX/hour", "Hourly rate: $XXX", "Session fee: $XXX"
3. Extract numerical values using regex: /\$(\d{2,3})/
4. Validate extracted values (should be between $200-$400)
5. If validation fails, use fallback: $250 (standard), $300 (medico-legal)
6. Insert into email template
```

---

### Category 4: Location & Telehealth
**Keywords**: `where`, `location`, `address`, `telehealth`, `online`, `video`, `zoom`, `in person`

**Response Template**:
```
Hi there,

Mindspan Psychology operates from:

📍 **In-Person (Werribee, VIC)**:
[SCRAPE: https://www.mindspan.com.au → Address]
Appointments available by booking.

💻 **Telehealth (Australia-wide)**:
We offer secure video consultations for clients across Australia. All you need is a private space and internet connection.

Both options are available via our booking system:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Best regards,
Mindspan Psychology
```

**Dynamic Data Required**:
- **Scrape Target**: https://www.mindspan.com.au (contact/location section)
- **Extract**: Physical address in Werribee
- **Fallback**: "Werribee, VIC (full address provided upon booking)"

---

### Category 5: Practitioner Information
**Keywords**: `who is`, `qualifications`, `experience`, `Ilker`, `about you`, `credentials`, `AHPRA`

**Response Template**:
```
Hi there,

Mindspan Psychology is led by **Ilker Abak**, a Clinical Psychologist with extensive experience in psychological assessment and therapy.

**Qualifications**:
• Master of Psychology (Clinical)
• Bachelor of Psychology (Honours)
• Member of Australian Psychological Society (MAPS)
• AHPRA Registered Clinical Psychologist
• Medicare Provider

Ilker has expertise in trauma therapy, complex psychological assessments, and medico-legal work. He is fluent in English and Turkish.

Learn more at: https://www.mindspan.com.au

To book: https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Best regards,
Mindspan Psychology
```

**Dynamic Data**: None required (static professional information)

---

### Category 6: First Session / What to Bring
**Keywords**: `first session`, `first appointment`, `what to bring`, `prepare`, `what happens`, `expect`

**Response Template**:
```
Hi there,

Great question! Here's what to expect for your first session:

**What to Bring**:
✅ Medicare card (if claiming rebate)
✅ GP Mental Health Treatment Plan (if you have one)
✅ Any referral letters or previous reports
✅ List of current medications
✅ TAC/WorkSafe claim number (if applicable)

**What to Expect**:
• Duration: 50-60 minutes
• We'll discuss your concerns, background, and goals
• Develop a collaborative treatment plan
• Confidentiality and consent forms will be explained

**Booking**:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

If you have any specific concerns, feel free to mention them when booking.

Best regards,
Mindspan Psychology
```

**Dynamic Data**: None required (static process information)

---

### Category 7: TAC / WorkSafe / NDIS
**Keywords**: `TAC`, `WorkSafe`, `NDIS`, `insurance`, `claim`, `medico-legal`, `assessment`, `report`

**Response Template**:
```
Hi there,

Yes, Mindspan Psychology provides medico-legal assessments and reports for:

• **TAC (Transport Accident Commission)**: Pre-approval required, direct billing available
• **WorkSafe Victoria**: Pre-approval required, direct billing available
• **NDIS**: Plan-managed or self-managed participants welcome
• **Migration psychology reports**: Character references, mental health assessments

**Fees**:
[SCRAPE: https://www.mindspan.com.au → Medico-legal fees]
• Assessment: $[DYNAMIC_PRICE_MEDICOLEGAL]/hour
• Report writing: $[DYNAMIC_PRICE_MEDICOLEGAL]/hour

**Important**: For TAC and WorkSafe, you'll need approval from your case manager before booking. Please have your claim number ready.

To discuss your specific needs, contact us at:
📞 0451 120 500
📧 hello@mindspan.com.au

Or book online: https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Best regards,
Mindspan Psychology
```

**Dynamic Data Required**:
- **Scrape Target**: https://www.mindspan.com.au (fees section)
- **Extract**: Medico-legal hourly rate
- **Fallback**: $300/hour

---

### Category 8: Cancellation Policy
**Keywords**: `cancel`, `reschedule`, `change appointment`, `missed appointment`, `no show`

**Response Template**:
```
Hi there,

Our cancellation policy is as follows:

• **24 hours notice required** for cancellations or rescheduling
• **Late cancellations** (less than 24 hours): Full fee may apply
• **No-shows**: Full fee charged
• **Emergencies**: Considered on a case-by-case basis

To cancel or reschedule an existing appointment:
1. Use the Halaxy booking system: https://www.halaxy.com/profile/ilker-abak/psychologist/359455
2. Call: 0451 120 500
3. Email: hello@mindspan.com.au

We appreciate your understanding and cooperation.

Best regards,
Mindspan Psychology
```

**Dynamic Data**: None required (static policy)

---

### Category 9: Emergency / Crisis
**Keywords**: `emergency`, `crisis`, `suicidal`, `self-harm`, `urgent`, `need help now`, `can't cope`

**Response Template** (HIGH PRIORITY):
```
URGENT: If you are in immediate danger or having thoughts of self-harm, please:

🚨 **Call 000 (Emergency Services)**

Or contact 24/7 crisis support:
📞 **Lifeline**: 13 11 14
📞 **Beyond Blue**: 1300 22 4636
📞 **Suicide Call Back Service**: 1300 659 467

**Present to your nearest hospital emergency department if needed.**

Mindspan Psychology provides scheduled appointments for non-emergency mental health support. For urgent care, please use the resources above.

If you would like to book a routine appointment, visit:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

Take care,
Mindspan Psychology
```

**Dynamic Data**: None required (static crisis information)

**Special Instructions**:
- Flag this email for immediate human review
- Send automated response immediately
- Create high-priority alert for practitioner

---

## 🤖 Fallback Response (No Keywords Matched)

**Response Template**:
```
Hi there,

Thank you for your enquiry.

I'm an automated assistant, and I couldn't quite understand your specific question. A member of our team will review your email and respond within 1 business day.

In the meantime, you might find answers on our website:
https://www.mindspan.com.au

Or explore our AI assistant:
https://www.mindspan.com.au/agent

For immediate booking, visit:
https://www.halaxy.com/profile/ilker-abak/psychologist/359455

📞 0451 120 500
📧 hello@mindspan.com.au

Best regards,
Mindspan Psychology (Automated Response)
```

**Special Instructions**:
- Flag email for human review
- Log as "unmatched query" for future training
- Response time: Within 1 business day

---

## 🌐 Web Scraping Implementation

### Primary Scraping Target:
**URL**: https://www.mindspan.com.au

### Data to Extract:

1. **Session Fees**:
   - CSS Selector: Look for elements containing "$" followed by numbers
   - Regex Pattern: `/\$(\d{2,3})/g`
   - Expected Range: $200-$400
   - Fallback Value: $250

2. **Medico-Legal Fees**:
   - Search for: "medico-legal", "WorkSafe", "TAC", "assessment"
   - Extract associated pricing
   - Fallback Value: $300

3. **Physical Address**:
   - Search for: "Werribee", "address", "location"
   - Extract full address if available
   - Fallback: "Werribee, VIC (address provided upon booking)"

### Scraping Schedule:
- **Frequency**: Daily at 2:00 AM AEST
- **Cache Duration**: 24 hours
- **Retry Logic**: 3 attempts with 5-second delays
- **Error Handling**: Use fallback values if scraping fails

### Implementation Example (Python/n8n):
```python
import requests
from bs4 import BeautifulSoup
import re

def scrape_mindspan_fees():
    try:
        response = requests.get('https://www.mindspan.com.au', timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract all text containing dollar amounts
        text_content = soup.get_text()

        # Find all prices
        prices = re.findall(r'\$(\d{2,3})', text_content)

        # Logic to identify session fee vs medico-legal fee
        # (This will need refinement based on actual page structure)

        session_fee = 250  # Default fallback
        medicolegal_fee = 300  # Default fallback

        # Validate and assign
        if prices:
            # Add validation logic here
            session_fee = int(prices[0]) if 200 <= int(prices[0]) <= 400 else 250

        return {
            'session_fee': session_fee,
            'medicolegal_fee': medicolegal_fee,
            'gap_fee': session_fee - 141.85,
            'last_updated': datetime.now().isoformat()
        }

    except Exception as e:
        print(f"Scraping error: {e}")
        return {
            'session_fee': 250,
            'medicolegal_fee': 300,
            'gap_fee': 108.15,
            'last_updated': datetime.now().isoformat(),
            'error': str(e)
        }
```

---

## 📊 Automation Platform Setup

### Zapier Setup:
1. **Trigger**: Gmail - New Email (to: hello@mindspan.com.au)
2. **Filter**: Check if email is from external sender (not auto-reply)
3. **Action 1**: Python by Zapier - Run scraping script (daily cache)
4. **Action 2**: Formatter - Text contains keywords
5. **Action 3**: Paths - Route to appropriate response category
6. **Action 4**: Gmail - Send Email (with dynamic data)
7. **Action 5**: Google Sheets - Log interaction

### Make.com Setup:
1. **Watch Emails** module (Gmail)
2. **HTTP Request** module → Scrape website
3. **Text Parser** module → Extract keywords
4. **Router** module → Match categories
5. **Set Variables** module → Insert dynamic data
6. **Send Email** module (Gmail)
7. **Add Row** module (Google Sheets) → Log

### n8n Setup:
1. **Gmail Trigger** node
2. **HTTP Request** node → Web scraping
3. **Function** node → Keyword matching logic
4. **Switch** node → Route by category
5. **Set** node → Build email body
6. **Gmail Send** node
7. **Google Sheets** node → Logging

---

## 🔒 Guardrails & Safety

### Do NOT Auto-Reply To:
- ❌ Emails containing "unsubscribe" or "stop"
- ❌ Out-of-office auto-replies
- ❌ Emails from "@mindspan.com.au" (internal)
- ❌ Emails marked as spam
- ❌ Emails with attachments requesting opening (potential phishing)

### Always Flag for Human Review:
- 🚩 Emergency/crisis keywords detected
- 🚩 Angry/complaint language ("terrible", "disappointed", "report")
- 🚩 Legal/threatening language ("lawsuit", "lawyer", "AHPRA complaint")
- 🚩 Complex clinical questions requiring professional judgment
- 🚩 Unmatched queries (fallback response sent)

### Privacy & Compliance:
- ✅ **No PII collection**: Don't store names, DOB, medical details in logs
- ✅ **SPAM Act 2003**: Include unsubscribe option in footer
- ✅ **Privacy Act 1988**: Minimal data retention, secure storage
- ✅ **AHPRA Advertising**: No clinical advice, diagnosis, or treatment recommendations

### Email Footer (All Automated Replies):
```
---
This is an automated response from Mindspan Psychology.
For complex enquiries, a team member will follow up within 1 business day.

To unsubscribe from automated replies, reply with "STOP AUTOMATED".

Privacy Policy: https://www.mindspan.com.au/privacy
```

---

## 📈 Analytics & Monitoring

### Metrics to Track:
- Total emails received per day/week/month
- Category distribution (which questions are most common)
- Auto-response rate (% of emails handled automatically)
- Human intervention rate (% requiring manual follow-up)
- Response time (automated vs manual)
- Bounce rate
- Unsubscribe rate

### Dashboard (Google Sheets or Data Studio):
| Metric | Formula | Target |
|--------|---------|--------|
| Auto-Response Rate | (Auto-replies / Total Emails) × 100 | >70% |
| Human Review Rate | (Flagged Emails / Total Emails) × 100 | <30% |
| Scraping Success Rate | (Successful Scrapes / Total Attempts) × 100 | >95% |
| Average Response Time | Median time from received → sent | <2 minutes (auto) |

### Weekly Review:
1. Check unmatched queries → Add new keywords
2. Review flagged emails → Improve detection
3. Verify scraped data accuracy → Update fallbacks
4. Analyze trends → Update response templates

---

## 🚀 Deployment Checklist

### Before Going Live:
- [ ] Test scraping script with https://www.mindspan.com.au
- [ ] Verify all 9 response categories have correct keywords
- [ ] Test email sending from automation platform
- [ ] Set up logging to Google Sheets or database
- [ ] Configure emergency flagging for crisis keywords
- [ ] Add unsubscribe handling
- [ ] Test with 10 sample emails (all categories)
- [ ] Set up monitoring dashboard
- [ ] Brief team on automation (what's automated, what's not)
- [ ] Create process for human review of flagged emails

### Post-Launch (First Week):
- [ ] Monitor daily for unexpected responses
- [ ] Check scraping logs for failures
- [ ] Review flagged emails response time
- [ ] Gather feedback from team and recipients
- [ ] Adjust keyword matching as needed
- [ ] Document any issues and resolutions

---

## 🔄 Maintenance Schedule

### Daily:
- Auto-check: Scraping script runs at 2 AM AEST
- Auto-check: Email automation is active

### Weekly:
- Review unmatched queries → Update keywords
- Check flagged emails → Improve detection
- Verify scraped pricing matches website

### Monthly:
- Update response templates if services change
- Review analytics dashboard
- Optimize keyword matching
- Check for new FAQ patterns

### Quarterly:
- Full audit of all response categories
- Update fallback values
- Review compliance with AHPRA/Privacy Act
- Test disaster recovery (what if scraping fails for 7 days?)

---

## 📞 Support & Escalation

### If Automation Fails:
1. Check automation platform status (Zapier/Make.com down?)
2. Test web scraping manually
3. Review error logs
4. Temporarily disable automation and switch to manual monitoring
5. Fix issue and re-enable

### Contact:
- **Technical Issues**: (Your IT support or automation platform support)
- **Content Updates**: Ilker Abak (hello@mindspan.com.au)
- **Emergency Bypass**: Disable automation in platform settings

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-15 | Initial workflow document created |

---

## 🎯 Future Enhancements

### Phase 2 (3-6 months):
- [ ] Integrate with MindspanAI agent for consistency
- [ ] Add sentiment analysis (detect frustrated clients)
- [ ] Smart scheduling suggestions based on availability
- [ ] Multi-language support (Turkish)
- [ ] A/B test different response templates

### Phase 3 (6-12 months):
- [ ] AI-powered responses using Claude API (context-aware)
- [ ] Predictive booking (suggest times based on patterns)
- [ ] Automated follow-up sequences
- [ ] Integration with Halaxy for real-time availability
- [ ] SMS automation for appointment reminders

---

**END OF DOCUMENT**

---

## 📥 Export Instructions

This document is standalone and can be:
1. Imported directly into automation platforms (Zapier, Make.com, n8n)
2. Shared with developers for custom implementation
3. Used as a requirements document for email automation vendors
4. Referenced for training AI assistants (GPT, Claude)

**No external dependencies required** - all instructions are self-contained.
