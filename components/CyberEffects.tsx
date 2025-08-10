'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CyberEffects() {
  const scanLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simplified scan lines
    const createScanLines = () => {
      const scanLine = scanLineRef.current
      if (!scanLine) return

      const moveDown = () => {
        scanLine.style.top = '-100%'
        scanLine.style.opacity = '0.4'
        
        const animation = scanLine.animate([
          { transform: 'translateY(0)', opacity: '0.4' },
          { transform: 'translateY(100vh)', opacity: '0' }
        ], {
          duration: 4000,
          easing: 'linear'
        })

        animation.onfinish = () => {
          setTimeout(moveDown, Math.random() * 8000 + 2000)
        }
      }

      moveDown()
    }

    createScanLines()
  }, [])

  return (
    <>
      {/* Simplified Scan Lines */}
      <div 
        ref={scanLineRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(transparent 98%, rgba(0, 255, 255, 0.02) 100%)',
          backgroundSize: '100% 6px',
          top: '-100%'
        }}
      />

      {/* Simplified Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Simplified Corner Elements */}
      <motion.div
        className="fixed top-4 left-4 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="text-cyan-400 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed top-4 right-4 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="text-emerald-400 font-mono text-xs text-right">
          <div className="flex items-center justify-end space-x-2">
            <span>SECURE</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
