"use client";

import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import portfolio from '../lib/portfolioData';

export default function ProfessionalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Trang chủ', href: '#home' },
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Kinh nghiệm', href: '#experience' },
    { name: 'Dự án', href: '#projects' },
    { name: 'Liên hệ', href: '#contact' }
  ];

  const services = [
    'Java Development',
    'Cybersecurity Solutions',
    'Web Development',
    'System Security',
    'Code Review',
    'Technical Consultation'
  ];

  const socialLinks = portfolio.profile.socialLinks.map(link => ({
    ...link,
    icon: link.label === 'GitHub' ? Github : 
          link.label === 'LinkedIn' ? Linkedin : 
          link.label === 'Email' ? Mail : ExternalLink
  }));

  return (
    <footer className="relative bg-gradient-to-br from-corporate-navy-900 via-corporate-navy-800 to-corporate-blue-900 text-white overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-professional-blue/10 to-professional-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-professional-green/10 to-professional-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              <div className="font-bold text-3xl bg-gradient-to-r from-white to-corporate-blue-200 bg-clip-text text-transparent">
                Trần Văn Khải
              </div>
              <div className="text-professional-blue font-semibold text-lg">
                Java Developer & Cybersecurity Specialist
              </div>
            </div>
            
            <p className="text-corporate-blue-200 leading-relaxed text-lg max-w-md">
              Sinh viên ngành Công nghệ Thông tin chuyên ngành An ninh mạng với đam mê phát triển công nghệ và bảo mật thông tin. 
              Chuyên về Java Development và Cybersecurity Solutions.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Thông tin liên hệ nhanh</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:trankhair2004@gmail.com"
                  className="flex items-center space-x-3 text-corporate-blue-200 hover:text-white transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>trankhair2004@gmail.com</span>
                </a>
                <a 
                  href="tel:+84842380777"
                  className="flex items-center space-x-3 text-corporate-blue-200 hover:text-white transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>0842 380 777</span>
                </a>
                <div className="flex items-center space-x-3 text-corporate-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span>HCM, Việt Nam</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="font-semibold text-white text-lg">Điều hướng</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block text-corporate-blue-200 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <span className="group-hover:text-professional-blue">{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="font-semibold text-white text-lg">Dịch vụ</h4>
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2 text-corporate-blue-200"
                >
                  <div className="w-1.5 h-1.5 bg-professional-blue rounded-full"></div>
                  <span className="text-sm">{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-t border-corporate-blue-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-corporate-blue-200 font-medium">Kết nối với tôi:</span>
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
                      transition={{ delay: index * 0.1 }}
                      className="w-10 h-10 bg-corporate-blue-800/50 hover:bg-professional-blue rounded-xl flex items-center justify-center text-corporate-blue-200 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-corporate-blue-300">
                <span>Được tạo với</span>
                <Heart className="text-red-400 w-4 h-4" />
                <span>và</span>
                <Code className="text-professional-blue w-4 h-4" />
                <span>bởi TVK</span>
              </div>
              <div className="text-corporate-blue-400 text-sm">
                © {currentYear} Trần Văn Khải. All rights reserved.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-professional-blue to-professional-navy rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-professional-blue/25 transition-all duration-300 hover:scale-110 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
}
