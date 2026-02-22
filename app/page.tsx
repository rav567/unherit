'use client'

import { useState } from 'react'
import Landing from './components/Landing'
import Connect from './components/Connect'
import Scanning from './components/Scanning'
import Profile from './components/Profile'
import Protect from './components/Protect'
import Download from './components/Download'
import Plan from './components/Plan'

type Finding = {
  finding: string
  category: string
  severity: string
  dataPoint: string
  postId: number
  date: string
}

export default function Home() {
  const [screen, setScreen] = useState('landing')
  const [findings, setFindings] = useState<Finding[]>([])

  return (
    <>
      {screen === 'landing' && <Landing onStart={() => setScreen('connect')} />}
      {screen === 'connect' && <Connect onConnect={() => setScreen('scanning')} />}
      {screen === 'scanning' && (
        <Scanning onComplete={(f) => {
          setFindings(f)
          setScreen('profile')
        }} />
      )}
      {screen === 'profile' && (
        <Profile findings={findings} onProtect={() => setScreen('protect')} />
      )}
      {screen === 'protect' && (
        <Protect findings={findings} onComplete={() => setScreen('download')} />
      )}
      {screen === 'download' && (
      <Download findings={findings} onComplete={() => setScreen('plan')} />
    )}
    {screen === 'plan' && <Plan />}
    </>
  )
}