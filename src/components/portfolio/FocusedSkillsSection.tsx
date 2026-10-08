import React from 'react';
import {
  Flame,
  Zap,
  Database,
  FolderGit2,
  Code2,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '../../data/portfolioData';

export const FocusedSkillsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Databricks':
        return <Flame className="w-6 h-6 text-red-500" />;
      case 'PySpark':
        return <Zap className="w-6 h-6 text-orange-400" />;
      case 'SQL':
        return <Database className="w-6 h-6 text-sky-400" />;
      case 'Bitbucket':
        return <FolderGit2 className="w-6 h-6 text-blue-400" />;
      case 'PyCharm':
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case 'Informatica PowerCenter':
        return <Layers className="w-6 h-6 text-amber-500" />;
      default:
        return <Database className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Section Header with scaled typography */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono mb-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>CORE ENGINEERING FOCUS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Primary Technical Expertise
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
          Specializing in scalable lakehouse architectures, distributed data engineering, analytical tuning, enterprise ETL, and modern Git/IDE developer workflows.
        </p>
      </div>

      {/* Primary Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {PRIMARY_SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              {/* Header: Icon, Name & Highlight */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform shadow-inner">
                    {getIcon(skill.name)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                      {skill.highlight}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                  {skill.level}%
                </span>
              </div>

              {/* Description with larger text */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                {skill.description}
              </p>
            </div>

            {/* Key Tools Tags */}
            <div className="pt-4 border-t border-zinc-900 flex flex-wrap gap-2">
              {skill.keyTools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Supporting Data Stack Ribbon */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-mono backdrop-blur-md">
        <span className="text-zinc-400 uppercase tracking-wider text-xs font-semibold">
          Supporting Technologies:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {SECONDARY_SKILLS.map((sec) => (
            <span
              key={sec.name}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs sm:text-sm flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{sec.name}</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
