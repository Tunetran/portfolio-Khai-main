'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface Skill {
  name: string
  level: number
  category: string
  icon?: string
}

interface SkillProgressProps {
  skills: Skill[]
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
                    {skill.icon && <span className="mr-2">{skill.icon}</span>}
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

// Default skills data
export const defaultSkills: Skill[] = [
  { name: 'Network Security', level: 90, category: 'Cybersecurity', icon: '🔒' },
  { name: 'Penetration Testing', level: 85, category: 'Cybersecurity', icon: '🛡️' },
  { name: 'Ethical Hacking', level: 80, category: 'Cybersecurity', icon: '🔍' },
  { name: 'Incident Response', level: 75, category: 'Cybersecurity', icon: '🚨' },
  
  { name: 'Python', level: 88, category: 'Programming', icon: '🐍' },
  { name: 'JavaScript/TypeScript', level: 85, category: 'Programming', icon: '⚡' },
  { name: 'React/Next.js', level: 82, category: 'Programming', icon: '⚛️' },
  { name: 'Node.js', level: 78, category: 'Programming', icon: '🟢' },
  
  { name: 'Linux Administration', level: 85, category: 'System Administration', icon: '🐧' },
  { name: 'Docker & Kubernetes', level: 75, category: 'System Administration', icon: '🐳' },
  { name: 'AWS/Cloud Security', level: 70, category: 'System Administration', icon: '☁️' },
  { name: 'Network Configuration', level: 88, category: 'System Administration', icon: '🌐' },
  
  { name: 'Burp Suite', level: 90, category: 'Security Tools', icon: '🔧' },
  { name: 'Metasploit', level: 85, category: 'Security Tools', icon: '💀' },
  { name: 'Nmap', level: 92, category: 'Security Tools', icon: '🗺️' },
  { name: 'Wireshark', level: 88, category: 'Security Tools', icon: '🦈' },
]
