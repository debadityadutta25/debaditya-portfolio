import React from 'react';
import { Award, ShieldCheck, Calendar, Flame, Cloud, Workflow, Database } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/portfolioData';

export const CompactCertifications: React.FC = () => {
  const getIssuerIcon = (issuer: string) => {
    switch (issuer) {
      case 'Databricks':
        return <Flame className="w-4 h-4 text-red-500" />;
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

  return (
    <section id="certifications" className="py-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header with scaled typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono mb-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>ACCREDITED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Badges (9)
          </h2>
        </div>
        <span className="text-xs sm:text-sm font-mono text-zinc-400">100% Industry Verified</span>
      </div>

      {/* 9 Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between backdrop-blur-md"
          >
            <div>
              {/* Card Header: Issuer & Date */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-mono font-bold text-zinc-200">
                  {getIssuerIcon(cert.issuer)}
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Title with larger text */}
              <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug mb-3">
                {cert.title}
              </h3>
            </div>

            {/* Competency Chips */}
            <div className="pt-3 border-t border-zinc-900 flex flex-wrap gap-1.5">
              {cert.skillsCovered.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
