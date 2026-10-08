import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

export const RecorderHeroScreen: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [frames, setFrames] = useState(14);
  const [seconds, setSeconds] = useState(38);
  const [minutes, setMinutes] = useState(4);

  // Live Camcorder / Studio Recorder Timecode Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setFrames((prev) => {
        if (prev >= 29) {
          setSeconds((s) => {
            if (s >= 59) {
              setMinutes((m) => m + 1);
              return 0;
            }
            return s + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, []);

  const timecodeString = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PERSONAL_INFO.name}
TITLE:${PERSONAL_INFO.title}
EMAIL;TYPE=INTERNET:${PERSONAL_INFO.email}
TEL;TYPE=CELL:${PERSONAL_INFO.phone}
ADR;TYPE=HOME:;;West Bengal;Pin- 712136;India
URL:${PERSONAL_INFO.linkedIn}
NOTE:Specializing in Databricks, PySpark, SQL, Bitbucket, PyCharm, Informatica
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Debaditya_Dutta.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="pt-24 pb-8 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Studio Recorder Screen Container */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/95 border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Top Recorder Housing Bar */}
        <div className="px-5 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-200">VIEWFINDER // LIVE FEED</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>COLOR: LOG-C</span>
            <span>•</span>
            <span className="text-zinc-300 font-semibold">AF-ON [TRACKING]</span>
          </div>
        </div>

        {/* Viewfinder Screen Area */}
        <div className="relative aspect-[16/10] sm:aspect-[21/10] min-h-[360px] sm:min-h-[440px] bg-black overflow-hidden flex items-center justify-center select-none group">
          
          {/* Ambient Background Glow from Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-110"
            style={{ backgroundImage: `url(${PERSONAL_INFO.profileImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

          {/* Profile Picture Display with Frame */}
          <div className="relative z-10 flex flex-col items-center py-4">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-2xl shadow-cyan-500/20 transition-transform duration-500 hover:scale-105">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top rounded-full ring-4 ring-black"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "./profile.jpg";
                }}
              />
            </div>

            {/* Candidate Title directly inside viewfinder */}
            <div className="mt-4 text-center">
              <h1 className="text-white font-black text-2xl sm:text-3xl md:text-4xl tracking-tight drop-shadow-lg">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-cyan-400 font-mono text-sm sm:text-base font-bold tracking-wide drop-shadow-md mt-1">
                Databricks • PySpark • SQL • Bitbucket • PyCharm • Informatica
              </div>
            </div>
          </div>

          {/* Recorder Viewfinder HUD Overlays */}

          {/* 1. Corner Framing Brackets */}
          <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-white/60 pointer-events-none" />
          <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-white/60 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-white/60 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-white/60 pointer-events-none" />

          {/* 2. Top-Left: Red REC Indicator & Live Timecode */}
          <div className="absolute top-4 left-6 z-20 flex items-center space-x-3 font-mono text-xs sm:text-sm">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>REC</span>
            </div>
            <span className="text-white font-mono tracking-widest font-semibold drop-shadow">
              {timecodeString}
            </span>
          </div>

          {/* 3. Top-Right: Resolution & Battery Status */}
          <div className="absolute top-4 right-6 z-20 flex items-center space-x-3 font-mono text-xs text-zinc-300">
            <span className="px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700/80 font-bold">
              4K 60FPS
            </span>
            <div className="flex items-center space-x-1 text-emerald-400">
              <span className="tracking-tighter font-bold">[▮▮▮▯]</span>
              <span>88%</span>
            </div>
          </div>

          {/* 4. Center Autofocus Reticle [ + ] */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-20 h-20 border border-white/30 rounded-lg flex items-center justify-center">
              <div className="w-2 h-0.5 bg-white/60" />
              <div className="w-0.5 h-2 bg-white/60 absolute" />
            </div>
          </div>

          {/* 5. Bottom-Left: Audio Levels VU Meter */}
          <div className="absolute bottom-4 left-6 z-20 font-mono text-[11px] text-zinc-400 space-y-0.5 hidden sm:block">
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-500">CH1</span>
              <span className="text-emerald-400 font-bold tracking-tighter">▮▮▮▮▮▮▮</span>
              <span className="text-amber-400 font-bold tracking-tighter">▮▮</span>
              <span className="text-zinc-600 tracking-tighter">▯▯</span>
              <span className="text-[10px] text-zinc-500">-12dB</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-500">CH2</span>
              <span className="text-emerald-400 font-bold tracking-tighter">▮▮▮▮▮▮</span>
              <span className="text-zinc-600 tracking-tighter">▯▯▯</span>
              <span className="text-[10px] text-zinc-500">-18dB</span>
            </div>
          </div>

          {/* 6. Bottom-Right: Camera Tech Specs */}
          <div className="absolute bottom-4 right-6 z-20 font-mono text-xs text-zinc-300 hidden sm:flex items-center space-x-2">
            <span>ISO 400</span>
            <span>•</span>
            <span>1/120</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">ProRes RAW</span>
          </div>

        </div>

        {/* Action Controls & Contact Details */}
        <div className="p-5 sm:p-7 bg-zinc-950 border-t border-zinc-800/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Candidate Identity */}
            <div className="flex items-center space-x-4">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-cyan-500 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "./profile.jpg";
                }}
              />

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-white text-lg sm:text-xl">
                    {PERSONAL_INFO.name}
                  </h2>
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black" title="Verified Data Engineer">
                    ✓
                  </span>
                </div>
                <div className="text-sm text-zinc-400 font-mono mt-0.5">
                  Data Engineer • 9 Industry Certifications • West Bengal, India
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-mono transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedKey === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                )}
              </button>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-mono transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedKey === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                )}
              </button>

              <button
                onClick={downloadVCard}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-mono transition-all"
                title="Download contact vCard"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Save Contact</span>
              </button>
            </div>

          </div>

          {/* Location & Availability Status */}
          <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between text-xs sm:text-sm text-zinc-300 font-mono gap-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Location: {PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-emerald-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Status: Open for Data Engineering Opportunities</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
