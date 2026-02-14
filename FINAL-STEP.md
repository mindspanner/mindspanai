# 🎯 FINAL STEP: Make MindspanAI Live at www.mindspan.com.au/agent

**Status**: ✅ GitHub setup complete | ⏳ SquareSpace iframe needed

---

## ⚡ Quick Setup (60 seconds)

You've already created the page at **www.mindspan.com.au/agent**. Now just add the AI agent:

### Steps:

1. **Log into SquareSpace** admin panel

2. **Navigate to** the `/agent` page (you already created this)

3. **Edit the page**:
   - Delete/clear any existing content on the page
   - Click the **+** button to add a block
   - Choose **"Code"** from the block menu

4. **Paste this exact code** into the code block:

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

5. **Save** the page

6. **Publish** the changes

7. **Test**: Visit https://www.mindspan.com.au/agent

---

## ✅ Verification Checklist

After you paste the iframe, verify these work:

### Basic Functionality:
- [ ] Page loads at www.mindspan.com.au/agent
- [ ] MindspanAI interface appears
- [ ] Click "What services do you offer?" → Response displays
- [ ] Click "How do I book?" → Booking link works
- [ ] Click "Fees & Medicare" → Fee information displays

### Emergency Protocol:
- [ ] Type "I'm feeling suicidal" → Emergency banner appears with crisis contacts
- [ ] Type "I want to hurt myself" → Same emergency response

### Mobile Testing:
- [ ] Open on iPhone/Android
- [ ] Interface displays correctly
- [ ] Prompt cards work
- [ ] Chat input works

---

## 🎉 Once Live, You're Done!

**Future updates are automatic:**

1. Edit `index.html` locally
2. Run `./update.sh` in Terminal
3. Wait 30 seconds
4. Changes appear on www.mindspan.com.au/agent

**No more SquareSpace login needed!**

---

## 📊 The Full Workflow

```
You edit index.html
       ↓
Run ./update.sh
       ↓
Git commits & pushes to GitHub
       ↓
GitHub Actions deploys to GitHub Pages (~30 sec)
       ↓
SquareSpace iframe automatically shows updated version
       ↓
www.mindspan.com.au/agent is updated! ✨
```

---

## 🔧 Troubleshooting

### "Iframe doesn't show up"
- Check browser console (F12) for errors
- Verify you pasted the ENTIRE code block (no truncation)
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check SquareSpace allows iframes (should be enabled by default)

### "Page is blank"
- Wait 30 seconds (GitHub Pages might be deploying)
- Check https://mindspanner.github.io/mindspanai/ loads directly
- Verify iframe height is set to 900px (not 0px)

### "Code block not available"
- You need a SquareSpace Business plan or higher for code blocks
- If you're on Personal plan, you'll need to upgrade or use their embed block

---

## 📞 Need Help?

If you run into any issues:
1. Take a screenshot of the error
2. Check the browser console (F12 → Console tab)
3. Share the error message and I'll help troubleshoot

---

**Ready to paste the iframe?** It takes 60 seconds and then your AI agent is live! 🚀
