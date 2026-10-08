import React from 'react';
import { FolderGit2, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

export const ConciseProjects: React.FC = () => {
  return (
    <section id="projects" className="py-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION IMPLEMENTATIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Featured Engineering Architectures
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          High-throughput lakehouses, version-controlled PySpark pipelines, and low-latency CDC replication.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h3 className="font-bold text-white text-base sm:text-lg">
                {proj.title}
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                {proj.subtitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {proj.description}
            </p>

            {/* Key Outcomes */}
            <div className="space-y-1.5 mb-4">
              {proj.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-3 border-t border-zinc-900 flex flex-wrap gap-1.5">
              {proj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
