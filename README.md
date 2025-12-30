# 🐶 Whiskey.ai

Your friendly (and adorably confused) pug assistant!

**🌐 Live Demo**: [https://whiskey-ai.vercel.app/](https://whiskey-ai.vercel.app/)

## About

Whiskey.ai is a fun, ChatGPT-style chat interface featuring Whiskey, a pug who tries their best to help with your questions... while getting distracted by treats, naps, and squirrels! This is a **mock AI** website - there's no real AI here, just an adorable pug with lots of personality!

## Features

✨ **ChatGPT/Claude-like UI** - Modern, clean, and professional design
🐕 **Adorable Pug Personality** - Confused but enthusiastic responses
🎭 **Easter Eggs** - Special responses for keywords like "treat", "walk", "squirrel"
💬 **Conversation History** - Saved in localStorage
🌓 **Dark/Light Mode** - Pug-themed color schemes
⚡ **Typing Indicators** - Realistic response delays
📚 **Random Pug Facts** - Learn fun facts about pugs!
🎨 **Smooth Animations** - Framer Motion powered

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **localStorage** - Conversation persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whiskey.ai.git
cd whiskey.ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Try These Easter Eggs!

- Say "treat" or "walk" or "squirrel"
- Tell Whiskey "good boy"
- Ask about "Python" or "React" (technical terms)
- Try "belly rubs" or mention the "postman"
- Say "I love you"

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/whiskey.ai)

Or manually:
```bash
npm run build
npm start
```

## Project Structure

```
whiskey.ai/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── chat/              # Chat interface components
│   ├── sidebar/           # Sidebar components
│   └── ui/                # Reusable UI components
├── lib/                   # Core logic
│   ├── whiskey-ai/        # Whiskey's brain (response system)
│   ├── storage/           # localStorage management
│   └── utils/             # Utilities
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── types/                 # TypeScript types
```

## How It Works

Whiskey's "AI" is powered by a multi-layered response system:

1. **Easter Egg Detection** - Checks for special keywords first
2. **Technical Term Matching** - Misinterprets programming terms in hilarious ways
3. **Pattern Recognition** - Identifies questions, greetings, sentiment
4. **Time-Based Moods** - Different personality based on time of day
5. **Fallback Responses** - Confused but eager when uncertain

## Contributing

This is a fun personal project, but contributions are welcome! Feel free to:

- Add more easter eggs
- Improve Whiskey's responses
- Add new features
- Fix bugs

## License

MIT License - feel free to fork and make your own pug AI!

## Credits

Made with ❤️ by Bryan (and Whiskey the Pug)

Inspired by: ChatGPT, Claude, and one very adorable pug named Whiskey

---

**Note**: This is a mock AI for entertainment purposes. Whiskey is not a real AI assistant (just a very enthusiastic pug)!
