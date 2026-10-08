import React from 'react';
import { AnimatedBackground } from './components/portfolio/AnimatedBackground';
import { MinimalNavbar } from './components/portfolio/MinimalNavbar';
import { RecorderHeroScreen } from './components/portfolio/RecorderHeroScreen';
import { FocusedSkillsSection } from './components/portfolio/FocusedSkillsSection';
import { CompactCertifications } from './components/portfolio/CompactCertifications';
import { StreamlinedContact } from './components/portfolio/StreamlinedContact';
import { PERSONAL_INFO } from './data/portfolioData';

export function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans relative selection:bg-red-600/30 selection:text-white">
      {/* Animated Background Canvas */}
      <AnimatedBackground />

      {/* Sticky Clean Header Bar */}
      <MinimalNavbar />

      <main className="relative z-10 space-y-6">
        {/* Camera Recorder Viewfinder Screen with Profile Picture at the top */}
        <RecorderHeroScreen />

        {/* Core Technical Focus: Databricks, PySpark, SQL, Bitbucket, PyCharm, Informatica PowerCenter */}
        <FocusedSkillsSection />

        {/* All 9 Verified Certifications & Badges */}
        <CompactCertifications />

        {/* Direct Contact Actions */}
        <StreamlinedContact />
      </main>

      {/* Clean Minimal Footer with scaled fonts */}
      <footer className="relative z-10 border-t border-zinc-900 py-10 text-center text-sm text-zinc-400 font-mono">
        <div className="font-semibold text-zinc-300">
          © {new Date().getFullYear()} {PERSONAL_INFO.name} • {PERSONAL_INFO.location}
        </div>
        <div className="mt-1.5 text-xs text-zinc-500">
          Databricks • PySpark • SQL • Bitbucket • PyCharm • Informatica
        </div>
      </footer>
    </div>
  );
}

export default App;
