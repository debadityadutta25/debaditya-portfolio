import React, { useState, useEffect } from 'react';
import {
  Database,
  Terminal,
  Award,
  Cpu,
  Layers,
  FolderGit2,
  Mail,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playSound, getAudioMuted, setAudioMuted } from '../../utils/soundEffects';

interface PortfolioNavbarProps {
  onOpenStudio?: () => void;
}

export const PortfolioNavbar: React.FC<PortfolioNavbarProps> = ({ onOpenStudio }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMutedState] = useState(getAudioMuted());
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'pipeline', 'skills', 'certifications', 'projects', 'terminal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setAudioMuted(nextState);
    setIsMutedState(nextState);
    if (!nextState) {
      playSound('success');
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Overview', icon: Database },
    { id: 'pipeline', label: 'Live Pipeline', icon: Cpu },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'certifications', label: 'Certifications (9)', icon: Award },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    playSound('tab');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl shadow-cyan-950/20 py-3'
          : 'bg-zinc-950/40 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => scrollTo('hero')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm tracking-wider">
                DD
              </span>
            </div>
            {/* Pulsing online status indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                Data Engineer
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono hidden md:block">
              Databricks • Snowflake • PySpark • HVR
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Enable futuristic audio effects' : 'Mute audio effects'}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Launch DataInsight Studio modal button */}
          {onOpenStudio && (
            <button
              onClick={() => {
                playSound('success');
                onOpenStudio();
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Live Studio Demo</span>
            </button>
          )}

          {/* Connect / Hire Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/30'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {onOpenStudio && (
              <button
                onClick={() => {
                  playSound('success');
                  setMobileMenuOpen(false);
                  onOpenStudio();
                }}
                className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 mt-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Open DataInsight Studio Demo</span>
              </button>
            )}

            <div className="pt-3 border-t border-zinc-800/80 mt-2 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Open for Opportunities</span>
              </span>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center space-x-1 text-cyan-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
