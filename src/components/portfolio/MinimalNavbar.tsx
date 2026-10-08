import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const MinimalNavbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 py-3.5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md">
            DD
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Databricks • PySpark • SQL • Bitbucket • PyCharm
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-5 text-xs font-medium text-zinc-400">
          <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors">
            Skills
          </button>
          <button onClick={() => scrollTo('certifications')} className="hover:text-white transition-colors">
            Certifications (9)
          </button>
          <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors">
            Projects
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

      </div>
    </header>
  );
};
