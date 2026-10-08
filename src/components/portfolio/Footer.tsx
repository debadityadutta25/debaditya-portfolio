import React from 'react';
import { ArrowUp, Heart, Terminal, Sparkles, MapPin, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-400 py-12 relative z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          
          {/* Left: Branding & Status */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white font-bold font-sans text-base">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-xs font-mono text-cyan-400 font-normal">Data Engineer</span>
            </div>
            <p className="text-zinc-400 max-w-md">
              High-throughput lakehouses, real-time CDC with Fivetran HVR, Databricks, PySpark, and Snowflake.
            </p>
          </div>

          {/* Right: Operational Status & Back to Top */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLUSTER STATUS: HEALTHY</span>
            </div>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 border border-zinc-800 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright & build metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Hosted on GitHub Pages.
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-500" />
            <span>West Bengal, PIN 712136, India</span>
          </div>

          <div className="text-zinc-400">
            Engineered with React, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
