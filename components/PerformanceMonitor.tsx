'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null
  })
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
        }
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }))
        }
        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
        }
      }
    })

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })

    // Keyboard shortcut to toggle metrics (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMetrics(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const getScoreColor = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 }
    }

    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'text-green-500'
    if (value <= threshold.poor) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <AnimatePresence>
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-[200] bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-xs"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">Performance Metrics</h4>
            <button
              onClick={() => setShowMetrics(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={metrics.fcp ? getScoreColor('fcp', metrics.fcp) : 'text-gray-400'}>
                {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={metrics.lcp ? getScoreColor('lcp', metrics.lcp) : 'text-gray-400'}>
                {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span className={metrics.fid ? getScoreColor('fid', metrics.fid) : 'text-gray-400'}>
                {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={metrics.cls ? getScoreColor('cls', metrics.cls) : 'text-gray-400'}>
                {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
              </span>
            </div>
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Press Ctrl+Shift+P to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
