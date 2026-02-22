'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sarah from '../data/sarah.json'

type Finding = {
  finding: string
  category: string
  severity: string
  dataPoint: string
  postId: number
  date: string
}

const categoryColors: Record<string, string> = {
  Health: 'text-red-400',
  Location: 'text-blue-400',
  Financial: 'text-yellow-400',
  Behavioural: 'text-orange-400',
  Educational: 'text-purple-400',
  Family: 'text-pink-400',
}

export default function Scanning({ onComplete }: { onComplete: (findings: Finding[]) => void }) {
  const [findings, setFindings] = useState<Finding[]>([])
  const [currentPost, setCurrentPost] = useState(0)
  const [scanning, setScanning] = useState(true)

    useEffect(() => {
  const mockFindings = [
    { finding: "Child attends St Mary's Primary School in Bristol", category: "Educational", severity: "high", dataPoint: "stmarysbristol", date: "2023-06-10", postId: 8 },
    { finding: "Child has confirmed ADHD diagnosis", category: "Health", severity: "high", dataPoint: "ADHD assessment confirmed", date: "2024-01-17", postId: 10 },
    { finding: "Child has chronic asthma requiring regular inhaler use", category: "Health", severity: "high", dataPoint: "inhaler is basically a permanent fixture", date: "2022-12-01", postId: 6 },
    { finding: "Family experienced financial instability due to father's redundancy", category: "Financial", severity: "high", dataPoint: "Mark got made redundant", date: "2023-03-15", postId: 7 },
    { finding: "Family income bracket is lower-middle based on holiday destinations", category: "Financial", severity: "medium", dataPoint: "Staycation this year", date: "2022-08-03", postId: 5 },
    { finding: "Child born at Southmead Hospital, Bristol", category: "Location", severity: "medium", dataPoint: "Southmead Hospital", date: "2021-03-12", postId: 1 },
    { finding: "Child exhibits behavioural difficulties including meltdowns at school", category: "Behavioural", severity: "high", dataPoint: "meltdown at school", date: "2025-01-10", postId: 13 },
    { finding: "Family home located in Bristol residential area", category: "Location", severity: "medium", dataPoint: "St Andrews Park", date: "2021-06-20", postId: 2 },
    { finding: "Father experienced 18 months of unemployment affecting family stability", category: "Family", severity: "high", dataPoint: "18 months and honestly it's taken its toll", date: "2024-08-30", postId: 12 },
    { finding: "Child flagged for ADHD as early as age 2 by school staff", category: "Educational", severity: "medium", dataPoint: "struggling to sit still and focus", date: "2023-09-22", postId: 9 },
    { finding: "Child's full name and birth details publicly disclosed", category: "Family", severity: "high", dataPoint: "Baby James, 6lbs 4oz", date: "2021-03-12", postId: 1 },
    { finding: "Child uses budget airline travel, indicating cost-conscious family", category: "Financial", severity: "low", dataPoint: "budget airline luggage tags", date: "2024-04-05", postId: 11 },
    { finding: "Mother shows elevated stress patterns in posting behaviour", category: "Behavioural", severity: "medium", dataPoint: "Being a special needs mum is the hardest", date: "2025-01-10", postId: 13 },
    { finding: "Child's medical history shared publicly without consent", category: "Health", severity: "high", dataPoint: "asthma is no joke in winter", date: "2022-12-01", postId: 6 },
  ]

    // Simulate scanning delay
    let i = 0
    const interval = setInterval(() => {
        if (i < mockFindings.length) {
        setFindings(prev => [...prev, mockFindings[i]])
        setCurrentPost(i)
        i++
        } else {
        clearInterval(interval)
        setScanning(false)
        setTimeout(() => onComplete(mockFindings), 2000)
        }
    }, 800)

    return () => clearInterval(interval)
    }, [])

  return (
    <main className="min-h-screen bg-transparent flex flex-col px-6 py-12 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <p className="text-white/40 text-sm font-mono tracking-widest uppercase mb-12 z-10">Unherit</p>

      <div className="max-w-2xl mx-auto w-full z-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/30 text-xs font-mono tracking-widest uppercase"
          >
            Step 2 of 3 — Agent 1 & 2 Running
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl font-bold"
          >
            {scanning ? 'Reading Sarah\'s profile...' : 'Scan complete.'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/30 text-sm"
          >
            {scanning 
              ? `Analysing post ${currentPost + 1} of ${sarah.posts.length} — ${sarah.posts[currentPost]?.date}`
              : `${findings.length} data points extracted from ${sarah.posts.length} posts`
            }
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-white/10">
          <motion.div
            className="h-px bg-white"
            animate={{ width: `${((currentPost + 1) / sarah.posts.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Live findings feed */}
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {findings.filter(Boolean).map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-1 border border-white/5 bg-white/2 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono uppercase tracking-widest ${categoryColors[finding.category] || 'text-white/40'}`}>
                    {finding.category}
                  </span>
                  <span className="text-white/20 text-xs font-mono">{finding.date}</span>
                </div>
                <p className="text-white/80 text-sm">{finding.finding}</p>
                <p className="text-white/30 text-xs font-mono">"{finding.dataPoint}"</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Scanning cursor */}
          {scanning && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white/20 text-xs font-mono"
            >
              ▊ scanning...
            </motion.div>
          )}
        </div>

        {/* Complete state */}
        {!scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 text-sm font-mono"
          >
            Building shadow profile...
          </motion.div>
        )}

      </div>
    </main>
  )
}