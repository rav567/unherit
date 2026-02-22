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
  onComplete: () => void
}

const categoryColors: Record<string, string> = {
  Health: 'text-red-400',
  Location: 'text-blue-400',
  Financial: 'text-yellow-400',
  Behavioural: 'text-orange-400',
  Educational: 'text-purple-400',
  Family: 'text-pink-400',
}

export default function Protect({ findings, onComplete }: Props) {
  const initialScore = 84
  const [score, setScore] = useState(initialScore)
  const [poisonedCount, setPoisonedCount] = useState(0)
  const [poisonedFindings, setPoisonedFindings] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [voicePlayed, setVoicePlayed] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const total = findings.length
    const scoreReduction = Math.floor((initialScore - 8) / total)

    findings.forEach((_, i) => {
      setTimeout(() => {
        setPoisonedFindings(prev => [...prev, i])
        setPoisonedCount(i + 1)
        setScore(prev => Math.max(8, prev - scoreReduction))

        if (i === total - 1) {
          setScore(8)
          setTimeout(() => {
            setDone(true)
            playNeutralised()
          }, 800)
        }
      }, i * 600)
    })
  }, [])

  const playNeutralised = async () => {
    if (voicePlayed) return
    setVoicePlayed(true)
    try {
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: 'Profile neutralised. No identifiable information detected. Shadow profile destroyed.' 
        }),
      })
    const arrayBuffer = await res.arrayBuffer()
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)
    const audio = new Audio()
    audio.src = url
    audio.play()
    } catch (e) {
      console.error('Voice failed', e)
    }
  }

  const scoreColor = score > 60 ? 'text-red-400' : score > 30 ? 'text-yellow-400' : 'text-green-400'

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center px-6 py-12 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <p className="absolute top-8 left-8 text-white/40 text-sm font-mono tracking-widest uppercase z-10">Unherit</p>

      <div className="max-w-2xl mx-auto w-full z-10 flex flex-col gap-8 pt-16">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
            Agent 3 — Adversarial Poisoner
          </p>
          <h2 className="text-white text-3xl font-bold">
            {done ? 'Profile destroyed.' : 'Poisoning shadow profile...'}
          </h2>
          <p className="text-white/30 text-sm font-mono">
            {done 
              ? 'All data signals neutralised. AI systems will find nothing.'
              : `Applying adversarial perturbation to ${poisonedCount} of ${findings.length} signals`
            }
          </p>
        </div>

        {/* Score display */}
        <div className="border border-white/10 p-8 flex flex-col gap-6 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Exposure Risk Score</p>
              <p className="text-white/20 text-xs font-mono">Updating in real time</p>
            </div>
            <motion.p
              key={score}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className={`text-5xl font-bold font-mono ${scoreColor}`}
            >
              {score}<span className="text-white/20 text-2xl">/100</span>
            </motion.p>
          </div>

          {/* Score bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`h-2 rounded-full ${score > 60 ? 'bg-red-400' : score > 30 ? 'bg-yellow-400' : 'bg-green-400'}`}
            />
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-mono text-white/30">
            <span>{poisonedCount} signals neutralised</span>
            <span>{findings.length - poisonedCount} remaining</span>
          </div>
        </div>

        {/* Findings being neutralised */}
        <div className="flex flex-col gap-2">
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-2">Signal Neutralisation Log</p>
          <AnimatePresence>
            {findings.map((finding, i) => {
              const isPoisoned = poisonedFindings.includes(i)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex items-center justify-between p-3 border transition-all duration-500 ${
                    isPoisoned 
                      ? 'border-white/5 bg-white/[0.01]' 
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Status icon */}
                    <div className="flex-shrink-0">
                      {isPoisoned ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4 rounded-full bg-red-400/20 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <p className={`text-xs font-mono truncate transition-all duration-500 ${
                        isPoisoned ? 'text-white/20 line-through' : 'text-white/60'
                      }`}>
                        {finding.finding}
                      </p>
                      {isPoisoned && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-400/50 text-xs font-mono"
                        >
                          ✓ Signal corrupted — unreadable to AI
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <span className={`text-xs font-mono ml-3 flex-shrink-0 ${categoryColors[finding.category] || 'text-white/20'} ${isPoisoned ? 'opacity-30' : ''}`}>
                    {finding.category}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Complete state */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              {/* Final score comparison */}
              <div className="border border-green-400/20 p-6 bg-green-400/5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-green-400 text-xs font-mono tracking-widest uppercase">Protection Complete</p>
                  <p className="text-white/50 text-sm font-mono">Score reduced from {initialScore} to 8</p>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400/50 text-2xl line-through">{initialScore}</span>
                  <span className="text-white/30">→</span>
                  <span className="text-green-400 text-3xl font-bold">8</span>
                </div>
              </div>

              <button
                onClick={onComplete}
                className="w-full bg-white text-black py-4 text-base font-semibold tracking-wide hover:bg-white/90 transition-colors"
              >
                Download protected profile →
              </button>

              <p className="text-white/20 text-xs text-center font-mono">
                All {findings.length} signals neutralised. Your child's shadow profile has been destroyed.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  )
}