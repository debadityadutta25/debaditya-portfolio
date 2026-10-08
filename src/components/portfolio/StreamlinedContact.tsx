import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
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
NOTE:Databricks, PySpark, SQL, Bitbucket, PyCharm Data Engineer
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
      
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left: Headline & Bio */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get in Touch with Debaditya
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-lg">
              Available for Data Engineering opportunities focusing on Databricks, PySpark, SQL, and enterprise pipelines.
            </p>

            <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono mt-3">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-mono text-xs transition-all flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-all flex items-center space-x-2"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={downloadVCard}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs transition-all flex items-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Save Contact</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
