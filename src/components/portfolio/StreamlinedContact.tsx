import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, ExternalLink, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

export const StreamlinedContact: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
NOTE:Databricks, PySpark, SQL, Bitbucket, PyCharm, Informatica Data Engineer
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
    <section id="contact" className="py-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Left: Headline & Bio */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Get in Touch with Debaditya
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-lg leading-relaxed">
              Available for Data Engineering opportunities focusing on Databricks, PySpark, SQL, Bitbucket, PyCharm, and enterprise pipelines.
            </p>

            <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-zinc-300 font-mono mt-4">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Right: Action Buttons with scaled sizes */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm font-mono transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-sm font-semibold transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-blue-600/25 hover:scale-105"
            >
              <LinkedInIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={downloadVCard}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-sm transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Save Contact</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
