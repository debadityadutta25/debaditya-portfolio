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
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ACCREDITED CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Certifications & Badges (9)
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-400">100% Industry Verified</span>
      </div>

      {/* 9 Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Issuer & Date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-zinc-200">
                  {getIssuerIcon(cert.issuer)}
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-mono text-zinc-500">
                  <Calendar className="w-3 h-3" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-white text-xs sm:text-sm leading-snug mb-2.5">
                {cert.title}
              </h3>
            </div>

            {/* Competency Chips */}
            <div className="pt-2.5 border-t border-zinc-900 flex flex-wrap gap-1">
              {cert.skillsCovered.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
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
