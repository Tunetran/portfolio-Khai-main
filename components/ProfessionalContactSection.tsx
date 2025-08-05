"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Clock, Send, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AdvancedContactForm from './AdvancedContactForm';
import portfolio from '../lib/portfolioData';

export default function ProfessionalContactSection() {
  const { contact, profile } = portfolio;

  const contactInfo = [
    {
      icon: Mail,
      label: contact[0].title,
      value: contact[0].value,
      href: contact[0].href,
      color: 'from-professional-blue to-blue-500',
      bgColor: 'bg-professional-blue/10'
    },
    {
      icon: Phone,
      label: contact[1].title,
      value: contact[1].value,
      href: contact[1].href,
      color: 'from-professional-green to-emerald-500',
      bgColor: 'bg-professional-green/10'
    },
    {
      icon: MapPin,
      label: contact[2].title,
      value: contact[2].value,
      href: contact[2].href,
      color: 'from-professional-orange to-orange-500',
      bgColor: 'bg-professional-orange/10'
    },
    {
      icon: Clock,
      label: 'Thời gian phù hợp',
      value: '8:00 - 20:00 (Thứ 2 - Chủ nhật)',
      href: '#',
      color: 'from-professional-purple to-purple-500',
      bgColor: 'bg-professional-purple/10'
    }
  ];

  const socialLinks = profile.socialLinks.filter(link => 
    ['GitHub', 'LinkedIn', 'Email'].includes(link.label)
  ).map(link => ({
    icon: link.label === 'GitHub' ? Github : 
          link.label === 'LinkedIn' ? Linkedin : Mail,
    label: link.label,
    href: link.href,
    color: link.label === 'GitHub' ? 'from-gray-700 to-gray-900' :
           link.label === 'LinkedIn' ? 'from-blue-600 to-blue-700' :
           'from-professional-blue to-blue-600'
  }));

  const whyChooseMe = [
    {
      icon: CheckCircle,
      title: "Phản hồi nhanh chóng",
      description: "Cam kết phản hồi trong vòng 2-4 tiếng làm việc"
    },
    {
      icon: MessageCircle,
      title: "Tư vấn miễn phí",
      description: "Thảo luận chi tiết về dự án và đưa ra lời khuyên chuyên môn"
    },
    {
      icon: Calendar,
      title: "Linh hoạt thời gian",
      description: "Sẵn sàng làm việc theo múi giờ phù hợp với client"
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-corporate-navy-50 via-white to-corporate-blue-50/30 dark:from-corporate-navy-900 dark:via-corporate-navy-800 dark:to-corporate-blue-950 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-professional-blue/10 to-professional-navy/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-professional-green/10 to-professional-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-professional-blue/10 text-professional-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Send className="w-4 h-4" />
            <span>Kết nối & Hợp tác</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-corporate-navy-900 via-professional-blue to-corporate-navy-800 dark:from-white dark:via-corporate-blue-200 dark:to-white bg-clip-text text-transparent">
              Sẵn Sàng Hợp Tác
            </span>
          </h2>
          <p className="text-xl text-corporate-navy-600 dark:text-corporate-navy-400 max-w-4xl mx-auto leading-relaxed">
            Hãy cùng nhau thảo luận về dự án của bạn. Tôi cam kết mang đến giải pháp tối ưu và dịch vụ chuyên nghiệp nhất.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 border border-corporate-navy-200/50 dark:border-corporate-navy-700/50">
              <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-professional-blue" />
                Thông tin liên hệ
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-corporate-navy-50/50 dark:hover:bg-corporate-navy-700/30 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-corporate-navy-600 dark:text-corporate-navy-400">
                          {info.label}
                        </p>
                        <p className="text-lg font-semibold text-corporate-navy-900 dark:text-white group-hover:text-professional-blue transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 border border-corporate-navy-200/50 dark:border-corporate-navy-700/50">
              <h3 className="text-xl font-bold text-corporate-navy-900 dark:text-white mb-6">
                Kết nối mạng xã hội
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-xl`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Why Choose Me */}
            <div className="professional-card bg-gradient-to-br from-professional-blue to-professional-navy rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Tại sao chọn tôi?</h3>
              <div className="space-y-4">
                {whyChooseMe.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm opacity-90">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl p-8 border border-corporate-navy-200/50 dark:border-corporate-navy-700/50"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-3 flex items-center">
                <Send className="w-6 h-6 mr-3 text-professional-blue" />
                Gửi tin nhắn
              </h3>
              <p className="text-corporate-navy-600 dark:text-corporate-navy-400">
                Hãy chia sẻ ý tưởng dự án của bạn. Tôi sẽ phản hồi sớm nhất có thể!
              </p>
            </div>
            
            <AdvancedContactForm />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="professional-card bg-gradient-to-r from-corporate-navy-100 to-corporate-blue-100 dark:from-corporate-navy-800 dark:to-corporate-navy-700 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-corporate-navy-900 dark:text-white">
              Bắt đầu dự án ngay hôm nay
            </h3>
            <p className="text-xl mb-8 text-corporate-navy-600 dark:text-corporate-navy-400">
              Cùng nhau biến ý tưởng thành hiện thực với công nghệ hiện đại và giải pháp tối ưu
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:khaikaito123@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-professional-blue to-professional-navy text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>Gửi email ngay</span>
              </a>
              <a
                href="tel:+84869696969"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-professional-blue text-professional-blue font-semibold rounded-xl hover:bg-professional-blue hover:text-white transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>Gọi điện thoại</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
