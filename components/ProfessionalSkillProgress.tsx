'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Star, Award, TrendingUp, Target, Coffee, Shield, Code, Cloud, Wrench } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  icon: string
  description?: string
}

interface SkillProgressProps {
  skills: Skill[]
}

const categoryIcons = {
  'Programming': Coffee,
  'Cybersecurity': Shield,
  'Cloud Platforms': Cloud,
  'System Administration': Code,
  'Security Tools': Wrench
}

function getSkillLevel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  if (level >= 60) return 'Intermediate'
  return 'Basic'
}

export default function ProfessionalSkillProgress({ skills }: SkillProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div ref={ref} className="space-y-12">
      {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
        const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 border border-corporate-navy-200/50 dark:border-corporate-navy-700/50"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-professional-blue to-professional-navy rounded-xl flex items-center justify-center text-white shadow-lg">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white">
                  {category}
                </h3>
                <p className="text-corporate-navy-600 dark:text-corporate-navy-400">
                  {categorySkills.length} kỹ năng • {categorySkills.filter(s => s.level >= 80).length} kỹ năng thành thạo
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-white/50 dark:bg-corporate-navy-900/50 rounded-xl p-6 border border-corporate-navy-200/30 dark:border-corporate-navy-700/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-professional-blue/30">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <div>
                          <h4 className="font-semibold text-corporate-navy-900 dark:text-white text-lg">
                            {skill.name}
                          </h4>
                          {skill.description && (
                            <p className="text-sm text-corporate-navy-600 dark:text-corporate-navy-400 mt-1">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-professional-blue">
                          {skill.level}%
                        </div>
                        <div className="text-xs font-medium text-corporate-navy-600 dark:text-corporate-navy-400">
                          {getSkillLevel(skill.level)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-4">
                      <div className="w-full bg-corporate-navy-200 dark:bg-corporate-navy-700 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, 
                            duration: 1.2,
                            ease: "easeOut"
                          }}
                          className={`h-4 rounded-full relative overflow-hidden ${
                            skill.level >= 90 ? 'bg-gradient-to-r from-professional-green to-emerald-500' :
                            skill.level >= 80 ? 'bg-gradient-to-r from-professional-blue to-blue-500' :
                            skill.level >= 70 ? 'bg-gradient-to-r from-professional-purple to-purple-500' :
                            skill.level >= 60 ? 'bg-gradient-to-r from-professional-orange to-orange-500' :
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                        >
                          {/* Animated shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                      
                      {/* Skill Level Indicator */}
                      {skill.level >= 90 && (
                        <div className="absolute -top-10 right-0 flex items-center space-x-1">
                          <Star className="w-4 h-4 text-professional-green fill-current" />
                          <span className="text-xs font-bold text-professional-green">Chuyên môn chính</span>
                        </div>
                      )}
                    </div>

                    {/* Special Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {skill.level >= 85 && (
                          <div className="flex items-center space-x-1 bg-professional-green/10 text-professional-green px-2 py-1 rounded-full text-xs font-medium">
                            <Award className="w-3 h-3" />
                            <span>Thành thạo</span>
                          </div>
                        )}
                        {skill.name === 'Java Programming' && (
                          <div className="flex items-center space-x-1 bg-professional-blue/10 text-professional-blue px-2 py-1 rounded-full text-xs font-medium">
                            <Target className="w-3 h-3" />
                            <span>Ngôn ngữ chính</span>
                          </div>
                        )}
                        {skill.level >= 75 && ['Kubernetes', 'Docker', 'AWS', 'Linux Administration'].includes(skill.name) && (
                          <div className="flex items-center space-x-1 bg-professional-purple/10 text-professional-purple px-2 py-1 rounded-full text-xs font-medium">
                            <Cloud className="w-3 h-3" />
                            <span>Production Ready</span>
                          </div>
                        )}
                      </div>
                      
                      {skill.level >= 75 && (
                        <div className="flex items-center text-professional-green text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          <span>Kinh nghiệm thực tế</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
