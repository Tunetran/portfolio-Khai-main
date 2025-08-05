'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, Star, Calendar, Tag, ArrowRight, Filter, Grid, List } from 'lucide-react';
import portfolioData from '@/lib/portfolioData';

export default function ModernProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { projects } = portfolioData;

  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
    <section id="projects" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-gradient-to-tr from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                Dự Án Nổi Bật
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Khám phá những dự án và nghiên cứu mà tôi đã thực hiện trong lĩnh vực cybersecurity và phát triển web
            </p>
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
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  layout
                  className={`group ${viewMode === 'list' ? 'md:flex items-center gap-8' : ''}`}
                >
                  <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    project.featured ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                  }`}>
                    {/* Project Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-80 md:flex-shrink-0' : 'aspect-video'}`}>
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
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
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
