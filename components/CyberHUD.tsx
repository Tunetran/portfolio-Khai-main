'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CyberHUD() {
  const [uptime, setUptime] = useState('00:00:00')

  useEffect(() => {
    const startTime = Date.now()

    const interval = setInterval(() => {
      const now = Date.now()
      const uptimeMs = now - startTime
      const hours = Math.floor(uptimeMs / (1000 * 60 * 60))
      const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((uptimeMs % (1000 * 60)) / 1000)

      setUptime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed bottom-32 right-6 z-30 pointer-events-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-3 matrix-text">
        <div className="flex items-center space-x-4 text-xs">
          <div className="text-center">
            <div className="text-cyan-400">UPTIME</div>
            <div className="text-white font-mono">{uptime}</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400">STATUS</div>
            <div className="text-white font-mono">ONLINE</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400">MODE</div>
            <div className="text-white font-mono">SECURE</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
