import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  ArrowRight,
  Code2,
  Cpu,
  Zap,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

interface ProjectsSectionProps {
  onOpenStudio?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenStudio }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Developer Tooling', 'Real-Time Streaming', 'Lakehouse Architecture', 'Cloud Migration'];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    return selectedFilter === 'All' || proj.category === selectedFilter;
  });

  return (
    <section id="projects" className="py-20 relative z-10 border-t border-zinc-900 bg-black/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>PRODUCTION IMPLEMENTATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                Architectures & Projects
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Real-world systems delivering scalable, low-latency, and reliable enterprise data platforms from transactional capture to distributed analytics.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5">
            {filters.map((fil) => (
              <button
                key={fil}
                onClick={() => {
                  playSound('tab');
                  setSelectedFilter(fil);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedFilter === fil
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {fil}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900/90 hover:shadow-2xl hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 font-semibold">
                    {project.category}
                  </span>

                  {project.liveDemo && (
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      <span>Live App Ready</span>
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight mb-1.5">
                  {project.title}
                </h3>
                <h4 className="text-xs font-mono text-zinc-400 mb-4">
                  {project.subtitle}
                </h4>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Architecture Pipeline Stack */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Architecture Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.architecture.map((arch) => (
                      <span
                        key={arch}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center space-x-1"
                      >
                        <Layers className="w-3 h-3 text-cyan-400" />
                        <span>{arch}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs font-mono font-bold text-cyan-400 truncate">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.liveDemo && onOpenStudio && (
                  <button
                    onClick={() => {
                      playSound('success');
                      onOpenStudio();
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105"
                  >
                    <span>Launch Live App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
