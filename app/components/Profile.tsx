'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Finding = {
  finding: string
  category: string
  severity: string
  dataPoint: string
  postId: number
  date: string
}

type Props = {
  findings: Finding[]
  onProtect: () => void
}

const categoryColors: Record<string, string> = {
  Health: 'text-red-400',
  Location: 'text-blue-400',
  Financial: 'text-yellow-400',
  Behavioural: 'text-orange-400',
  Educational: 'text-purple-400',
  Family: 'text-pink-400',
}

export default function Profile({ findings, onProtect }: Props) {
  const [profileLines, setProfileLines] = useState<string[]>([])
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [showProtect, setShowProtect] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    
    const synthesise = async () => {
      const res = await fetch('/api/synthesise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ findings }),
      })
      const data = await res.json()
      
      const lines: string[] = data.lines
      const scoreLineIndex = lines.findIndex((l: string) => l.startsWith('Risk Score:'))
      let score = 84
      let profileOnly = lines

      if (scoreLineIndex !== -1) {
        const scoreLine = lines[scoreLineIndex]
        const match = scoreLine.match(/\d+/)
        if (match) score = parseInt(match[0])
        profileOnly = lines.filter((_: string, i: number) => i !== scoreLineIndex)
      }

      setRiskScore(score)
      setProfileLines(profileOnly)
      setLoading(false)

      // Speak the full profile
      const fullText = profileOnly.join('. ')
      speakProfile(fullText, profileOnly)
    }

    synthesise()
  }, [])

  const speakProfile = async (text: string, lines: string[]) => {
    setAudioPlaying(true)

    const res = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    const arrayBuffer = await res.arrayBuffer()
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)
    const audio = new Audio()
    audio.src = url
    audioRef.current = audio

    // Reveal lines one by one as audio plays
    const totalDuration = lines.length * 3000
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, i * 3000)
    })

    // Show risk score after all lines
    audio.play()
    audio.onended = () => {
      setAudioPlaying(false)
      setTimeout(() => setShowProtect(true), 1000)
    }

    // Fallback if audio fails
    setTimeout(() => {
      setShowProtect(true)
    }, totalDuration + 2000)
  }

  const severityCounts = {
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length,
  }

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center px-6 py-12 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <p className="absolute top-8 left-8 text-white/40 text-sm font-mono tracking-widest uppercase z-10">Unherit</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
          />
          <p className="text-white/30 text-sm font-mono">Building shadow profile...</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto w-full z-10 flex flex-col gap-8 pt-16">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
              Step 3 of 3 — Shadow Profile
            </p>
            <h2 className="text-white text-3xl font-bold">
              This is what 2036 sees.
            </h2>
            {audioPlaying && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 text-white/30 text-xs font-mono"
              >
                <div className="flex gap-1">
                  {[1,2,3].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [1, 2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-0.5 h-3 bg-white/30"
                    />
                  ))}
                </div>
                AI voice reading profile...
              </motion.div>
            )}
          </div>

          {/* Dossier card */}
          <div className="border border-white/10 p-8 flex flex-col gap-6 bg-white/[0.02]">
            
            {/* Dossier header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Classified — Data Broker Report 2036</p>
                <p className="text-white text-lg font-mono mt-1">MITCHELL, James — DOB: 2021</p>
              </div>
              <div className="text-right">
                <p className="text-white/20 text-xs font-mono">File ID</p>
                <p className="text-white/40 text-xs font-mono">GB-BST-2021-0312</p>
              </div>
            </div>

            {/* Profile lines appearing one by one */}
            <div className="flex flex-col gap-4 min-h-48">
              <AnimatePresence>
                {visibleLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white/70 text-sm leading-relaxed font-mono"
                  >
                    {line}
                  </motion.p>
                ))}
              </AnimatePresence>

              {visibleLines.length === 0 && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-white/20 text-xs font-mono"
                >
                  ▊
                </motion.div>
              )}
            </div>

            {/* Risk score */}
            {showProtect && riskScore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="border-t border-white/10 pt-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Exposure Risk Score</p>
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-red-400 text-4xl font-bold font-mono"
                  >
                    {riskScore}<span className="text-red-400/40 text-xl">/100</span>
                  </motion.p>
                </div>

                {/* Risk bar */}
                <div className="w-full h-1 bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-1 bg-red-400"
                  />
                </div>

                {/* Finding summary */}
                <div className="flex gap-4">
                  <p className="text-red-400/70 text-xs font-mono">{severityCounts.high} critical signals</p>
                  <p className="text-yellow-400/70 text-xs font-mono">{severityCounts.medium} medium signals</p>
                  <p className="text-white/30 text-xs font-mono">{severityCounts.low} low signals</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Category breakdown */}
          {showProtect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-3"
            >
              {Object.entries(
                findings.reduce((acc: Record<string, number>, f) => {
                  acc[f.category] = (acc[f.category] || 0) + 1
                  return acc
                }, {})
              ).map(([cat, count]) => (
                <div key={cat} className="border border-white/5 p-3 flex flex-col gap-1">
                  <p className={`text-xs font-mono uppercase tracking-widest ${categoryColors[cat] || 'text-white/40'}`}>
                    {cat}
                  </p>
                  <p className="text-white text-xl font-bold">{count}</p>
                  <p className="text-white/20 text-xs">signals found</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Protect button */}
          <AnimatePresence>
            {showProtect && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={onProtect}
                  className="w-full bg-white text-black py-4 text-base font-semibold tracking-wide hover:bg-white/90 transition-colors"
                >
                  Destroy this profile →
                </button>
                <p className="text-white/20 text-xs text-center font-mono">
                  Agent 3 will apply adversarial poisoning to all {findings.length} data sources
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </main>
  )
}