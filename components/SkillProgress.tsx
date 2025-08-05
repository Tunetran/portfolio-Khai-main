'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Star, Award, TrendingUp, Target } from 'lucide-react'

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
  'Programming': '💻',
  'Cybersecurity': '🛡️',
  'Cloud Platforms': '☁️',
  'System Administration': '⚙️',
  'Security Tools': '🔧'
}

const levelLabels = {
  90: 'Expert',
  80: 'Advanced', 
  70: 'Proficient',
  60: 'Intermediate',
  50: 'Basic'
}

function getSkillLevel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  if (level >= 60) return 'Intermediate'
  return 'Basic'
}

export default function SkillProgress({ skills }: SkillProgressProps) {
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
    <div ref={ref} className="space-y-8">
      {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorySkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                    transition={{ 
                      delay: (categoryIndex * 0.2) + (index * 0.1) + 0.3,
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
