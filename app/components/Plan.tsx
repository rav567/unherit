'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const plans = [
  {
    name: 'FREE',
    price: 'Free',
    current: true,
    recommended: false,
    features: [
      { text: 'Shadow profile scan', included: true },
      { text: 'KYC verification', included: true },
      { text: 'Basic vault (5 items)', included: true },
      { text: '5 deletion requests', included: true },
      { text: 'Data dividend tracking', included: false },
      { text: 'Full access control', included: false },
      { text: 'Legal evidence pack', included: false },
      { text: 'Broker negotiation', included: false },
    ]
  },
  {
    name: 'SOVEREIGN',
    price: '£9',
    current: false,
    recommended: true,
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Unlimited deletions', included: true },
      { text: 'Full access control', included: true },
      { text: 'Data dividend tracking', included: true },
      { text: 'Legal evidence pack', included: true },
      { text: 'Real time broker alerts', included: true },
      { text: 'Priority disputes', included: true },
      { text: 'Annual data audit', included: true },
    ]
  },
  {
    name: 'COLLECTIVE',
    price: '£19',
    current: false,
    recommended: false,
    features: [
      { text: 'Everything in Sovereign', included: true },
      { text: 'Family vault — 4 members', included: true },
      { text: 'Children\'s protection', included: true },
      { text: 'Broker negotiation', included: true },
      { text: 'Legal consultation 1hr/year', included: true },
      { text: 'Dividend maximisation', included: true },
      { text: 'Political advocacy updates', included: true },
    ]
  },
]

const brokers = [
  { name: 'Acxiom', points: 2847, lastSold: '3 days ago', value: '$0.12' },
  { name: 'Oracle Data Cloud', points: 1923, lastSold: '1 week ago', value: '$0.09' },
  { name: 'Experian', points: 1456, lastSold: '2 days ago', value: '$0.11' },
  { name: 'LexisNexis', points: 987, lastSold: 'Today', value: '$0.08' },
  { name: 'CoreLogic', points: 743, lastSold: '5 days ago', value: '$0.06' },
]

export default function Plan() {
  const [disputed, setDisputed] = useState<string[]>([])
  const [negotiated, setNegotiated] = useState<string[]>([])
  const [selectedPlan, setSelectedPlan] = useState('FREE')

  return (
    <main className="min-h-screen bg-transparent text-white relative overflow-hidden">
      
      <div className="fixed inset-0 pulse-bg" />
      <div className="fixed inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-white text-sm font-mono tracking-widest">UNHERIT</span>
          <span className="text-white/20 text-xs font-mono">|</span>
          <span className="text-white/20 text-xs font-mono">EST. 2036</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-white/30">
          <span className="text-white/20">KYC VERIFIED</span>
          <span className="text-white/10">|</span>
          <span className="text-white/20">DATA SOVEREIGN</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">UNHERIT — YOUR PLAN & DATA DIVIDENDS</p>
          <h1 className="text-white text-4xl font-bold">Your data is generating money.<br/>You should see it.</h1>
          <p className="text-white/40 text-base leading-relaxed max-w-xl">
            Every time a broker accesses your profile, they profit. UNHERIT tracks every access and calculates what you are owed.
          </p>
        </motion.div>

        {/* Dividend stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 border border-white/10"
        >
          {[
            { value: '$893', label: 'TOTAL EXTRACTED', sub: 'LIFETIME' },
            { value: '$0', label: 'YOUR SHARE', sub: 'YOU RECEIVED' },
            { value: '214', label: 'BROKERS', sub: 'ACTIVELY SELLING' },
            { value: '£0', label: 'PENDING CLAIMS', sub: 'UNCLAIMED' },
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-8 gap-1 text-center ${i < 3 ? 'border-r border-white/10' : ''} ${i === 1 ? 'bg-red-400/5' : ''}`}>
              <p className={`text-3xl font-bold font-mono ${i === 1 ? 'text-red-400' : 'text-white'}`}>{stat.value}</p>
              <p className="text-white/30 text-xs font-mono">{stat.label}</p>
              <p className="text-white/20 text-xs font-mono">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Before / After */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-px"
        >
          {/* Before */}
          <div className="border border-white/10 p-6 bg-red-400/5 flex flex-col gap-4">
            <p className="text-red-400 text-xs font-mono tracking-widest">HOW IT WORKED BEFORE</p>
            <div className="flex flex-col gap-2 font-mono text-xs">
              {[
                ['BROKER BUYS PROFILE', '$0.12'],
                ['BROKER SELLS TO CO.', '$2.40'],
                ['BROKER PROFIT', '$2.28'],
                ['YOUR SHARE', '$0.00'],
              ].map(([label, value], i) => (
                <div key={i} className={`flex justify-between py-2 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-white/40">{label}</span>
                  <span className={i === 3 ? 'text-red-400' : 'text-white/60'}>{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 font-mono text-xs text-white/20">
              <p>HAPPENED 4,847 TIMES</p>
              <p>TOTAL YOU RECEIVED: $0</p>
              <p>TOTAL THEY MADE: $893</p>
            </div>
            <p className="text-red-400/60 text-xs font-mono">You were the product. You saw none of the revenue.</p>
          </div>

          {/* After */}
          <div className="border border-green-400/20 p-6 bg-green-400/5 flex flex-col gap-4">
            <p className="text-green-400 text-xs font-mono tracking-widest">HOW IT WORKS WITH UNHERIT</p>
            <div className="flex flex-col gap-2 font-mono text-xs">
              {[
                ['EMPLOYER REQUESTS ACCESS', ''],
                ['THROUGH UNHERIT', ''],
                ['YOU APPROVE 30 DAY ACCESS', '$2.40'],
                ['UNHERIT FEE', '$0.48'],
                ['YOUR DIVIDEND', '$1.92'],
              ].map(([label, value], i) => (
                <div key={i} className={`flex justify-between py-2 ${i < 4 ? 'border-b border-white/5' : ''}`}>
                  <span className={i === 4 ? 'text-green-400' : 'text-white/40'}>{label}</span>
                  <span className={i === 4 ? 'text-green-400 font-bold' : 'text-white/60'}>{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-green-400/10 pt-4 font-mono text-xs text-green-400/40">
              <p>EVERY ACCESS. EVERY TIME.</p>
              <p>YOUR DATA. YOUR REVENUE.</p>
            </div>
            <p className="text-green-400/60 text-xs font-mono">You are now the shareholder.</p>
          </div>
        </motion.div>

        {/* Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Choose Your Plan</p>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`border flex flex-col gap-4 p-5 relative transition-all ${
                  plan.recommended 
                    ? 'border-white/40 bg-white/[0.04]' 
                    : plan.current 
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-white/10 bg-white/[0.01]'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-white" />
                )}
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-black bg-white text-xs font-mono px-2 py-0.5 whitespace-nowrap">
                    RECOMMENDED
                  </span>
                )}

                <div className="flex flex-col gap-1">
                  <p className="text-white/40 text-xs font-mono tracking-widest">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-white text-2xl font-bold font-mono">{plan.price}</p>
                    {plan.price !== 'Free' && <p className="text-white/30 text-xs font-mono">/ MONTH</p>}
                  </div>
                  {plan.current && (
                    <span className="text-green-400 text-xs font-mono">CURRENT PLAN</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className={`text-xs flex-shrink-0 mt-0.5 ${feature.included ? 'text-green-400' : 'text-white/20'}`}>
                        {feature.included ? '✓' : '✗'}
                      </span>
                      <p className={`text-xs font-mono leading-relaxed ${feature.included ? 'text-white/60' : 'text-white/20'}`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                {!plan.current && (
                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-2.5 text-xs font-mono font-semibold tracking-widest transition-all mt-auto ${
                      selectedPlan === plan.name
                        ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                        : plan.recommended
                          ? 'bg-white text-black hover:bg-white/90'
                          : 'border border-white/20 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {selectedPlan === plan.name ? '✓ SELECTED' : 'UPGRADE →'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Broker table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Brokers Currently Holding Your Data</p>
          <div className="border border-white/10 overflow-hidden">
            <div className="grid grid-cols-5 border-b border-white/10 bg-white/[0.03] px-4 py-2">
              {['BROKER', 'POINTS', 'LAST SOLD', 'VALUE', 'ACTION'].map((h, i) => (
                <p key={i} className="text-white/20 text-xs font-mono">{h}</p>
              ))}
            </div>
            {brokers.map((broker, i) => (
              <div key={i} className={`grid grid-cols-5 px-4 py-3 items-center ${i < brokers.length - 1 ? 'border-b border-white/5' : ''}`}>
                <p className="text-white/60 text-xs font-mono">{broker.name}</p>
                <p className="text-white/40 text-xs font-mono">{broker.points.toLocaleString()}</p>
                <p className={`text-xs font-mono ${broker.lastSold === 'Today' ? 'text-red-400' : 'text-white/40'}`}>{broker.lastSold}</p>
                <p className="text-white/40 text-xs font-mono">{broker.value}</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setDisputed(prev => [...prev, broker.name])}
                    className={`text-xs font-mono px-2 py-1 transition-all ${
                      disputed.includes(broker.name)
                        ? 'text-green-400/50'
                        : 'text-red-400/70 border border-red-400/20 hover:bg-red-400/10'
                    }`}
                  >
                    {disputed.includes(broker.name) ? '✓' : 'DISPUTE'}
                  </button>
                  <button
                    onClick={() => setNegotiated(prev => [...prev, broker.name])}
                    className={`text-xs font-mono px-2 py-1 transition-all ${
                      negotiated.includes(broker.name)
                        ? 'text-green-400/50'
                        : 'text-yellow-400/70 border border-yellow-400/20 hover:bg-yellow-400/10'
                    }`}
                  >
                    {negotiated.includes(broker.name) ? '✓' : 'NEGOTIATE'}
                  </button>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-5 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
              <p className="text-white/20 text-xs font-mono col-span-2">+ 209 more brokers</p>
              <p className="text-white/20 text-xs font-mono">Various</p>
              <p className="text-white/20 text-xs font-mono">$0.52</p>
              <button
                onClick={() => setDisputed(brokers.map(b => b.name))}
                className="text-xs font-mono px-2 py-1 text-white border border-white/20 hover:bg-white/10"
              >
                DISPUTE ALL
              </button>
            </div>
          </div>
          <p className="text-white/20 text-xs font-mono leading-relaxed">
            NEGOTIATE sends brokers a licensing agreement requiring payment for continued access. 
            Refusal and continued selling is a legal violation reportable to the ICO.
          </p>
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
          <p>BROKERS TARGETED:     Acxiom, Oracle, LexisNexis</p>
          <p>{'─'.repeat(45)}</p>
          <p className="text-white/30 mt-3">YOUR CONTRIBUTION FUNDS THE FIGHT FOR EVERYONE.</p>
          <p className="text-white/20 mt-4 leading-relaxed">
            Data brokers built a $200 billion industry on people who never knew they were the product.
            UNHERIT makes you the shareholder of your own life.
          </p>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-white text-sm font-mono tracking-widest">UNHERIT © 2036</p>
          <p className="text-white/20 text-xs font-mono">For the generation that never got to say no.</p>
        </div>

      </div>
    </main>
  )
}