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
import ModernHeroSection from '@/components/ModernHeroSection';
import ProfessionalAboutSection from '@/components/ProfessionalAboutSection';
import ProfessionalExperienceSection from '../components/ProfessionalExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import ModernProjectsSection from '@/components/ModernProjectsSection';
import BlogSection from '@/components/BlogSection';
import TarotSection from '@/components/TarotSection';
import ProfessionalContactSection from '../components/ProfessionalContactSection';
import ProfessionalFooter from '@/components/ProfessionalFooter';
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
          <ModernHeroSection />
          <ProfessionalAboutSection />
          <ProfessionalExperienceSection />
          <AchievementsSection />
          <ModernProjectsSection />
          <BlogSection blogs={portfolioData.blog} />
          <div id="tarot">
            <TarotSection />
          </div>
          <ProfessionalContactSection />
          <ProfessionalFooter />
        </div>
      </PageTransition>
    </>
  );
}