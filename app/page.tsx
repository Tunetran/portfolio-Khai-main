"use client";

import { motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import FloatingContact from '@/components/FloatingContact';
import ParticleBackground from '@/components/ParticleBackground';
import CursorFollower from '@/components/CursorFollower';
import PageTransition from '@/components/PageTransition';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import EmailSetupNotice from '@/components/EmailSetupNotice';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import portfolioData from '@/lib/portfolioData';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ParticleBackground />
      <CursorFollower />
      <FloatingContact />
      <BackToTop />
      <PerformanceMonitor />
      <EmailSetupNotice />
      
      <PageTransition>
        <div className="relative">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <AchievementsSection />
          <ProjectsSection />
          <BlogSection blogs={portfolioData.blog} />
          <ContactSection />
        </div>
      </PageTransition>
    </>
  );
}