# Formspree Setup Guide

## Quick Setup (5 minutes)

### Step 1: Sign Up
1. Go to https://formspree.io
2. Click "Sign up" (top right)
3. Create account with email and password
4. Verify your email if required

### Step 2: Create Form
1. After logging in, click **"+ New Form"** button
2. Give it a name: "VISUALANTIES Contact Form"
3. Click "Create"

### Step 3: Get Your Endpoint URL
1. You'll see your form endpoint URL
   - Format: `https://formspree.io/f/YOUR_FORM_ID`
   - Example: `https://formspree.io/f/xjvqknyz`
2. **COPY THIS URL** - you'll need it in the next step

### Step 4: Configure Email Notifications
1. In your form settings, go to **"Settings"** tab
2. Under **"Email Notifications"**:
   - Add: `FireDesireSA@gmail.com`
   - Add: `frankolious@gmail.com`
3. Customize email subject (optional):
   - Use: `New Contact: {{subject}}`
4. Save settings

### Step 5: Update Website
1. Open `index.html` in your project
2. Find line 699:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contact-form">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
   - Example: `https://formspree.io/f/xjvqknyz`
4. Save the file

### Step 6: Test
1. Push changes to GitHub
2. Visit your website
3. Fill out the contact form
4. Submit
5. Check your email inbox!

---

## Formspree Free Tier

✅ **50 submissions per month**  
✅ **Email notifications**  
✅ **Spam protection**  
✅ **Custom email templates**  
✅ **Form analytics**  

---

## Spam Protection

Formspree includes built-in spam protection, but you can enhance it:

1. In Formspree dashboard → Settings
2. Enable **"Honeypot"** field (recommended)
3. Enable **"reCAPTCHA"** if needed (requires Google reCAPTCHA setup)

---

## Customization Options

### Email Subject
In Formspree settings, you can customize:
- Subject line: `New Contact: {{subject}}`
- Reply-to: `{{email}}` (so you can reply directly)

### Email Template
You can customize the email template in Formspree to include:
- Company branding
- Formatted form data
- Custom styling

---

## Troubleshooting

### Form not sending?
- Check that you replaced `YOUR_FORM_ID` with actual ID
- Check browser console for errors
- Verify Formspree form is active
- Check spam folder for test emails

### Not receiving emails?
- Check Formspree dashboard → Submissions (to see if form is working)
- Verify email addresses in Formspree settings
- Check spam/junk folder
- Verify email addresses are correct

### CORS errors?
- Formspree handles CORS automatically
- If issues, check Formspree status page

---

## Next Steps (Future)

When you're ready to upgrade to Make.com:
1. See `TASKS.md` for Make.com migration steps
2. More automation options available
3. WhatsApp, CRM, and more integrations

---

**Need Help?**
- Formspree Docs: https://help.formspree.io
- Support: support@formspree.io

