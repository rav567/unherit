'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Finding = {
  category: string
  finding: string
  severity: 'low' | 'medium' | 'high'
  dataPoint: string
}

type AnalysisResult = {
  riskScore: number
  findings: Finding[]
  verdict: string
}

const categoryColors: Record<string, string> = {
  Health: 'text-red-400',
  Location: 'text-blue-400',
  Financial: 'text-yellow-400',
  Behavioural: 'text-orange-400',
  Educational: 'text-purple-400',
  Family: 'text-pink-400',
  Identity: 'text-red-300',
}

const severityColors = {
  high: 'text-red-400 bg-red-400/10 border-red-400/20',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  low: 'text-green-400 bg-green-400/10 border-green-400/20',
}

export default function CaptionAnalyser() {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
    setResult(null)
  }

  const analyse = useCallback(async (text: string, img: string | null) => {
    if (!text.trim() && !img) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/analyse-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption: text, image: img }),
      })

      if (!res.ok) throw new Error('Analysis failed')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError('Analysis failed — try again')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setCaption(val)
    setResult(null)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length > 10) {
      debounceRef.current = setTimeout(() => {
        analyse(val, image)
      }, 1000)
    }
  }

  const handleAnalyse = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    analyse(caption, image)
  }

    const scoreColor = result
        ? (result.riskScore >= 70 ? 'text-red-400' : result.riskScore >= 40 ? 'text-yellow-400' : 'text-green-400')
        : 'text-white'

    const scoreBarColor = result
        ? (result.riskScore >= 70 ? 'bg-red-400' : result.riskScore >= 40 ? 'bg-yellow-400' : 'bg-green-400')
        : 'bg-white/10'

  return (
    <section className="border-t border-white/5 px-6 py-24 relative">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-red-500"
            />
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Free Tool — No Account Required</p>
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight">
            How exposed is your post?
          </h2>
          <p className="text-white/40 text-base leading-relaxed">
            Paste a caption you've posted — or are about to post — and optionally upload the photo. 
            Our AI reads it exactly as a 2036 data broker would and gives you a Risk Score instantly.
          </p>
        </div>

        {/* Input area */}
        <div className="border border-white/10 bg-white/[0.02] flex flex-col">

          {/* Caption input */}
          <div className="p-5 border-b border-white/5">
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-3">Caption</p>
            <textarea
              value={caption}
              onChange={handleCaptionChange}
              placeholder={`"First day at St Mary's Primary! So proud of my little one 🎉 #Bristol #SchoolDays"`}
              rows={4}
              className="w-full bg-transparent text-white/70 text-sm font-mono placeholder:text-white/15 resize-none outline-none leading-relaxed"
            />
          </div>

          {/* Image upload */}
          <div className="p-5 border-b border-white/5">
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-3">Photo (optional)</p>
            {image ? (
              <div className="flex items-center gap-4">
                <img src={image} alt="uploaded" className="w-16 h-16 object-cover border border-white/10" />
                <div className="flex flex-col gap-1">
                  <p className="text-white/50 text-xs font-mono">{imageFile?.name}</p>
                  <button
                    onClick={() => { setImage(null); setImageFile(null); setResult(null) }}
                    className="text-red-400/60 text-xs font-mono hover:text-red-400 transition-colors text-left"
                  >
                    Remove →
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border border-dashed border-white/10 p-6 flex flex-col items-center gap-2 hover:border-white/20 hover:bg-white/[0.02] transition-all group"
              >
                <p className="text-white/20 text-2xl">↑</p>
                <p className="text-white/30 text-xs font-mono">Click to upload photo</p>
                <p className="text-white/15 text-xs font-mono">AI will analyse visible faces, locations, objects</p>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Analyse button */}
          <div className="p-5">
            <button
              onClick={handleAnalyse}
              disabled={loading || (!caption.trim() && !image)}
              className="w-full bg-white text-black py-3 text-sm font-mono font-semibold tracking-widest hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                  />
                  ANALYSING AS 2036 AI...
                </>
              ) : (
                'ANALYSE EXPOSURE RISK →'
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >

              {/* Score */}
              <div className="border border-white/10 p-6 bg-white/[0.02] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Exposure Risk Score</p>
                    <p className="text-white/40 text-xs font-mono">{result.verdict}</p>
                  </div>
                  <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-5xl font-bold font-mono ${scoreColor}`}
                  >
                    {result.riskScore}
                    <span className="text-white/20 text-2xl">/100</span>
                  </motion.p>
                </div>

                {/* Score bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.riskScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${scoreBarColor}`}
                  />
                </div>
              </div>

              {/* Findings */}
              {result.findings.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-white/20 text-xs font-mono tracking-widest uppercase">What The AI Extracted</p>
                  {result.findings.map((finding, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-white/5 p-4 flex items-start gap-4 bg-white/[0.01]"
                    >
                      <span className={`text-xs font-mono px-2 py-0.5 border flex-shrink-0 mt-0.5 ${severityColors[finding.severity]}`}>
                        {finding.severity.toUpperCase()}
                      </span>
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <p className="text-white/60 text-xs font-mono">{finding.finding}</p>
                        <p className="text-white/20 text-xs font-mono">
                          Source: <span className="text-white/30">"{finding.dataPoint}"</span>
                        </p>
                      </div>
                      <span className={`text-xs font-mono flex-shrink-0 ${categoryColors[finding.category] || 'text-white/30'}`}>
                        {finding.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {result.findings.length === 0 && (
                <div className="border border-green-400/20 p-4 bg-green-400/5">
                  <p className="text-green-400 text-sm font-mono">✓ Low exposure — no significant data signals detected</p>
                </div>
              )}

              {/* CTA */}
              <div className="border border-white/10 p-4 flex items-center justify-between bg-white/[0.02]">
                <p className="text-white/40 text-xs font-mono">Want to see your child's full shadow profile?</p>
                <p className="text-white text-xs font-mono">Run full scan →</p>
              </div>

            </motion.div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400/60 text-xs font-mono"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}