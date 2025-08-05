'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, Star, Calendar, Tag, ArrowRight, Filter, Grid, List, Trophy, Target, TrendingUp, Award } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';

export default function ModernProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'featured'>('featured');
  const { projects } = portfolioData;

  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

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
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gradient-to-br from-corporate-navy-50 via-white to-corporate-blue-50/50 dark:from-corporate-navy-900 dark:via-corporate-navy-800 dark:to-corporate-blue-950/50 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-professional-blue/5 to-professional-navy/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-gradient-to-tr from-professional-green/5 to-professional-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Enhanced Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-professional-blue/10 text-professional-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              <span>Dự án & Thành tựu</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-corporate-navy-900 via-professional-blue to-corporate-navy-800 dark:from-white dark:via-corporate-blue-200 dark:to-white bg-clip-text text-transparent">
                Thành Tựu Đáng Tự Hào
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-corporate-navy-600 dark:text-corporate-navy-400 max-w-4xl mx-auto leading-relaxed">
              🏆 <strong>Điểm tối đa 3 đồ án quan trọng</strong> - Khám phá những dự án cybersecurity và Java development 
              đã giúp tôi chứng minh khả năng thực hành xuất sắc trong lĩnh vực công nghệ
            </p>
            
            {/* Achievement Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-blue">3</div>
                <div className="text-sm text-corporate-navy-600 dark:text-corporate-navy-400">Đồ án điểm tối đa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-green">6+</div>
                <div className="text-sm text-corporate-navy-600 dark:text-corporate-navy-400">Dự án hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-navy">4</div>
                <div className="text-sm text-corporate-navy-600 dark:text-corporate-navy-400">Cloud Platforms</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {category === 'all' ? 'Tất cả' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm rounded-xl p-1 border border-corporate-navy-200 dark:border-corporate-navy-700">
              <button
                onClick={() => setViewMode('featured')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'featured'
                    ? 'bg-professional-blue/10 text-professional-blue'
                    : 'text-corporate-navy-600 dark:text-corporate-navy-400 hover:text-professional-blue'
                }`}
              >
                <Trophy className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-professional-blue/10 text-professional-blue'
                    : 'text-corporate-navy-600 dark:text-corporate-navy-400 hover:text-professional-blue'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Projects Layout */}
          <AnimatePresence mode="wait">
            {viewMode === 'featured' ? (
              /* Featured Projects Layout */
              <motion.div
                key="featured-layout"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                {/* Featured Projects Hero */}
                <div className="space-y-8">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-professional-blue/20 hover:border-professional-blue/40 transition-all duration-500 hover:shadow-2xl">
                        <div className="lg:flex">
                          {/* Project Image */}
                          <div className="lg:w-1/2 relative">
                            <div className="aspect-video lg:aspect-square relative overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-professional-navy/20 to-transparent" />
                              
                              {/* Achievement Badge */}
                              <div className="absolute top-6 left-6">
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-professional-green to-professional-blue text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                  <Trophy className="w-4 h-4" />
                                  <span>Đồ án xuất sắc</span>
                                </div>
                              </div>

                              {/* Impact Badge */}
                              {project.impact && (
                                <div className="absolute bottom-6 left-6">
                                  <div className="bg-white/90 dark:bg-corporate-navy-900/90 backdrop-blur-sm text-corporate-navy-800 dark:text-white text-xs font-medium px-3 py-2 rounded-lg border border-corporate-navy-200 dark:border-corporate-navy-700">
                                    {project.impact}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Project Content */}
                          <div className="lg:w-1/2 p-8 lg:p-12">
                            <div className="flex items-center space-x-3 mb-4">
                              <span className="bg-professional-blue/10 text-professional-blue text-sm font-medium px-3 py-1 rounded-full">
                                {project.category}
                              </span>
                              <div className="flex items-center text-professional-green">
                                <Award className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">Nổi bật</span>
                              </div>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-bold text-corporate-navy-900 dark:text-white mb-4 group-hover:text-professional-blue transition-colors duration-300">
                              {project.title}
                            </h3>
                            
                            <p className="text-corporate-navy-600 dark:text-corporate-navy-400 mb-6 leading-relaxed text-lg">
                              {project.description}
                            </p>

                            {/* Key Metrics */}
                            {project.metrics && (
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-corporate-navy-700 dark:text-corporate-navy-300 mb-3 flex items-center">
                                  <TrendingUp className="w-4 h-4 mr-2 text-professional-green" />
                                  Thành tựu chính
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {project.metrics.map((metric, metricIndex) => (
                                    <div key={metricIndex} className="flex items-center text-sm text-corporate-navy-600 dark:text-corporate-navy-400">
                                      <Target className="w-3 h-3 mr-2 text-professional-blue" />
                                      {metric}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Technologies */}
                            <div className="mb-8">
                              <h4 className="text-sm font-semibold text-corporate-navy-700 dark:text-corporate-navy-300 mb-3">
                                Công nghệ sử dụng
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="bg-corporate-navy-100 dark:bg-corporate-navy-700/50 text-corporate-navy-700 dark:text-corporate-navy-300 text-sm font-medium px-3 py-1 rounded-lg border border-corporate-navy-200 dark:border-corporate-navy-600"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Links */}
                            <div className="flex items-center space-x-4">
                              {project.github !== '#' && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="professional-button inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-professional-blue to-professional-navy rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <Github className="w-4 h-4 mr-2" />
                                  Source Code
                                </a>
                              )}
                              {project.demo !== '#' && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-6 py-3 text-professional-blue bg-white/90 dark:bg-corporate-navy-800/90 border border-professional-blue/20 rounded-lg hover:bg-professional-blue/5 transition-all duration-300"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Regular Projects Grid */}
                {regularProjects.length > 0 && (
                  <div>
                    <motion.h3 
                      variants={itemVariants}
                      className="text-2xl font-bold text-corporate-navy-900 dark:text-white mb-8 text-center"
                    >
                      Dự án khác
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regularProjects.map((project, index) => (
                        <motion.div
                          key={project.title}
                          variants={itemVariants}
                          className="group"
                        >
                          <div className="professional-card bg-white/95 dark:bg-corporate-navy-800/95 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            {/* Compact Project Image */}
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-corporate-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Category */}
                              <div className="absolute top-3 right-3">
                                <span className="bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm text-corporate-navy-700 dark:text-corporate-navy-300 text-xs font-medium px-2 py-1 rounded-full">
                                  {project.category}
                                </span>
                              </div>

                              {/* Links Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="flex space-x-3">
                                  {project.github !== '#' && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-3 bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm rounded-full text-corporate-navy-700 dark:text-corporate-navy-300 hover:bg-white dark:hover:bg-corporate-navy-800 transition-all duration-300 hover:scale-110"
                                    >
                                      <Github className="w-4 h-4" />
                                    </a>
                                  )}
                                  {project.demo !== '#' && (
                                    <a
                                      href={project.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-3 bg-white/90 dark:bg-corporate-navy-800/90 backdrop-blur-sm rounded-full text-corporate-navy-700 dark:text-corporate-navy-300 hover:bg-white dark:hover:bg-corporate-navy-800 transition-all duration-300 hover:scale-110"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Compact Content */}
                            <div className="p-6">
                              <h4 className="text-lg font-bold text-corporate-navy-900 dark:text-white mb-2 group-hover:text-professional-blue transition-colors duration-300">
                                {project.title}
                              </h4>
                              
                              <p className="text-corporate-navy-600 dark:text-corporate-navy-400 mb-4 leading-relaxed text-sm line-clamp-2">
                                {project.description}
                              </p>

                              {/* Compact Technologies */}
                              <div className="flex flex-wrap gap-1 mb-4">
                                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="bg-corporate-navy-100 dark:bg-corporate-navy-700/50 text-corporate-navy-700 dark:text-corporate-navy-300 text-xs font-medium px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="text-corporate-navy-500 dark:text-corporate-navy-400 text-xs">
                                    +{project.technologies.length - 3} more
                                  </span>
                                )}
                              </div>

                              {/* Impact */}
                              {project.impact && (
                                <div className="text-xs text-professional-green font-medium flex items-center">
                                  <Award className="w-3 h-3 mr-1" />
                                  {project.impact.slice(0, 30)}...
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Grid Layout */
              <motion.div
                key="grid-layout"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={cardVariants}
                    className="group"
                  >
                  <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    project.featured ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                  }`}>
                    {/* Project Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-video' : 'md:w-80 md:flex-shrink-0'}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            <Star className="w-3 h-3" />
                            <span>Nổi bật</span>
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                          {project.category}
                        </span>
                      </div>

                      {/* Hover Overlay with Links */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex space-x-3">
                          {project.github !== '#' && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.demo !== '#' && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-xs font-medium px-3 py-1 rounded-lg"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center space-x-4">
                        {project.github !== '#' && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </a>
                        )}
                        {project.demo !== '#' && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
                          >
                            <span>Xem Demo</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          </AnimatePresence>

          {/* View All Projects Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <a
              href="https://github.com/Tunetran"
              target="_blank"
              rel="noopener noreferrer"
              className="professional-button inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-professional-blue to-professional-navy hover:from-corporate-blue-600 hover:to-corporate-navy-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <Github className="w-5 h-5 mr-3" />
              Xem tất cả dự án trên GitHub
              <ArrowRight className="w-5 h-5 ml-3" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
