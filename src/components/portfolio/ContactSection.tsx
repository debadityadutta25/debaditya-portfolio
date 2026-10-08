import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  Download,
  Sparkles,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z"/>
  </svg>
);

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text: string, key: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');

    // Generate formatted mailto URI
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
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
NOTE:Databricks Certified Data Analyst & Data Engineer | Snowflake | PySpark | Fivetran HVR | Oracle | AWS
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
    <section id="contact" className="py-20 relative z-10 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Resilient <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Data Systems Together
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Interested in discussing modern lakehouse architectures, real-time CDC, or data engineering roles? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl hover:border-cyan-500/40 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">EMAIL ADDRESS</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors font-mono"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:text-cyan-400 hover:border-cyan-500/40 text-zinc-400 transition-all"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">PHONE NUMBER</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors font-mono"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  title="Copy phone number to clipboard"
                  className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:text-emerald-400 hover:border-emerald-500/40 text-zinc-400 transition-all"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl hover:border-blue-500/40 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <LinkedInIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">LINKEDIN PROFILE</div>
                  <a
                    href={PERSONAL_INFO.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-blue-400 transition-colors font-mono flex items-center space-x-1"
                  >
                    <span>/in/debaditya-dutta-1295861b5</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-blue-400 hover:border-blue-500/40 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl hover:border-purple-500/40 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">LOCATION & POSTAL CODE</div>
                  <div className="text-sm font-semibold text-white font-mono">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                IST (UTC+5:30)
              </span>
            </div>

            {/* Save vCard Button */}
            <button
              onClick={downloadVCard}
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-cyan-500/40 text-zinc-200 text-xs font-mono font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Contact Card (.vcf)</span>
            </button>

          </div>

          {/* Right Column: Direct Inquiry Message Form */}
          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-8 backdrop-blur-xl">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  placeholder="Data Engineering Opportunity / Consulting"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Debaditya, we'd like to talk about our upcoming lakehouse and CDC project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email Client</span>
              </button>

              {isSent && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center animate-fadeIn">
                  ✓ Email client opened! Looking forward to connecting with you.
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
