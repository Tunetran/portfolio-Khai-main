'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BlogModal from './BlogModal'

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

interface BlogSectionProps {
  blogs: BlogPost[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const featuredBlogs = blogs.filter(blog => blog.featured)
  const otherBlogs = blogs.filter(blog => !blog.featured)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openBlogModal = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
  }

  const closeBlogModal = () => {
    setIsModalOpen(false)
    setSelectedBlog(null)
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Kiến thức
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chia sẻ kiến thức về Cybersecurity, Network Security và các xu hướng công nghệ mới
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredBlogs.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Bài viết nổi bật</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <motion.div key={blog.id} variants={item}>
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-blue-500 text-white">
                          Nổi bật
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(blog.publishedAt).toLocaleDateString('vi-VN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {blog.readTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => openBlogModal(blog)}
                      >
                        Đọc thêm
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other Posts */}
        {otherBlogs.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Bài viết khác</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBlogs.map((blog) => (
                <motion.div key={blog.id} variants={item}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(blog.publishedAt).toLocaleDateString('vi-VN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{blog.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => openBlogModal(blog)}
                      >
                        Đọc thêm
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Xem tất cả bài viết
          </Button>
        </motion.div>
      </div>

      {/* Blog Modal */}
      <BlogModal 
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={closeBlogModal}
      />
    </section>
  )
}
