import React, { useState, useEffect } from 'react';
import {
  Database,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Copy,
  Check,
  Terminal,
  Activity,
  Layers,
  Zap,
  Flame,
  Cloud,
  Workflow,
  Download,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

interface HeroSectionProps {
  onOpenStudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenStudio }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const rotatingTitles = [
    "Modern Cloud Data Engineer",
    "Databricks & PySpark Specialist",
    "Snowflake Cloud DW Architect",
    "Real-Time CDC Engineer (Fivetran HVR)",
    "Enterprise ETL & Oracle Tuning Pro",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  const copyToClipboard = (text: string, type: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const downloadVCard = () => {
    playSound('success');
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PERSONAL_INFO.name}
TITLE:${PERSONAL_INFO.role}
EMAIL;TYPE=INTERNET:${PERSONAL_INFO.email}
TEL;TYPE=CELL:${PERSONAL_INFO.phone}
ADR;TYPE=HOME:;;West Bengal;Pin- 712136;India
URL:${PERSONAL_INFO.linkedIn}
NOTE:Specializing in Databricks, Snowflake, PySpark, Fivetran HVR, Oracle Database, AWS
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Debaditya_Dutta_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollTo = (id: string) => {
    playSound('tab');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Availability Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">AVAILABLE FOR DATA ENGINEERING ROLES</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Modern Lakehouse & Pipeline Architect</span>
              </p>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </div>

            {/* Rotating Title Banner */}
            <div className="h-10 flex items-center">
              <div className="font-mono text-lg sm:text-2xl font-bold text-zinc-200 flex items-center space-x-3">
                <span className="text-cyan-500">{'>'}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 transition-all duration-300">
                  {rotatingTitles[typewriterIndex]}
                </span>
                <span className="w-2.5 h-6 bg-cyan-400 inline-block animate-pulse" />
              </div>
            </div>

            {/* Summary Text */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              Specializing in high-throughput distributed data systems with{' '}
              <strong className="text-cyan-400 font-semibold">Databricks</strong> &{' '}
              <strong className="text-orange-400 font-semibold">PySpark</strong>, low-latency real-time CDC replication with{' '}
              <strong className="text-blue-400 font-semibold">Fivetran HVR</strong>, and enterprise cloud data warehousing on{' '}
              <strong className="text-sky-300 font-semibold">Snowflake</strong> &{' '}
              <strong className="text-amber-400 font-semibold">AWS</strong>. 
              Bridging on-premise RDBMS like <strong className="text-red-400 font-semibold">Oracle</strong> and <strong className="text-orange-300 font-semibold">Informatica</strong> with next-gen cloud architectures.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('pipeline')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Activity className="w-4 h-4" />
                <span>Simulate Live Pipeline</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => scrollTo('certifications')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-sm transition-all hover:border-cyan-500/50"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View 9 Certifications</span>
              </button>

              {onOpenStudio && (
                <button
                  onClick={() => {
                    playSound('success');
                    onOpenStudio();
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 font-semibold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Launch Studio Demo</span>
                </button>
              )}

              <button
                onClick={downloadVCard}
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-sm font-medium transition-all"
                title="Download contact vCard (.vcf) for Google / Apple Contacts"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Save Contact</span>
              </button>
            </div>

            {/* Quick Contact Chips with 1-Click Copy */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2.5">
              {/* Email */}
              <div
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="group flex items-center space-x-2 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-zinc-300">{PERSONAL_INFO.email}</span>
                {copiedType === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                )}
              </div>

              {/* Phone */}
              <div
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="group flex items-center space-x-2 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 cursor-pointer transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-zinc-300">{PERSONAL_INFO.phone}</span>
                {copiedType === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                )}
              </div>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="group flex items-center space-x-2 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-950/20 cursor-pointer transition-all"
              >
                <LinkedInIcon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-zinc-300">LinkedIn Profile</span>
                <span className="text-xs text-blue-400">↗</span>
              </a>
            </div>

            {copiedType && (
              <div className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5 animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                <span>Copied {copiedType} to clipboard!</span>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Tech Stack Hub & Stats Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Glassmorphic Core Metrics Card */}
            <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Core Engineering Metrics
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  LIVE STATUS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PERSONAL_INFO.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-cyan-500/30 transition-all hover:bg-zinc-950"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-zinc-200 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5 font-mono line-clamp-1">
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pulse Bar */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80">
                <div className="text-xs text-zinc-400 font-mono mb-2.5 flex items-center justify-between">
                  <span>ENTERPRISE PLATFORMS</span>
                  <span className="text-cyan-400 font-semibold">9 STACKS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: "Databricks", color: "bg-red-950 text-red-300 border-red-800" },
                    { name: "Snowflake", color: "bg-sky-950 text-sky-300 border-sky-800" },
                    { name: "PySpark", color: "bg-orange-950 text-orange-300 border-orange-800" },
                    { name: "Fivetran HVR", color: "bg-blue-950 text-blue-300 border-blue-800" },
                    { name: "Oracle DB", color: "bg-rose-950 text-rose-300 border-rose-800" },
                    { name: "Informatica", color: "bg-amber-950 text-amber-300 border-amber-800" },
                    { name: "SQL", color: "bg-teal-950 text-teal-300 border-teal-800" },
                    { name: "Python", color: "bg-indigo-950 text-indigo-300 border-indigo-800" },
                    { name: "AWS", color: "bg-yellow-950 text-yellow-300 border-yellow-800" },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${tech.color} shadow-sm`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Interactive Mini Console Prompt */}
            <div
              onClick={() => scrollTo('terminal')}
              className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-4 font-mono text-xs text-zinc-400 cursor-pointer hover:border-cyan-500/40 hover:bg-zinc-900 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
                <span className="text-zinc-300">
                  <span className="text-cyan-400">debaditya@pipeline:~$</span> type 'help' or explore CLI
                </span>
              </div>
              <span className="text-[11px] text-cyan-400 font-semibold group-hover:underline flex items-center space-x-1">
                <span>Launch CLI</span>
                <span>→</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
