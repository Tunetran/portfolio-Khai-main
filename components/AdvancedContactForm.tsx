'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function AdvancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập chủ đề'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setStatus('loading')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Show success message longer
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi email')
      }
    } catch (error: any) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Send className="w-5 h-5" />
    }
  }

  const getButtonText = () => {
    switch (status) {
      case 'loading':
        return 'Đang gửi email...'
      case 'success':
        return '✅ Đã gửi thành công!'
      case 'error':
        return '❌ Gửi thất bại, thử lại'
      default:
        return 'Gửi tin nhắn ngay'
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Liên hệ với tôi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Họ tên *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Nhập họ tên của bạn"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="Nhập email của bạn"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chủ đề *
            </label>
            <Input
              type="text"
              value={formData.subject}
              onChange={handleChange('subject')}
              className={errors.subject ? 'border-red-500' : ''}
              placeholder="Nhập chủ đề tin nhắn"
            />
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.subject}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tin nhắn *
            </label>
            <Textarea
              value={formData.message}
              onChange={handleChange('message')}
              className={errors.message ? 'border-red-500' : ''}
              placeholder="Nhập nội dung tin nhắn của bạn..."
              rows={5}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.message.length}/500 ký tự
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                status === 'success' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : status === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              <span className="flex items-center justify-center space-x-2">
                {getStatusIcon()}
                <span>{getButtonText()}</span>
              </span>
            </Button>
          </motion.div>

          {/* Status Messages */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium">Email đã được gửi thành công!</p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Tôi sẽ phản hồi trong vòng 24 giờ qua email: <strong>trankhair2004@gmail.com</strong>
                </p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">Gửi email thất bại!</p>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Vui lòng thử lại hoặc liên hệ trực tiếp: 
                  <a href="mailto:trankhair2004@gmail.com" className="underline ml-1 font-medium">
                    trankhair2004@gmail.com
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 mb-2">
              <Mail className="w-5 h-5" />
              <h4 className="font-medium">Liên hệ trực tiếp</h4>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Email: <a href="mailto:trankhair2004@gmail.com" className="underline font-medium">trankhair2004@gmail.com</a><br/>
              Thời gian phản hồi: Trong vòng 24 giờ<br/>
              Chuyên ngành: An Ninh Mạng & Cybersecurity
            </p>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
