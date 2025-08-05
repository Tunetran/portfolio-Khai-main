'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download, Sparkles, Moon, Sun, Shield } from 'lucide-react';
import Link from 'next/link';
import portfolioData from '@/lib/portfolioData';

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = portfolioData.navigation.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-xl border-b border-slate-200/50 dark:border-slate-700/50' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse shadow-sm"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg lg:text-xl bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                  Trần Văn Khải
                </h1>
                <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Cybersecurity Specialist
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {portfolioData.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.name === 'Tarot' && (
                    <Sparkles className="inline w-3 h-3 ml-1 text-purple-500 group-hover:animate-spin" />
                  )}
                  {activeSection === item.href.replace('#', '') && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              <a
                href={portfolioData.profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 mr-2" />
                Tải CV
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-slate-700 dark:text-slate-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95">
            <nav className="container mx-auto px-4 sm:px-6 py-6">
              <div className="flex flex-col space-y-2">
                {portfolioData.navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center space-x-2">
                      {item.name === 'Tarot' && (
                        <Sparkles className="w-4 h-4 text-purple-500 group-hover:animate-spin" />
                      )}
                      {activeSection === item.href.replace('#', '') && (
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <a
                    href={portfolioData.profile.cvDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải CV
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
