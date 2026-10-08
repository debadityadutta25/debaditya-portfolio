import React, { useState } from 'react';
import { BackgroundCanvas } from './components/portfolio/BackgroundCanvas';
import { PortfolioNavbar } from './components/portfolio/PortfolioNavbar';
import { HeroSection } from './components/portfolio/HeroSection';
import { PipelineSimulator } from './components/portfolio/PipelineSimulator';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { CertificationsSection } from './components/portfolio/CertificationsSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { InteractiveTerminal } from './components/portfolio/InteractiveTerminal';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { StudioModal } from './components/portfolio/StudioModal';

export function App() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState<string | undefined>(undefined);

  const handleOpenStudio = () => {
    setIsStudioOpen(true);
  };

  const handleCloseStudio = () => {
    setIsStudioOpen(false);
  };

  const handleSelectTerminalCommand = (cmd: string) => {
    setTerminalCommand(cmd);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 60fps Interactive Data Pipeline Particle & Stream Canvas */}
      <BackgroundCanvas />

      {/* Main Glassmorphic Navigation Bar */}
      <PortfolioNavbar onOpenStudio={handleOpenStudio} />

      {/* Main Content Layout */}
      <main className="relative z-10 space-y-0">
        {/* Hero Section */}
        <HeroSection onOpenStudio={handleOpenStudio} />

        {/* Live Interactive ETL & CDC Pipeline Simulator */}
        <PipelineSimulator />

        {/* Categorized Skills & Platform Matrix */}
        <SkillsSection onSelectTerminalCommand={handleSelectTerminalCommand} />

        {/* Verified Enterprise Certifications & Badges (9 Items) */}
        <CertificationsSection />

        {/* Featured Production Engineering Implementations */}
        <ProjectsSection onOpenStudio={handleOpenStudio} />

        {/* Interactive CLI Terminal Shell */}
        <InteractiveTerminal initialCommand={terminalCommand} />

        {/* Contact Coordinates & Direct Reach-out */}
        <ContactSection />
      </main>

      {/* Footer with Operational Cluster Status */}
      <Footer />

      {/* Full-Feature DataInsight Studio Demo Modal */}
      <StudioModal isOpen={isStudioOpen} onClose={handleCloseStudio} />
    </div>
  );
}

export default App;
