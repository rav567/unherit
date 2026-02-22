# UNHERIT

> *For the generation that never got to say no.*

UNHERIT is a hackathon project built for HackLondon that reveals the shadow digital profiles parents unknowingly build for their children through social media. Before a child can speak, they have 1,500+ photos posted publicly. By 2036, AI systems will use this data to make invisible decisions about their insurance, university admissions, and employment. UNHERIT shows parents the shadow profile they've created — then destroys it.

## The Three Agents

- **Agent 1 — The Scraper:** Reads public social media data exactly as a 2036 AI would
- **Agent 2 — The Profiler:** Uses Gemini Vision AI to build a shadow profile with a Risk Score /100
- **Agent 3 — The Poisoner:** Applies adversarial perturbation to neutralise all data signals

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, TypeScript
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Gemini API](https://ai.google.dev/) — Vision + text analysis (gemini-2.0-flash)
- [ElevenLabs API](https://elevenlabs.io/) — Clinical voice narration (eleven_turbo_v2_5)
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Vercel](https://vercel.com/) — Deployment

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- An [ElevenLabs](https://elevenlabs.io/) API key

### Installation

Clone the repository:
```bash
git clone https://github.com/rav567/unherit.git
cd unherit
```

Install dependencies:
```bash
npm install
```

Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Flow

1. **Landing** — Global counter of risk points eliminated, project overview
2. **Connect** — Platform selection (Facebook live, others coming soon)
3. **Scanning** — Real-time post analysis, findings revealed one by one
4. **Shadow Profile** — Bureaucratic dossier read aloud by ElevenLabs, Risk Score /100
5. **Protection** — Adversarial poisoning applied, score drops from 84 to 8 in real time
6. **Reclaim** — GDPR dispute requests, opt-out links, digital property deed
7. **Plan** — Data dividend tracking, broker negotiation, collective legal fund

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key for Gemini 2.0 Flash |
| `ELEVENLABS_API_KEY` | ElevenLabs API key for TTS narration |

## Deployment

Deploy instantly on [Vercel](https://vercel.com/). Add your environment variables under **Settings → Environment Variables** in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rav567/unherit)

## Built At

HackLondon — February 2026  
Society Track — *The 2036 Problem*

---

*UNHERIT © 2036 — Your child's identity should be theirs to own.*