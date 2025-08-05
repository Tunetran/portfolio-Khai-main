'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp, ExternalLink } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';

export default function ModernFooter() {
  const { profile, navigation } = portfolioData;

  const socialIcons: Record<string, any> = {
    'GitHub': Github,
    'LinkedIn': Linkedin,
    'Email': Mail,
    'Facebook': Mail,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white overflow-hidden">
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
          viewport={{ once: true }}
          className="py-16 lg:py-20"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Profile Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  K
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{profile.name}</h3>
                  <p className="text-blue-200">{profile.title}</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Chuyên gia về An Ninh Mạng đang tìm kiếm cơ hội thực tập để phát triển kỹ năng và đóng góp cho cộng đồng cybersecurity.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>TP. Hồ Chí Minh, Việt Nam</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-green-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors duration-300">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors duration-300">
                    {profile.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-white mb-6">Liên kết nhanh</h4>
              <nav className="space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Social & Resources */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-white mb-6">Kết nối</h4>
              
              {/* Social Links */}
              <div className="space-y-3 mb-6">
                {profile.socialLinks.map((link) => {
                  const IconComponent = socialIcons[link.label] || ExternalLink;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Download CV */}
              <a
                href={profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Tải CV
              </a>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2 text-slate-400"
              >
                <span>© 2024 {profile.name}. Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in Vietnam</span>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                variants={itemVariants}
                className="text-slate-400 text-sm"
              >
                Built with Next.js, TypeScript & Tailwind CSS
              </motion.div>

              {/* Back to Top */}
              <motion.button
                variants={itemVariants}
                onClick={scrollToTop}
                className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-300"
              >
                <span className="text-sm">Lên đầu trang</span>
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-blue-600/50 transition-colors duration-300">
                  <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-40 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
    </footer>
  );
}
