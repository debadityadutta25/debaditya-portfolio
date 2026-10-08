import React from 'react';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const MinimalNavbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-b border-zinc-800/80 py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand */}
        <div
          className="flex items-center space-x-3.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-mono font-black text-sm shadow-lg shadow-red-600/30">
            DD
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Databricks • PySpark • SQL • Bitbucket • PyCharm
            </div>
          </div>
        </div>

        {/* Navigation Links with larger text */}
        <nav className="hidden sm:flex items-center space-x-6 text-sm font-semibold text-zinc-300">
          <button
            onClick={() => scrollTo('skills')}
            className="hover:text-cyan-400 transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="hover:text-cyan-400 transition-colors"
          >
            Certifications (9)
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>Connect</span>
          </a>
        </div>

      </div>
    </header>
  );
};
