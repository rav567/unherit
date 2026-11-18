# UNHERIT

### *For the generation that never got to say no.*

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-8E75B2?logo=googlegemini&logoColor=white)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-voice-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel&logoColor=white)
![HackLondon](https://img.shields.io/badge/HackLondon-2026-FF4F00)

> **Before a child can speak, they can already have more than 1,500 photos of them posted publicly. What happens when future AI systems use that data to decide their insurance, university place or job?**
>
> UNHERIT shows parents the **shadow profile** they have unknowingly built for their child through social media, as a 2036 AI would see it. Then it destroys it.

🔗 **Live demo:** [unherit.vercel.app](https://unherit.vercel.app)

**TL;DR:** a three-agent AI pipeline built in a weekend at HackLondon 2026 (Society Track: *The 2036 Problem*). Gemini Vision reads a parent's public posts and builds a risk dossier on the child, ElevenLabs reads it aloud in a cold clinical voice, and an adversarial "poisoning" step neutralises the data signals, taking the demo profile's Risk Score from **84 to 8**.

---

## How it works

UNHERIT runs three AI agents in sequence:

| Agent | Role | What it does |
|---|---|---|
| **1 · The Scraper** | See what the machines see | Reads public social media data exactly as a 2036 AI system would |
| **2 · The Profiler** | Build the shadow profile | Uses Gemini Vision to analyse photos and captions, producing a dossier and a **Risk Score out of 100** |
| **3 · The Poisoner** | Take it back | Applies adversarial perturbation to neutralise the data signals the profile was built from |

## Demo flow

1. **Landing:** a global counter of risk points eliminated, and the project overview
2. **Connect:** choose a platform (Facebook live, others coming soon)
3. **Scanning:** posts are analysed in real time and findings are revealed one by one
4. **Shadow Profile:** a bureaucratic dossier on the child, read aloud by ElevenLabs, with a Risk Score out of 100
5. **Protection:** adversarial poisoning is applied and the score drops from 84 to 8 in real time
6. **Reclaim:** GDPR dispute requests, opt-out links and a "digital property deed" for the child
7. **Plan:** data dividend tracking, data broker negotiation and a collective legal fund

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router) with **TypeScript** |
| AI analysis | **Google Gemini 2.0 Flash**: vision and text analysis |
| Voice | **ElevenLabs** (`eleven_turbo_v2_5`): clinical narration of the dossier |
| Styling | **Tailwind CSS** |
| Animation | **Framer Motion** |
| Hosting | **Vercel** |

---

## Quick start

### Prerequisites
- Node.js 18 or newer
- A [Google AI Studio](https://aistudio.google.com/app/apikey) API key for Gemini
- An [ElevenLabs](https://elevenlabs.io/) API key

### 1. Clone and install

```bash
git clone https://github.com/rav567/unherit.git
cd unherit
npm install
```

### 2. Add your API keys

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

| Variable | Used for |
|---|---|
| `GEMINI_API_KEY` | Gemini 2.0 Flash vision and text analysis |
| `ELEVENLABS_API_KEY` | ElevenLabs text-to-speech narration |

`.env.local` is git-ignored, so your keys stay out of the repository.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rav567/unherit&env=GEMINI_API_KEY,ELEVENLABS_API_KEY)

Click the button, or import the repo in Vercel, then add both environment variables under **Settings → Environment Variables**.

## Project structure

```
├── app/              # Next.js App Router: pages, components and server logic
├── public/           # Static assets
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Built at

**HackLondon 2026** · Society Track: *The 2036 Problem*

## Author

**Ravpreet Gill** · [@rav567](https://github.com/rav567)

---

<p align="center"><i>Your child's identity should be theirs to own.</i></p>
