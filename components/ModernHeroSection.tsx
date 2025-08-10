'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Mail, Github, Linkedin, MapPin, Phone, ArrowDown, Sparkles, Shield, Code, Globe } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';

const floatingIcons = [
  { icon: Shield, color: 'text-professional-blue', delay: 0 },
  { icon: Code, color: 'text-professional-green', delay: 0.5 },
  { icon: Globe, color: 'text-professional-navy', delay: 1 },
  { icon: Sparkles, color: 'text-professional-orange', delay: 1.5 },
];

export default function ModernHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { profile } = portfolioData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const iconMap: Record<string, any> = {
    'GitHub': Github,
    'LinkedIn': Linkedin,
    'Email': Mail,
    'Facebook': Mail,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const handleScrollToNext = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-corporate-navy-50 via-corporate-blue-50 to-slate-50 dark:from-corporate-navy-900 dark:via-corporate-navy-800 dark:to-corporate-navy-900 px-4 sm:px-6 lg:px-8">
      {/* Professional Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-professional-blue/10 to-professional-navy/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-professional-green/10 to-professional-blue/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-professional-purple/8 to-professional-navy/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Professional Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className={`absolute ${item.color} opacity-15`}
            style={{
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`,
            }}
          >
            <item.icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Avatar */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      width={192}
                      height={192}
                      className="rounded-full object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
                {/* Professional status indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-professional-green rounded-full border-4 border-white dark:border-corporate-navy-900 shadow-lg">
                  <div className="w-full h-full bg-professional-green rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* Professional floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-professional-green to-professional-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
              >
                Available
              </motion.div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-corporate-navy-900 via-professional-blue to-corporate-navy-800 dark:from-white dark:via-corporate-blue-200 dark:to-white bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mb-4">
              <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-corporate-navy-700 dark:text-corporate-navy-300 text-center px-4">
                {profile.title}
              </h2>
              <div className="hidden sm:block w-2 h-2 bg-gradient-to-r from-professional-blue to-professional-navy rounded-full"></div>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-professional-blue dark:text-corporate-blue-400 font-medium text-center px-4">
                {profile.university}
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed px-4 text-center">
              {profile.description}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-corporate-navy-600 dark:text-corporate-navy-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-professional-blue" />
                <span>TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-professional-green" />
                <span className="break-all sm:break-normal">trankhair2004@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-professional-purple" />
                <span>0842380777</span>
              </div>
            </div>
          </motion.div>

          {/* Professional Action Buttons */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <a
                href={profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="professional-button w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-professional-blue to-professional-navy hover:from-corporate-blue-600 hover:to-corporate-navy-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Download className="w-5 h-5 mr-3" />
                Tải CV
              </a>
              
              <a
                href={`mailto:${profile.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-corporate-navy-700 dark:text-corporate-navy-300 bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm border border-corporate-navy-200 dark:border-corporate-navy-700 hover:bg-white dark:hover:bg-corporate-navy-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-3" />
                Liên hệ
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-center space-x-6">
              {profile.socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.label] || Mail;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 dark:text-slate-300"
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={handleScrollToNext}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm border border-corporate-navy-200 dark:border-corporate-navy-700 shadow-lg hover:shadow-xl transition-all duration-300 text-corporate-navy-700 dark:text-corporate-navy-300 hover:scale-110"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
