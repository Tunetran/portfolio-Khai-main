'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Target, MapPin, Flame, Award, ChevronRight, Star } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';

export default function ModernAboutSection() {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const { about, stats } = portfolioData;

  const iconMap: Record<string, any> = {
    '🎓': GraduationCap,
    '📚': GraduationCap,
    '💡': Target,
    '🎯': Target,
    '🔥': Flame,
    '📍': MapPin,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50/50 to-purple-50 dark:from-slate-900 dark:via-blue-950/50 dark:to-purple-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                {about.title}
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {about.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content Side */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Main Description */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  Câu chuyện của tôi
                </h3>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                  {about.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.about.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights Side */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-3" />
                Điểm nổi bật
              </h3>
              
              <div className="space-y-4">
                {about.highlights.map((highlight, index) => {
                  const IconComponent = iconMap[highlight.icon] || Target;
                  const isActive = activeHighlight === index;
                  
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      onHoverStart={() => setActiveHighlight(index)}
                      className={`group cursor-pointer transition-all duration-300 ${
                        isActive ? 'scale-105' : ''
                      }`}
                    >
                      <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ${
                        isActive 
                          ? 'shadow-2xl border-blue-300/50 dark:border-blue-600/50 bg-gradient-to-r from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-950/50' 
                          : 'hover:shadow-xl'
                      }`}>
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-slate-900 dark:text-white">
                                {highlight.label}
                              </h4>
                              <ChevronRight className={`w-5 h-5 text-slate-400 transition-all duration-300 ${
                                isActive ? 'transform rotate-90 text-blue-500' : 'group-hover:text-slate-600 dark:group-hover:text-slate-300'
                              }`} />
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                              {highlight.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Achievement Summary */}
              <motion.div
                variants={cardVariants}
                className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50"
              >
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-yellow-500 mr-3" />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Thành tựu nổi bật
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {achievement.number}
                        <span className="text-sm text-slate-500">{achievement.suffix}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {achievement.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
