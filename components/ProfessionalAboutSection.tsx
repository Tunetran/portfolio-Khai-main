'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Target, MapPin, Coffee, Award, ChevronRight, Star, Shield, TrendingUp, Users, BookOpen } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';
import ProfessionalSkillProgress from './ProfessionalSkillProgress';

export default function ProfessionalAboutSection() {
  const [activeTab, setActiveTab] = useState('story');
  const { about, stats, profile } = portfolioData;

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

  const tabs = [
    { id: 'story', label: 'Câu chuyện', icon: BookOpen },
    { id: 'journey', label: 'Hành trình', icon: TrendingUp },
    { id: 'skills', label: 'Kỹ năng', icon: Star },
    { id: 'values', label: 'Giá trị', icon: Heart }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Điểm tối đa 3 đồ án',
      description: 'Kubernetes Cloud, Bluejacking Security, Java Networking',
      color: 'text-professional-green'
    },
    {
      icon: Coffee,
      title: 'Java Expert',
      description: 'Ngôn ngữ lập trình chính với 90% proficiency',
      color: 'text-professional-blue'
    },
    {
      icon: Shield,
      title: 'Security Focus',
      description: 'Chuyên sâu về Network Security & Penetration Testing',
      color: 'text-professional-purple'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Luôn cập nhật công nghệ mới và best practices',
      color: 'text-professional-orange'
    }
  ];

  const journey = [
    {
      year: '2022',
      title: 'Bắt đầu hành trình',
      description: 'Nhập học ngành Khoa học Máy tính - An ninh mạng tại ĐH Ngoại ngữ - Tin học TP.HCM',
      milestone: 'Khởi đầu'
    },
    {
      year: '2023',
      title: 'Phát triển nền tảng',
      description: 'Tập trung học Java programming và các khái niệm cơ bản về cybersecurity',
      milestone: 'Nền tảng'
    },
    {
      year: '2024',
      title: 'Thực hành chuyên sâu',
      description: 'Hoàn thành các đồ án quan trọng với điểm tối đa, thực hành với cloud platforms',
      milestone: 'Thực hành'
    },
    {
      year: '2025',
      title: 'Sẵn sàng nghề nghiệp',
      description: 'Tích lũy kinh nghiệm thực tế, chuẩn bị cho cơ hội thực tập và làm việc',
      milestone: 'Sẵn sàng'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-corporate-navy-50 via-white to-corporate-blue-50/30 dark:from-corporate-navy-900 dark:via-corporate-navy-800 dark:to-corporate-blue-950/30 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-professional-blue/5 to-professional-navy/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-professional-green/5 to-professional-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Enhanced Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-professional-blue/10 text-professional-blue px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Về tôi</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-corporate-navy-900 via-professional-blue to-corporate-navy-800 dark:from-white dark:via-corporate-blue-200 dark:to-white bg-clip-text text-transparent">
                {about.subtitle}
              </span>
            </h2>
            <p className="text-base sm:text-xl text-corporate-navy-600 dark:text-corporate-navy-400 max-w-4xl mx-auto leading-relaxed px-4">
              Trở thành một cybersecurity professional giỏi, đóng góp vào việc bảo vệ thế giới số
            </p>
          </motion.div>

          {/* Achievement Highlights */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  variants={itemVariants}
                  className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-corporate-navy-200/50 dark:border-corporate-navy-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-professional-blue/10 to-professional-navy/10 flex items-center justify-center ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-corporate-navy-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-corporate-navy-600 dark:text-corporate-navy-400">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-professional-blue text-white shadow-lg'
                      : 'bg-white/80 dark:bg-corporate-navy-800/80 text-corporate-navy-600 dark:text-corporate-navy-400 hover:bg-professional-blue/10 hover:text-professional-blue'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={itemVariants} className="mb-16">
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 lg:p-12">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed text-lg mb-6">
                      Xin chào! Tôi là <strong className="text-professional-blue">Khải</strong>, sinh viên năm cuối ngành 
                      <strong className="text-professional-green"> Khoa học Máy tính chuyên ngành An ninh mạng</strong> tại 
                      Đại học Ngoại ngữ - Tin học TP.HCM.
                    </p>
                    
                    <div className="bg-professional-blue/5 border-l-4 border-professional-blue p-6 rounded-r-xl mb-6">
                      <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed text-lg italic">
                        <strong className="text-professional-blue">"Xâm nhập để học, bảo vệ để trưởng thành"</strong> - 
                        Đây là phương châm học tập và làm việc của tôi trong lĩnh vực cybersecurity.
                      </p>
                    </div>

                    <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed text-lg mb-6">
                      <strong className="text-professional-green">Java Programming Enthusiast:</strong> Java là ngôn ngữ lập trình chính của tôi 
                      với 90% proficiency. Tôi đặc biệt yêu thích việc ứng dụng Java trong security và network programming, 
                      đã hoàn thành xuất sắc đồ án <em>"Secure Client-Server Communication using Java & Netty"</em> với điểm tối đa.
                    </p>

                    <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed text-lg mb-6">
                      <strong className="text-professional-purple">Cybersecurity Passion:</strong> Đam mê tìm hiểu về network security, 
                      penetration testing và các công cụ bảo mật. Luôn áp dụng mindset "ethical hacking" để hiểu sâu về vulnerabilities 
                      và cách phòng chống.
                    </p>

                    <p className="text-corporate-navy-700 dark:text-corporate-navy-300 leading-relaxed text-lg">
                      <strong className="text-professional-orange">Growth Mindset:</strong> Mặc dù GPA hiện tại là 2.88, 
                      tôi luôn đạt <strong>điểm tối đa trong các đồ án quan trọng</strong> và thực hành. 
                      Tin rằng học tập thông qua thực hành và project-based learning là cách hiệu quả nhất để phát triển kỹ năng thực tế.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'journey' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-8">
                  {journey.map((item, index) => (
                    <div key={item.year} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-professional-blue to-professional-navy rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {item.year}
                        </div>
                      </div>
                      <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-xl p-6 flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-corporate-navy-900 dark:text-white">
                            {item.title}
                          </h3>
                          <span className="bg-professional-green/10 text-professional-green px-2 py-1 rounded-full text-xs font-medium">
                            {item.milestone}
                          </span>
                        </div>
                        <p className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ProfessionalSkillProgress skills={profile.skills} />
              </motion.div>
            )}

            {activeTab === 'values' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-blue/10 to-professional-navy/10 rounded-2xl flex items-center justify-center text-professional-blue mb-6">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-4">
                      Ethical Hacking Mindset
                    </h3>
                    <p className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                      "Xâm nhập để học, bảo vệ để trưởng thành" - Luôn học hỏi từ góc độ của attacker để hiểu cách bảo vệ tốt nhất.
                    </p>
                  </div>

                  <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-green/10 to-emerald-500/10 rounded-2xl flex items-center justify-center text-professional-green mb-6">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-4">
                      Continuous Improvement
                    </h3>
                    <p className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                      Không ngừng học hỏi và cải thiện. Project-based learning và hands-on experience là chìa khóa thành công.
                    </p>
                  </div>

                  <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-purple/10 to-purple-500/10 rounded-2xl flex items-center justify-center text-professional-purple mb-6">
                      <Coffee className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-4">
                      Technical Excellence
                    </h3>
                    <p className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                      Tập trung vào chất lượng code và best practices. Java programming và cloud security là specialty của tôi.
                    </p>
                  </div>

                  <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-professional-orange/10 to-orange-500/10 rounded-2xl flex items-center justify-center text-professional-orange mb-6">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-4">
                      Achievement Focus
                    </h3>
                    <p className="text-corporate-navy-600 dark:text-corporate-navy-400 leading-relaxed">
                      Luôn nỗ lực đạt kết quả tốt nhất trong các dự án quan trọng. 3 đồ án điểm tối đa là minh chứng cho điều này.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Call to Action - Enhanced Contrast */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="professional-card bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-100 dark:to-gray-50 rounded-2xl p-8 lg:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-black">
                Sẵn sàng hợp tác cùng bạn!
              </h3>
              <p className="text-xl mb-8 text-black">
                Tìm kiếm cơ hội thực tập và làm việc trong lĩnh vực Cybersecurity & Java Development
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>Liên hệ ngay</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href={profile.cvDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-cyan-500 border-2 border-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 hover:scale-105"
                >
                  <span>Tải CV</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
