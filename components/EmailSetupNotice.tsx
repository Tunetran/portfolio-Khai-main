'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Settings, Mail, Key } from 'lucide-react'

export default function EmailSetupNotice() {
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Check if this is development environment
    if (process.env.NODE_ENV === 'development') {
      // Check if email is configured
      const emailConfigured = process.env.NEXT_PUBLIC_EMAIL_CONFIGURED === 'true'
      if (!emailConfigured) {
        setShowNotice(true)
      }
    }
  }, [])

  if (!showNotice) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-4 right-4 z-[60] max-w-lg mx-auto"
      >
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                📧 Cài đặt Email cần được cấu hình
              </h4>
              <div className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <p>Để form liên hệ hoạt động, bạn cần:</p>
                <div className="ml-2 space-y-1">
                  <p>• Tạo file <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">.env.local</code></p>
                  <p>• Thêm <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">GMAIL_USER</code> và <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">GMAIL_APP_PASSWORD</code></p>
                  <p>• Xem file <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">.env.example</code> để biết chi tiết</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
              <Settings className="w-3 h-3" />
              <span>Dev Mode</span>
            </div>
            <span className="text-amber-500">•</span>
            <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
              <Mail className="w-3 h-3" />
              <span>trankhair2004@gmail.com</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
