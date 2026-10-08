import React from 'react';
import { MinimalNavbar } from './components/portfolio/MinimalNavbar';
import { YouTubeHeroScreen } from './components/portfolio/YouTubeHeroScreen';
import { FocusedSkillsSection } from './components/portfolio/FocusedSkillsSection';
import { CompactCertifications } from './components/portfolio/CompactCertifications';
import { ConciseProjects } from './components/portfolio/ConciseProjects';
import { StreamlinedContact } from './components/portfolio/StreamlinedContact';
import { PERSONAL_INFO } from './data/portfolioData';

export function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-red-600/30 selection:text-white">
      {/* Sticky Clean Header Bar */}
      <MinimalNavbar />

      <main className="space-y-4">
        {/* YouTube Screen with Profile Picture at the top */}
        <YouTubeHeroScreen />

        {/* Core Technical Focus: Databricks, PySpark, SQL, Bitbucket, PyCharm (HVR balanced) */}
        <FocusedSkillsSection />

        {/* All 9 Verified Certifications & Badges */}
        <CompactCertifications />

        {/* Production Architectures & Implementations */}
        <ConciseProjects />

        {/* Direct Contact Actions */}
        <StreamlinedContact />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-500 font-mono">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name} • {PERSONAL_INFO.location}
        </div>
        <div className="mt-1 text-[11px] text-zinc-600">
          Databricks • PySpark • SQL • Bitbucket • PyCharm Data Engineer
        </div>
      </footer>
    </div>
  );
}

export default App;
