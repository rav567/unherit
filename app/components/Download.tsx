'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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

const brokers = [
  { name: 'Acxiom', points: 2847, lastSold: '3 days ago', value: '$0.12' },
  { name: 'Oracle Data Cloud', points: 1923, lastSold: '1 week ago', value: '$0.09' },
  { name: 'Experian', points: 1456, lastSold: '2 days ago', value: '$0.11' },
  { name: 'LexisNexis', points: 987, lastSold: 'Today', value: '$0.08' },
  { name: 'CoreLogic', points: 743, lastSold: '5 days ago', value: '$0.06' },
]

const platforms = [
  { name: 'Instagram', url: 'https://instagram.com/accounts/privacy_and_security' },
  { name: 'Facebook', url: 'https://facebook.com/settings?tab=privacy' },
  { name: 'TikTok', url: 'https://tiktok.com/settings/privacy' },
  { name: 'Google', url: 'https://myaccount.google.com/data-and-privacy' },
  { name: 'Twitter/X', url: 'https://twitter.com/settings/privacy_and_safety' },
]

export default function Download({ findings, onComplete }: Props) {
  const [disputed, setDisputed] = useState<string[]>([])
  const [optedOut, setOptedOut] = useState<string[]>([])
  const [deedFiled, setDeedFiled] = useState(false)
  const highCount = findings.filter(f => f.severity === 'high').length

  const handleDispute = (name: string) => {
    setDisputed(prev => [...prev, name])
  }

  const handleDisputeAll = () => {
    setDisputed(brokers.map(b => b.name))
  }

  const handleOptOut = (name: string) => {
    setOptedOut(prev => [...prev, name])
  }

  return (
    <main className="min-h-screen bg-transparent text-white relative overflow-hidden">
      
      <div className="fixed inset-0 pulse-bg" />
      <div className="fixed inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-white text-sm font-mono tracking-widest">UNHERIT</span>
          <span className="text-white/20 text-xs font-mono">|</span>
          <span className="text-white/20 text-xs font-mono">EST. 2036</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          {['VERIFY ✓', 'SCAN ✓', 'VAULT ✓', 'RECLAIM'].map((item, i) => (
            <span key={i} className={`px-3 py-1 ${i === 3 ? 'text-white bg-white/10' : 'text-green-400/60'}`}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-20 relative z-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <p className="text-green-400 text-xs font-mono tracking-widest">← RECLAIM</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            You are the first generation.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-xl">
            The first humans to enter adulthood with a complete digital profile built entirely without consent. 
            UNHERIT exists because this is not acceptable.
          </p>
          <p className="text-white font-mono text-sm tracking-widest">THE RECLAMATION STARTS HERE.</p>
        </motion.div>

        {/* Score summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-white/10 p-6 bg-white/[0.02]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-1">Shadow Profile — Neutralised</p>
              <p className="text-white font-mono text-lg">MITCHELL, Sarah  — Bristol, UK</p>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <div className="flex flex-col items-center">
                <span className="text-red-400/50 text-3xl font-bold line-through">84</span>
                <span className="text-white/20 text-xs mt-1">Before</span>
              </div>
              <span className="text-white/20">→</span>
              <div className="flex flex-col items-center">
                <span className="text-green-400 text-3xl font-bold">8</span>
                <span className="text-white/20 text-xs mt-1">After</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-0 border-t border-white/5 pt-6">
            {[
              { value: '214', label: 'Data Brokers', sub: 'Selling profile' },
              { value: '1,847', label: 'Photos', sub: 'Without consent' },
              { value: '$893', label: 'Extracted', sub: 'From your data' },
              { value: `${findings.length}`, label: 'Signals', sub: 'Neutralised' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col gap-1 text-center ${i < 3 ? 'border-r border-white/5' : ''} px-4`}>
                <p className="text-white text-2xl font-bold font-mono">{stat.value}</p>
                <p className="text-white/40 text-xs font-mono">{stat.label}</p>
                <p className="text-white/20 text-xs font-mono">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 Steps */}
        <div className="flex flex-col gap-3">
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">The Reclamation Steps</p>

          {/* Step 1 - Expose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-white/10 p-6 bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/30 text-xs font-mono">01</span>
              <p className="text-white font-semibold">EXPOSE</p>
              <span className="text-green-400 text-xs font-mono ml-auto">✓ COMPLETE</span>
            </div>
            <p className="text-white/40 text-sm mb-4">
              Shadow profile revealed. {highCount} critical signals found across Health, Location, Financial, Educational, Behavioural, and Family categories.
            </p>

            {/* Digital Property Deed */}
            <div className="border border-white/10 p-4 font-mono text-xs text-white/40 leading-relaxed bg-black">
              <p className="text-white/60 mb-2">DIGITAL PROPERTY DEED</p>
              <p>{'─'.repeat(45)}</p>
              <p>ASSET:            YOUR CHILD'S IDENTITY</p>
              <p>DOCUMENTED FROM:  BIRTH — 2021</p>
              <p>FILED BY:         PARENT POSTS</p>
              <p>WITHOUT:          YOUR CHILD'S CONSENT</p>
              <p>CURRENT TITLE:    DATA BROKER SYNDICATE</p>
              <p>RIGHTFUL OWNER:   Sarah MITCHELL</p>
              <p>STATUS:           <span className="text-yellow-400">DISPUTED</span></p>
              <p>{'─'.repeat(45)}</p>
              <p className="text-white/30 mt-2">THIS PROPERTY WAS NEVER YOURS TO LOSE.</p>
              <p className="text-white/30">IT WAS TAKEN BEFORE SARAH KNEW IT EXISTED.</p>
            </div>
          </motion.div>

          {/* Step 2 - Dispute */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-white/10 p-6 bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/30 text-xs font-mono">02</span>
              <p className="text-white font-semibold">DISPUTE</p>
              <span className={`text-xs font-mono ml-auto ${disputed.length === brokers.length ? 'text-green-400' : 'text-yellow-400'}`}>
                {disputed.length}/{brokers.length} SENT
              </span>
            </div>
            <p className="text-white/40 text-sm mb-4">
              Pre-built GDPR Article 17 deletion requests. One click per broker. Refusal is a legal violation reportable to the ICO.
            </p>

            {/* Broker table */}
            <div className="border border-white/10 overflow-hidden mb-3">
              <div className="grid grid-cols-5 border-b border-white/10 bg-white/[0.03] px-4 py-2">
                {['BROKER', 'POINTS', 'LAST SOLD', 'VALUE', 'ACTION'].map((h, i) => (
                  <p key={i} className="text-white/20 text-xs font-mono">{h}</p>
                ))}
              </div>
              {brokers.map((broker, i) => (
                <div key={i} className={`grid grid-cols-5 px-4 py-3 items-center ${i < brokers.length - 1 ? 'border-b border-white/5' : ''} ${disputed.includes(broker.name) ? 'opacity-40' : ''}`}>
                  <p className="text-white/60 text-xs font-mono">{broker.name}</p>
                  <p className="text-white/40 text-xs font-mono">{broker.points.toLocaleString()}</p>
                  <p className={`text-xs font-mono ${broker.lastSold === 'Today' ? 'text-red-400' : 'text-white/40'}`}>{broker.lastSold}</p>
                  <p className="text-white/40 text-xs font-mono">{broker.value}</p>
                  <button
                    onClick={() => handleDispute(broker.name)}
                    disabled={disputed.includes(broker.name)}
                    className={`text-xs font-mono px-2 py-1 transition-all ${
                      disputed.includes(broker.name) 
                        ? 'text-green-400/50 bg-green-400/5' 
                        : 'text-red-400 border border-red-400/30 hover:bg-red-400/10'
                    }`}
                  >
                    {disputed.includes(broker.name) ? '✓ SENT' : 'DISPUTE'}
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-5 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
                <p className="text-white/30 text-xs font-mono col-span-3">+ 209 more brokers</p>
                <p className="text-white/30 text-xs font-mono">$0.52</p>
                <button
                  onClick={handleDisputeAll}
                  className="text-xs font-mono px-2 py-1 text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  DISPUTE ALL
                </button>
              </div>
            </div>
            <p className="text-white/20 text-xs font-mono">
              NEGOTIATE sends brokers a licensing agreement requiring payment for continued access.
            </p>
          </motion.div>

          {/* Step 3 - Opt Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-white/10 p-6 bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/30 text-xs font-mono">03</span>
              <p className="text-white font-semibold">OPT OUT</p>
              <span className={`text-xs font-mono ml-auto ${optedOut.length === platforms.length ? 'text-green-400' : 'text-yellow-400'}`}>
                {optedOut.length}/{platforms.length} COMPLETE
              </span>
            </div>
            <p className="text-white/40 text-sm mb-4">
              Direct links to privacy settings on every major platform. Stop future data collection now.
            </p>
            <div className="flex flex-col gap-2">
              {platforms.map((platform, i) => (
                <div key={i} className="flex items-center justify-between border border-white/5 px-4 py-3">
                  <p className={`text-sm font-mono ${optedOut.includes(platform.name) ? 'text-white/30 line-through' : 'text-white/60'}`}>
                    {platform.name}
                  </p>
                  <button
                    onClick={() => handleOptOut(platform.name)}
                    className={`text-xs font-mono px-3 py-1 transition-all ${
                      optedOut.includes(platform.name)
                        ? 'text-green-400/50'
                        : 'text-white/50 border border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {optedOut.includes(platform.name) ? '✓ DONE' : 'OPT OUT →'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 4 - Own */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-white/10 p-6 bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/30 text-xs font-mono">04</span>
              <p className="text-white font-semibold">OWN</p>
              {deedFiled && <span className="text-green-400 text-xs font-mono ml-auto">✓ FILED</span>}
            </div>
            <p className="text-white/40 text-sm mb-4">
              File your permanent consent deed. Hosted publicly at unherit.com/claim/Sarah-mitchell. 
              From this moment, any use of this data requires consent.
            </p>
            <button
              onClick={() => setDeedFiled(true)}
              className={`w-full py-3 text-sm font-mono font-semibold tracking-widest transition-all ${
                deedFiled 
                  ? 'bg-green-400/10 text-green-400 border border-green-400/20' 
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              {deedFiled ? '✓ DEED FILED — unherit.com/claim/Sarah-mitchell' : 'FILE YOUR DEED →'}
            </button>
          </motion.div>
        </div>

        {/* Two Generations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Two Generations. One Difference.</p>
          <div className="grid grid-cols-2 gap-px border border-white/10">
            <div className="p-6 flex flex-col gap-4 bg-red-400/5">
              <p className="text-red-400 text-xs font-mono">BORN 2021 — WITHOUT UNHERIT</p>
              {['No consent given', 'Profile built at birth', 'Shadow profile active', 'Judged at 18', 'DENIED. FLAGGED. JUDGED.'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-red-400/40 text-xs">✗</span>
                  <p className={`text-xs font-mono ${i === 4 ? 'text-red-400' : 'text-white/30'}`}>{item}</p>
                </div>
              ))}
            </div>
            <div className="p-6 flex flex-col gap-4 bg-green-400/5">
              <p className="text-green-400 text-xs font-mono">BORN 2021 — WITH UNHERIT</p>
              {['Profile poisoned', 'Data neutralised', 'Vault secured', 'Owns identity at 18', 'CLEAN. OWNED. FREE.'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-400/40 text-xs">✓</span>
                  <p className={`text-xs font-mono ${i === 4 ? 'text-green-400' : 'text-white/50'}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Collective Legal Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-white/10 p-6 font-mono text-xs text-white/40 bg-white/[0.02]"
        >
          <p className="text-white/60 mb-3">COLLECTIVE LEGAL FUND</p>
          <p>{'─'.repeat(45)}</p>
          <p>CURRENT MEMBERS:      47,000</p>
          <p>MONTHLY CONTRIBUTION: £1 EACH</p>
          <p>FUND TOTAL:           £47,000</p>
          <p>ACTIVE CASES:         3</p>
          <p>BROKERS TARGETED:     Acxiom, Oracle,</p>
          <p>{'                      '}LexisNexis</p>
          <p>{'─'.repeat(45)}</p>
          <p className="text-white/30 mt-3">YOUR CONTRIBUTION FUNDS THE FIGHT FOR EVERYONE.</p>
          <button className="mt-4 w-full border border-white/20 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all tracking-widest">
            JOIN THE RECLAMATION — 47,000 MEMBERS →
          </button>
        </motion.div>
        {/* Plan CTA */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-white/10 p-6 bg-white/[0.02] flex flex-col gap-4"
        >
        <div className="flex flex-col gap-1">
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Next Step</p>
            <h3 className="text-white text-lg font-bold">Your data is generating money. You should see it.</h3>
            <p className="text-white/40 text-sm">214 brokers are actively selling Sarah's profile. View your plan and start earning dividends from your own data.</p>
        </div>
        <button
            onClick={onComplete}
            className="w-full bg-white text-black py-4 text-sm font-mono font-semibold tracking-widest hover:bg-white/90 transition-all"
        >
            VIEW YOUR PLAN & DATA DIVIDENDS →
        </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-8 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-white text-sm font-mono tracking-widest">UNHERIT © 2036</p>
          <p className="text-white/20 text-xs font-mono">For the generation that never got to say no.</p>
          <div className="flex gap-6 mt-2">
            {['Legal Resources', 'Data Broker List', 'Contact'].map((item, i) => (
              <p key={i} className="text-white/20 text-xs font-mono hover:text-white/40 cursor-pointer transition-colors">{item}</p>
            ))}
          </div>
          <p className="text-white/10 text-xs font-mono mt-4">
            No data stored. No account created. This session is closed.
          </p>
        </motion.div>

      </div>
    </main>
  )
}