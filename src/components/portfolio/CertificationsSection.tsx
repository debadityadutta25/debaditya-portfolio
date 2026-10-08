import React, { useState } from 'react';
import {
  Award,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ExternalLink,
  X,
  Sparkles,
  ChevronRight,
  Flame,
  Cloud,
  Workflow,
  Database,
} from 'lucide-react';
import { CERTIFICATIONS_DATA, CertificationItem } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

export const CertificationsSection: React.FC = () => {
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCertModal, setActiveCertModal] = useState<CertificationItem | null>(null);

  const issuers = ['All', 'Databricks', 'Snowflake', 'Fivetran', 'AWS', 'MongoDB', 'Reltio'];
  const years = ['All', '2025', '2024', '2023'];

  const filteredCerts = CERTIFICATIONS_DATA.filter((cert) => {
    const matchesIssuer = selectedIssuer === 'All' || cert.issuer === selectedIssuer;
    const matchesYear = selectedYear === 'All' || cert.year.toString() === selectedYear;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesIssuer && matchesYear && matchesSearch;
  });

  const getIssuerBadgeIcon = (issuer: string) => {
    switch (issuer) {
      case 'Databricks':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'Snowflake':
        return <Cloud className="w-4 h-4 text-sky-400" />;
      case 'Fivetran':
        return <Workflow className="w-4 h-4 text-blue-400" />;
      case 'MongoDB':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'AWS':
        return <Cloud className="w-4 h-4 text-amber-400" />;
      default:
        return <Award className="w-4 h-4 text-purple-400" />;
    }
  };

  const openCertModal = (cert: CertificationItem) => {
    playSound('tab');
    setActiveCertModal(cert);
  };

  return (
    <section id="certifications" className="py-20 relative z-10 border-t border-zinc-900 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>INDUSTRY CREDENTIALS & ACCREDITATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Certifications & Badges <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                Verified Enterprise Expertise (9)
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Officially certified by industry leaders including Databricks, Snowflake, Fivetran, AWS, MongoDB, and Reltio across data engineering, warehousing, and analytics.
            </p>
          </div>

          {/* Quick Counter Card */}
          <div className="mt-6 md:mt-0 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center">
              <Award className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">9 Verified Badges</div>
              <div className="text-xs text-zinc-400 font-mono">100% Industry Accredited</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certification or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Issuer Filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {issuers.map((iss) => (
              <button
                key={iss}
                onClick={() => {
                  playSound('click');
                  setSelectedIssuer(iss);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedIssuer === iss
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {iss}
              </button>
            ))}
          </div>

          {/* Year Filters */}
          <div className="flex items-center space-x-1 border-l border-zinc-800 pl-3">
            <span className="text-[11px] font-mono text-zinc-500 mr-1 hidden lg:inline">Year:</span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  playSound('click');
                  setSelectedYear(y);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  selectedYear === y
                    ? 'bg-zinc-200 text-black font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => {
            const issuerIcon = getIssuerBadgeIcon(cert.issuer);
            return (
              <div
                key={cert.id}
                onClick={() => openCertModal(cert)}
                className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800/90 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900 hover:scale-[1.01] hover:shadow-2xl hover:shadow-cyan-950/20 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Issuer pill & Date */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                      {issuerIcon}
                      <span className="font-semibold">{cert.issuer}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] font-mono text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2.5">
                    {cert.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                    {cert.summary}
                  </p>

                  {/* Covered Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skillsCovered.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80 text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skillsCovered.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        +{cert.skillsCovered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Link & Verification Tag */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center space-x-1 text-emerald-400 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </span>

                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-0.5 text-[11px]">
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Certification In-Depth View */}
        {activeCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-5">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  playSound('click');
                  setActiveCertModal(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Issuer Ribbon */}
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-white flex items-center space-x-1.5">
                  {getIssuerBadgeIcon(activeCertModal.issuer)}
                  <span>{activeCertModal.issuer}</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeCertModal.type} • {activeCertModal.date}
                </span>
              </div>

              {/* Modal Title */}
              <div>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  {activeCertModal.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeCertModal.summary}
              </p>

              {/* Verified Competencies */}
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                  Verified Technical Competencies
                </div>
                <div className="space-y-1.5">
                  {activeCertModal.skillsCovered.map((skill) => (
                    <div
                      key={skill}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Candidate: Debaditya Dutta</span>
                </span>
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
