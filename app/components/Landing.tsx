'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function Landing({ onStart }: { onStart: () => void }) {
  const [counter, setCounter] = useState(1847293)
  const [currentYear] = useState(2036)
  const [glitchText, setGlitchText] = useState('UNHERIT')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Glitch effect on title
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const original = 'UNHERIT'
    let iterations = 0
    const interval = setInterval(() => {
      setGlitchText(
        original.split('').map((char, i) => {
          if (i < iterations) return original[i]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      if (iterations >= original.length) {
        clearInterval(interval)
        setGlitchText(original)
      }
      iterations += 0.5
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: '1,500+', label: 'Photos posted before age 5' },
    { value: '2036', label: 'When AI systems harvest it' },
    { value: '£0', label: 'Consent given by the child' },
  ]

  const consequences = [
    { year: '2026', event: 'Parents post 1,500+ photos', status: 'happening' },
    { year: '2030', event: 'AI cross-references every post', status: 'soon' },
    { year: '2033', event: 'Insurance profiling begins', status: 'future' },
    { year: '2034', event: 'University admissions affected', status: 'future' },
    { year: '2036', event: 'First job shaped by childhood data', status: 'future' },
  ]

  return (
    <div ref={containerRef} className="bg-black text-white">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col relative overflow-hidden">
        
        {/* Grid background */}
        <div className="fixed inset-0 pulse-bg" />
        <div className="fixed inset-0 grid-overlay" />
        
        {/* Top red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent origin-left"
        />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-between px-8 py-6 relative z-10"
        >
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-mono tracking-widest">UNHERIT</span>
            <span className="text-white/20 text-xs font-mono">EST. {currentYear}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs font-mono hidden md:block">PROTECTING THE NEXT GENERATION</span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="text-xs font-mono text-black bg-white px-4 py-2 tracking-widest hover:bg-white/90 transition-colors"
            >
              RUN SCAN →
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          style={{ opacity, y }}
          className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10"
        >
          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-red-500"
            />
            <span className="text-white/30 text-xs font-mono tracking-widest uppercase">
              The data is being created now. The consequences arrive in 2036.
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 font-mono"
          >
            {glitchText}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-white/20" />
            <p className="text-white/40 text-sm font-mono tracking-widest uppercase">
              Un-inherit the digital identity you never chose
            </p>
            <div className="h-px w-16 bg-white/20" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          >
            Before your child could speak, their digital identity was being built. 
            By 2036, AI systems will use it to make invisible decisions about their 
            insurance, education, and employment.
            <span className="text-white"> Nobody told you. We do.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="bg-white text-black px-12 py-5 text-base font-semibold tracking-widest hover:bg-white/90 transition-colors font-mono"
            >
              SEE YOUR CHILD'S SHADOW PROFILE →
            </motion.button>
            <p className="text-white/20 text-xs font-mono">No account. No data stored. Results in 60 seconds.</p>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-t border-white/5 grid grid-cols-3 relative z-10"
        >
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center py-6 gap-1 ${i < 2 ? 'border-r border-white/5' : ''}`}>
              <p className="text-white text-2xl font-bold font-mono">{stat.value}</p>
              <p className="text-white/30 text-xs font-mono text-center">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="max-w-2xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 mb-16"
          >
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">The Consequence Chain</p>
            <h2 className="text-white text-3xl font-bold">The data is harmless now.<br/>The damage arrives later.</h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {consequences.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 group"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    item.status === 'happening' ? 'bg-red-500' : 
                    item.status === 'soon' ? 'bg-yellow-500' : 'bg-white/20'
                  }`} />
                  {i < consequences.length - 1 && (
                    <div className="w-px flex-1 min-h-12 bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex items-start justify-between w-full pb-8">
                  <div className="flex flex-col gap-1">
                    <p className={`text-sm font-mono ${
                      item.status === 'happening' ? 'text-red-400' :
                      item.status === 'soon' ? 'text-yellow-400' : 'text-white/30'
                    }`}>
                      {item.status === 'happening' ? '● NOW' : item.status === 'soon' ? '◐ SOON' : '○ FUTURE'}
                    </p>
                    <p className={`text-base ${item.status === 'happening' ? 'text-white' : 'text-white/50'}`}>
                      {item.event}
                    </p>
                  </div>
                  <p className="text-white/20 text-sm font-mono flex-shrink-0 ml-4">{item.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="border-t border-white/5 px-6 py-24 relative">
        <div className="max-w-2xl mx-auto relative z-10 flex flex-col gap-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">The Deepest Cut</p>
            <p className="text-white/70 text-xl leading-relaxed">
              This disproportionately affects children of the most engaged, loving parents — 
              the ones who share the most.
            </p>
            <p className="text-white/40 text-base leading-relaxed">
              Wealthy, privacy-conscious parents who share less protect their children. 
              Working-class parents who share openly create the largest exposure. 
              Parental love becomes a vector for future discrimination.
            </p>
            <div className="border-l-2 border-red-500/50 pl-4">
              <p className="text-white/60 text-sm font-mono italic">
                "Digital inequality starts at birth, created by the people who love you most."
              </p>
            </div>
          </motion.div>

          {/* The inequality table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/10 overflow-hidden"
          >
            <div className="grid grid-cols-2 border-b border-white/10">
              <div className="p-4 border-r border-white/10">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Privacy-Conscious Parent</p>
                <p className="text-green-400 text-xs font-mono">Low exposure</p>
              </div>
              <div className="p-4">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Engaged Sharing Parent</p>
                <p className="text-red-400 text-xs font-mono">High exposure</p>
              </div>
            </div>
            {[
              ['Private posts only', '1,500+ public photos'],
              ['No location tags', 'Hospital, school, home tagged'],
              ['No health disclosures', 'Asthma, ADHD shared publicly'],
              ['Child protected', 'Shadow profile built'],
            ].map(([left, right], i) => (
              <div key={i} className={`grid grid-cols-2 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                <div className="p-3 border-r border-white/5 flex items-center gap-2">
                  <span className="text-green-400/50 text-xs">✓</span>
                  <span className="text-white/30 text-xs font-mono">{left}</span>
                </div>
                <div className="p-3 flex items-center gap-2">
                  <span className="text-red-400/50 text-xs">✗</span>
                  <span className="text-white/50 text-xs font-mono">{right}</span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/5 px-6 py-24 relative">
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 mb-16"
          >
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">How Unherit Works</p>
            <h2 className="text-white text-3xl font-bold">Three agents. One mission.</h2>
          </motion.div>

          <div className="flex flex-col gap-px">
            {[
              { 
                num: '01', 
                name: 'THE SCRAPER', 
                description: 'Reads your social media exactly as a 2036 AI would. Every photo, caption, location tag, life event.',
                color: 'text-red-400'
              },
              { 
                num: '02', 
                name: 'THE PROFILER', 
                description: 'Builds your child\'s shadow profile using Gemini AI. Health conditions. Income bracket. Behavioural flags. Risk Score.',
                color: 'text-yellow-400'
              },
              { 
                num: '03', 
                name: 'THE POISONER', 
                description: 'Applies adversarial perturbation to every photo. Imperceptible to humans. Unreadable to AI. Your child\'s profile, destroyed.',
                color: 'text-green-400'
              },
            ].map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-6 bg-white/[0.01] flex gap-6 items-start"
              >
                <p className={`text-xs font-mono ${agent.color} flex-shrink-0 mt-0.5`}>{agent.num}</p>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-sm font-mono tracking-widest">{agent.name}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{agent.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter + Final CTA */}
      <section className="border-t border-white/5 px-6 py-24 relative">
        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Risk Points Eliminated Globally</p>
            <p className="text-white text-5xl font-bold font-mono">
              {counter.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-white text-3xl font-bold">Your child's identity<br/>should be theirs to own.</h2>
            <p className="text-white/40 text-base max-w-md leading-relaxed">
              Not built by accident. Not inherited by default. Not harvested without consent.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="bg-white text-black px-12 py-5 text-base font-semibold tracking-widest hover:bg-white/90 transition-colors font-mono"
          >
            SEE YOUR CHILD'S SHADOW PROFILE →
          </motion.button>

          <p className="text-white/10 text-xs font-mono">
            UNHERIT — EST. 2036 — BUILT FOR HACKLONDON
          </p>
        </div>
      </section>

    </div>
  )
}