'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Target, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SkillProgress from './SkillProgress'
import portfolioData from '@/lib/portfolioData'

// Map icon names to components
const iconMap: Record<string, any> = {
  'award': Award,
  'book': BookOpen,
  'target': Target,
  'users': Users,
}

const aboutStats = portfolioData.stats.about.map(stat => ({
  icon: iconMap[stat.icon],
  label: stat.label,
  value: stat.value,
  color: stat.color
}));

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

export default function AboutSection() {
  const { profile, about } = portfolioData

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {about.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {about.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-48 h-48 rounded-full object-cover mx-auto lg:mx-0 shadow-2xl border-4 border-blue-200 dark:border-blue-800"
              />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                {profile.title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.description}
              </p>
              
              <div className="space-y-2">
                {about.highlights.map((highlight, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{highlight.icon} {highlight.label}:</span> {highlight.value}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {aboutStats.map((stat, index) => (
              <motion.div key={stat.label} variants={item}>
                <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-0">
                  <CardContent className="space-y-4">
                    <div className={`inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <motion.h3
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                      >
                        {stat.value}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Kỹ năng chuyên môn
          </h3>
          <SkillProgress skills={portfolioData.profile.skills} />
        </motion.div>

        {/* Personal Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <blockquote className="text-xl italic text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            "Trong thế giới số hóa ngày nay, bảo mật không chỉ là một tùy chọn mà là một nhu cầu thiết yếu. 
            Tôi cam kết không ngừng học hỏi và phát triển để bảo vệ thông tin và dữ liệu quý giá."
          </blockquote>
          <footer className="mt-4 text-gray-500 dark:text-gray-400">
            — {profile.name}
          </footer>
        </motion.div>
      </div>
    </section>
  )
}
