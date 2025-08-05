"use client";

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Target, TrendingUp, CheckCircle } from 'lucide-react';
import portfolio from '../lib/portfolioData';

const typeIcons = {
  education: GraduationCap,
  project: Award,
  learning: BookOpen,
  work: Target
};

const typeColors = {
  education: 'from-professional-blue to-blue-500',
  project: 'from-professional-green to-emerald-500',
  learning: 'from-professional-purple to-purple-500',
  work: 'from-professional-orange to-orange-500'
};

export default function ProfessionalExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-gradient-to-br from-white via-corporate-blue-50/30 to-corporate-navy-50/50 dark:from-corporate-navy-900 dark:via-corporate-navy-800/50 dark:to-corporate-blue-950/30 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-professional-blue/5 to-professional-navy/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-professional-green/5 to-professional-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-professional-blue/10 text-professional-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Kinh nghiệm & Học vấn</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-corporate-navy-900 via-professional-blue to-corporate-navy-800 dark:from-white dark:via-corporate-blue-200 dark:to-white bg-clip-text text-transparent">
              Hành Trình Phát Triển
            </span>
          </h2>
          <p className="text-xl text-corporate-navy-600 dark:text-corporate-navy-400 max-w-4xl mx-auto leading-relaxed">
            Từ sinh viên đam mê đến chuyên gia tương lai - Hành trình học tập và thực hành trong lĩnh vực Cybersecurity & Java Development
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-professional-blue via-professional-navy to-professional-green hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-20">
            {portfolio.experiences.map((exp, index) => {
              const key = `${exp.title}-${exp.organization}`;
              const isEven = index % 2 === 0;
              const IconComponent = typeIcons[exp.type as keyof typeof typeIcons] || Award;
              const colorGradient = typeColors[exp.type as keyof typeof typeColors] || typeColors.project;
              
              return (
                <div key={key} className="relative">
                  {/* Enhanced Timeline dot */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-16 h-16 hidden lg:flex items-center justify-center z-20">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorGradient} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`lg:flex lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className={`lg:w-1/2 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                      <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 lg:p-10 border border-corporate-navy-200/50 dark:border-corporate-navy-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        {/* Experience Header */}
                        <div className="flex items-start space-x-4 mb-6">
                          <div className={`w-14 h-14 lg:hidden bg-gradient-to-br ${colorGradient} rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                            <IconComponent className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl lg:text-2xl font-bold text-corporate-navy-900 dark:text-white">
                                {exp.title}
                              </h3>
                              <span className={`bg-gradient-to-r ${colorGradient} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                {exp.type === 'education' ? 'Học vấn' : 
                                 exp.type === 'project' ? 'Dự án' :
                                 exp.type === 'learning' ? 'Tự học' : 'Kinh nghiệm'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-corporate-navy-600 dark:text-corporate-navy-400 text-sm mb-4">
                              <div className="flex items-center space-x-1">
                                <Target className="w-4 h-4" />
                                <span className="font-medium">{exp.organization}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{exp.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium text-professional-blue">{exp.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed mb-6 text-lg">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-corporate-navy-900 dark:text-white mb-4 flex items-center">
                              <Award className="w-5 h-5 mr-2 text-professional-green" />
                              Thành tựu nổi bật
                            </h4>
                            <div className="space-y-3">
                              {exp.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-start space-x-3">
                                  <CheckCircle className="w-5 h-5 text-professional-green mt-0.5 flex-shrink-0" />
                                  <span className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                                    {achievement}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-corporate-navy-700 dark:text-corporate-navy-300 mb-3">
                              Công nghệ sử dụng
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="bg-corporate-navy-100 dark:bg-corporate-navy-700/50 text-corporate-navy-700 dark:text-corporate-navy-300 text-sm font-medium px-3 py-1 rounded-lg border border-corporate-navy-200 dark:border-corporate-navy-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Special Recognition */}
                        {exp.achievements && exp.achievements.some(a => a.includes('điểm tối đa')) && (
                          <div className="mt-6 p-4 bg-professional-green/5 border border-professional-green/20 rounded-xl">
                            <div className="flex items-center text-professional-green">
                              <Award className="w-5 h-5 mr-2" />
                              <span className="font-semibold text-sm">Đạt điểm tối đa - Xuất sắc</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Spacer for layout */}
                    <div className="hidden lg:block lg:w-1/2"></div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="professional-card bg-gradient-to-r from-professional-blue to-professional-navy rounded-2xl p-8 lg:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Tiếp tục hành trình phát triển
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Luôn học hỏi, không ngừng cải thiện và sẵn sàng đóng góp vào dự án của bạn
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 bg-white text-professional-blue font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                <span>Xem dự án</span>
                <TrendingUp className="w-5 h-5 ml-2" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span>Liên hệ ngay</span>
                <Target className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
