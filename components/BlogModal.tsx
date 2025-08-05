'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Tag, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
}

interface BlogModalProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

export default function BlogModal({ blog, isOpen, onClose }: BlogModalProps) {
  if (!blog) return null

  const formatContent = (content: string) => {
    // Chuyển đổi \n thành <br> và tạo paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim())
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {paragraph.replace(/\n/g, ' ')}
      </p>
    ))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {blog.featured && (
                  <Badge className="bg-blue-500 text-white">
                    Nổi bật
                  </Badge>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.publishedAt).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-full p-6">
              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-xl mb-8">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 italic">
                {blog.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {formatContent(blog.content)}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Chia sẻ bài viết
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Nếu bạn thấy bài viết hữu ích, hãy chia sẻ với bạn bè nhé!
                    </p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
