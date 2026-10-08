import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Subtitles,
  Check,
  Copy,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Flame,
  Zap,
  Database,
  Code2,
  FolderGit2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

export const YouTubeHeroScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(148);

  // Simulated YouTube playback counter
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 600 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

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
NOTE:Specializing in Databricks, PySpark, SQL, Bitbucket, PyCharm
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
    <section className="pt-24 pb-10 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* YouTube Player Card Container */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        
        {/* Top YouTube Player Window Bar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {/* YouTube Red Icon Badge */}
            <div className="w-7 h-5 rounded-md bg-red-600 flex items-center justify-center shadow-md shadow-red-600/30">
              <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
            </div>
            <span className="font-bold text-white text-xs tracking-tight">YouTube Player</span>
            <span className="text-zinc-600">•</span>
            <span className="hidden sm:inline-block text-[11px] text-zinc-400 font-mono truncate max-w-md">
              Debaditya Dutta • Data Engineer Portfolio Spotlight
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-600/40 text-red-400 text-[10px] font-mono font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>LIVE</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">1080p60 HD</span>
          </div>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[480px] bg-black overflow-hidden flex items-center justify-center group select-none">
          
          {/* Background Blurred Ambient Backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110"
            style={{ backgroundImage: `url(${PERSONAL_INFO.profileImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

          {/* Profile Picture (Centered Actor) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-gradient-to-tr from-red-600 via-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-500">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top rounded-full ring-4 ring-black"
                onError={(e) => {
                  // Fallback avatar if local image not found
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                }}
              />

              {/* Pulsing "ON AIR" / Status Badge */}
              <div className="absolute bottom-1 right-3 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold font-mono shadow-lg flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>ON AIR</span>
              </div>
            </div>

            {/* Overlaid Headline on the screen */}
            <div className="mt-3 text-center">
              <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight drop-shadow-md">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold tracking-wider drop-shadow-md mt-0.5">
                Databricks • PySpark • SQL • Bitbucket • PyCharm
              </div>
            </div>
          </div>

          {/* Interactive Play/Pause Button Overlay on Screen */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause video" : "Play video"}
            className="absolute z-20 w-14 h-14 rounded-full bg-black/60 hover:bg-red-600/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl opacity-80 hover:opacity-100"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          {/* YouTube Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 pb-2 px-3 sm:px-4">
            
            {/* Red Scrubber Bar */}
            <div className="relative w-full h-1 bg-white/20 hover:h-1.5 rounded-full cursor-pointer transition-all mb-2">
              <div
                className="h-full bg-red-600 rounded-full relative"
                style={{ width: `${(seconds / 600) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-white text-xs">
              
              {/* Left Controls: Play, Volume, Time */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-red-500 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-red-500 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="font-mono text-[11px] text-zinc-300">
                  <span>{formatTime(seconds)}</span>
                  <span className="text-zinc-500"> / </span>
                  <span>10:00</span>
                </div>
              </div>

              {/* Right Controls: Subtitles, Settings, Fullscreen */}
              <div className="flex items-center space-x-2.5 text-zinc-300">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">
                  CC
                </span>
                <Settings className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                <Maximize className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
              </div>

            </div>

          </div>

        </div>

        {/* Video Channel Info & Contact Bar (Below the player) */}
        <div className="p-4 sm:p-6 bg-zinc-950 border-t border-zinc-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Channel Details */}
            <div className="flex items-center space-x-3.5">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-red-600"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                }}
              />

              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="font-bold text-white text-base sm:text-lg">
                    {PERSONAL_INFO.name}
                  </h1>
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black" title="Verified Data Engineer">
                    ✓
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Data Engineer • 9 Industry Certifications • West Bengal, India
                </div>
              </div>
            </div>

            {/* YouTube Style Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedKey === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 ml-1" />
                )}
              </button>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedKey === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 ml-1" />
                )}
              </button>

              <button
                onClick={downloadVCard}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono transition-all"
                title="Download contact vCard"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Save Contact</span>
              </button>
            </div>

          </div>

          {/* Quick Location & Availability Ribbon */}
          <div className="mt-4 pt-3.5 border-t border-zinc-900 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-mono gap-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Location: {PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Status: Open for Data Engineering Opportunities</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
