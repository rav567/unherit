'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type Platform = {
  id: string
  name: string
  available: boolean
  color: string
  textColor: string
  description: string
  dataPoints: string[]
  icon: React.ReactNode
}

export default function Connect({ onConnect }: { onConnect: () => void }) {
  const [connecting, setConnecting] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const handleConnect = (platformId: string) => {
    if (platformId !== 'facebook') return
    setSelected('facebook')
    setConnecting(true)
    setTimeout(() => onConnect(), 2500)
  }

  const platforms: Platform[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      available: true,
      color: 'bg-[#1877F2]',
      textColor: 'text-white',
      description: 'Richest data source — posts, life events, location check-ins, family tags',
      dataPoints: ['Life events', 'Location check-ins', 'Photo albums', 'Family tags', 'Post captions'],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      available: false,
      color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
      textColor: 'text-white',
      description: 'Photo-heavy exposure — visual AI inference from images and captions',
      dataPoints: ['Photo grid', 'Stories archive', 'Location tags', 'Caption analysis', 'Face detection'],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      id: 'twitter',
      name: 'X / Twitter',
      available: false,
      color: 'bg-black border border-white/20',
      textColor: 'text-white',
      description: 'Text-heavy exposure — public posts, replies, thread analysis',
      dataPoints: ['Public tweets', 'Thread analysis', 'Reply patterns', 'Hashtag tracking', 'Location metadata'],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      available: false,
      color: 'bg-black border border-white/20',
      textColor: 'text-white',
      description: 'Video-based exposure — AI analysis of video content and metadata',
      dataPoints: ['Video content', 'Audio analysis', 'Comment patterns', 'Location data', 'Viewing habits'],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
        </svg>
      )
    },
  ]

  return (
    <main className="min-h-screen bg-transparent flex flex-col px-6 py-12 relative overflow-hidden">
      
      <div className="fixed inset-0 pulse-bg" />
      <div className="fixed inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <p className="text-white/40 text-sm font-mono tracking-widest uppercase mb-16 z-10 relative">Unherit</p>

      <div className="max-w-2xl mx-auto w-full z-10 flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Step 1 — Connect</p>
          <h2 className="text-white text-4xl font-bold leading-tight">
            Where does your child's<br />shadow profile live?
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-lg">
            Select a platform to scan. We read your public data exactly as a 2036 AI system would — 
            then show you what it sees.
          </p>
        </motion.div>

        {/* Platform grid */}
        <div className="flex flex-col gap-3">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {platform.available ? (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleConnect(platform.id)}
                  disabled={connecting}
                  className="w-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all p-5 flex items-start gap-5 text-left group"
                >
                  {/* Platform icon */}
                  <div className={`${platform.color} ${platform.textColor} p-2.5 flex-shrink-0 flex items-center justify-center`}>
                    {platform.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold">{platform.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-xs font-mono bg-green-400/10 px-2 py-0.5">AVAILABLE</span>
                        {connecting && selected === platform.id ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                          />
                        ) : (
                          <span className="text-white/30 group-hover:text-white transition-colors text-sm">→</span>
                        )}
                      </div>
                    </div>
                    <p className="text-white/40 text-sm">{platform.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {platform.dataPoints.map((point, j) => (
                        <span key={j} className="text-white/20 text-xs font-mono bg-white/5 px-2 py-0.5">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ) : (
                <div className="w-full border border-white/5 bg-white/[0.01] p-5 flex items-start gap-5 opacity-50">
                  {/* Platform icon */}
                  <div className={`${platform.color} ${platform.textColor} p-2.5 flex-shrink-0 flex items-center justify-center`}>
                    {platform.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white/50 font-semibold">{platform.name}</p>
                      <span className="text-white/20 text-xs font-mono bg-white/5 px-2 py-0.5">COMING SOON</span>
                    </div>
                    <p className="text-white/30 text-sm">{platform.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {platform.dataPoints.map((point, j) => (
                        <span key={j} className="text-white/10 text-xs font-mono bg-white/5 px-2 py-0.5">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connecting state */}
        {connecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-blue-400/20 bg-blue-400/5 p-4 flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full flex-shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-blue-400 text-sm font-mono">Connecting to Facebook...</p>
              <p className="text-white/30 text-xs font-mono">Loading Sarah Mitchell's profile — this is what any AI can already see</p>
            </div>
          </motion.div>
        )}

        {/* Privacy guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/5 pt-6 flex flex-col gap-3"
        >
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Privacy Guarantees</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🔒', text: 'Password never seen' },
              { icon: '⚡', text: 'No data stored' },
              { icon: '🛡️', text: 'Session only' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-3 border border-white/5 text-center">
                <span className="text-lg">{item.icon}</span>
                <p className="text-white/30 text-xs font-mono">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-white/10 text-xs font-mono text-center">
            Demo uses a simulated profile — no real account data accessed
          </p>
        </motion.div>

      </div>
    </main>
  )
}