"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AdvancedContactForm from './AdvancedContactForm';
import portfolio from '../lib/portfolioData';

export default function ContactSection() {
  const { contact } = portfolio;

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'trankhair2004@gmail.com',
      href: 'mailto:trankhair2004@gmail.com',
      color: 'text-red-500'
    },
    {
      icon: Phone,
      label: 'Điện thoại',
      value: '+84 xxx xxx xxx',
      href: 'tel:+84xxxxxxxxx',
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      label: 'Địa chỉ',
      value: '279 Phan Anh, Bình Trị Đông, Bình Tân',
      href: '#',
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: 'Thời gian làm việc',
      value: '9:00 - 18:00 (T2-T6)',
      href: '#',
      color: 'text-purple-500'
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/TranVanKhai', color: 'bg-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/tranvankhai', color: 'bg-blue-600' },
    { icon: Mail, label: 'Email', href: 'mailto:trankhair2004@gmail.com', color: 'bg-red-500' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Liên hệ với tôi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hãy kết nối và thảo luận về các cơ hội hợp tác trong lĩnh vực Cybersecurity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={item}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                  <div className={`flex-shrink-0 p-3 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors ${info.color}`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {info.label}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Kết nối xã hội
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={item}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800 dark:text-green-300">
                  Hiện tại đang tìm cơ hội
                </span>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Tôi đang tìm kiếm các cơ hội thực tập và việc làm trong lĩnh vực An Ninh Mạng, 
                Penetration Testing và Phát triển ứng dụng bảo mật.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AdvancedContactForm />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Sẵn sàng bắt đầu dự án tiếp theo?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Tôi luôn sẵn sàng thảo luận về các ý tưởng mới, cơ hội hợp tác hoặc 
              đơn giản chỉ là một cuộc trò chuyện về công nghệ và bảo mật.
            </p>
            <motion.a
              href="mailto:trankhair2004@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail size={20} />
              <span>Gửi email ngay</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
               