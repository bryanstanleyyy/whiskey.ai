# Whiskey.ai - AI Setup Guide

## Getting Your Free Google Gemini API Key

Whiskey now uses Google's Gemini 1.5 Flash AI to generate responses! Here's how to get your free API key:

### Step 1: Get the API Key

1. Visit **Google AI Studio**: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Click **"Create API key in new project"** (or use existing project)
5. Copy the generated API key

### Step 2: Add Key to Your Project

1. Open the file `.env.local` in the project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   GOOGLE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. Save the file

### Step 3: Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It Out!

Open http://localhost:3000 and chat with Whiskey!

---

## Free Tier Limits

Google Gemini 1.5 Flash free tier includes:
- ✅ **15 requests per minute**
- ✅ **1 million tokens per day** (~750,000 words)
- ✅ **1,500 requests per day**

This is MORE than enough for personal use and testing!

---

## Testing Checklist

### ✅ Basic Conversation
- Type "Hello!" → Should get an enthusiastic pug greeting
- Ask "What is Python?" → Should get confused about snakes
- Ask a random question → Should get AI-powered pug response

### ✅ Easter Eggs (Should Be Instant!)
- Type "treat" → Immediate excited response (NO API call)
- Type "walk" → Immediate zoomies response
- Type "squirrel" → Immediate alert response
- Type "good boy" → Immediate happy response

### ✅ Error Handling
- **Test rate limiting**: Send 16 messages rapidly (should get friendly "pug brain overheating" message)
- **Test without API key**: Remove API key → should get fallback response

---

## Troubleshooting

### "API key not valid" Error

**Fix**:
1. Check `.env.local` has the correct key (no extra spaces)
2. Make sure you **restarted the dev server** after adding the key
3. Verify the key is active at https://makersuite.google.com/app/apikey

### Responses Feel "Off" or Too Serious

**Fix**:
The system prompt might need adjustment. The AI should:
- Use *asterisk actions* frequently
- Include pug behaviors (*tail wagging*, *snorts*)
- End responses with [MOOD:___]
- Be 70% confused, 30% helpful

If responses don't feel like Whiskey, let me know and we can tune the prompt!

### Slow Responses

**Fix**:
- First response might be slower (cold start)
- Check your internet connection
- Gemini typically responds in 1-3 seconds

### Easter Eggs Not Working

**Fix**:
Easter eggs should work even WITHOUT an API key. They're instant and hardcoded.
- Make sure you're typing exact trigger words: "treat", "walk", "squirrel", "nap", "good boy"
- Check browser console for errors

---

## What Changed?

**Before (v1.0):**
- All responses were hardcoded
- Limited variety
- Same responses repeated

**After (v2.0 - AI Powered):**
- Gemini AI generates dynamic responses
- Every response is unique
- Context-aware conversation
- Still maintains Whiskey's pug personality!

**What Stayed the Same:**
- Easter eggs (instant trigger words)
- UI/UX (no visual changes)
- Typing indicators
- Conversation history
- Adorable pug confusion!

---

## API Usage Tips

To conserve your free tier:
1. **Easter eggs use NO API calls** - they're instant!
2. Only actual conversations use the API
3. Rate limiting prevents burning through quota
4. 15 req/min = plenty for testing

---

## Production Deployment

When deploying to Vercel or other hosting:

1. Go to your project settings
2. Add environment variable:
   ```
   GOOGLE_GEMINI_API_KEY=your_key_here
   ```
3. Redeploy

Your API key stays secure on the server - it's never exposed to users!

---

## Need Help?

- **API Key Issues**: https://ai.google.dev/tutorials/setup
- **Gemini Docs**: https://ai.google.dev/docs
- **Rate Limits**: https://ai.google.dev/pricing

Enjoy chatting with AI-powered Whiskey! 🐕✨
