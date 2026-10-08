import React from 'react';
import {
  Flame,
  Zap,
  Database,
  FolderGit2,
  Code2,
  Workflow,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PRIMARY_SKILLS, SECONDARY_SKILLS, PrimarySkill } from '../../data/portfolioData';

export const FocusedSkillsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Databricks':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'PySpark':
        return <Zap className="w-5 h-5 text-orange-400" />;
      case 'SQL':
        return <Database className="w-5 h-5 text-sky-400" />;
      case 'Bitbucket':
        return <FolderGit2 className="w-5 h-5 text-blue-400" />;
      case 'PyCharm':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'Fivetran HVR':
        return <Workflow className="w-5 h-5 text-indigo-400" />;
      default:
        return <Database className="w-5 h-5 text-cyan-400" />;
    }
  };

  const mainPillars = PRIMARY_SKILLS.filter((s) => s.isPrimary);
  const secondaryHvr = PRIMARY_SKILLS.find((s) => !s.isPrimary);

  return (
    <section id="skills" className="py-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CORE ENGINEERING FOCUS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Primary Technical Expertise
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Specializing in scalable lakehouse architectures, distributed data engineering, analytical tuning, and modern Git/IDE developer workflows.
        </p>
      </div>

      {/* 5 Primary Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mainPillars.map((skill) => (
          <div
            key={skill.name}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
          >
            <div>
              {/* Header: Icon, Name & Highlight */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:scale-105 transition-transform"
                  >
                    {getIcon(skill.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <div className="text-[11px] font-mono text-cyan-400 font-medium">
                      {skill.highlight}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {skill.level}%
                </span>
              </div>

              {/* Concise Description */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            {/* Key Tools Tags */}
            <div className="pt-3 border-t border-zinc-900 flex flex-wrap gap-1.5">
              {skill.keyTools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Fivetran HVR (CDC Replication - Present with less focus) */}
        {secondaryHvr && (
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/60 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900 border border-zinc-800">
                    {getIcon(secondaryHvr.name)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-white text-base">
                        {secondaryHvr.name}
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                        CDC
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-400 font-medium">
                      {secondaryHvr.highlight}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                  {secondaryHvr.level}%
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {secondaryHvr.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-900 flex flex-wrap gap-1.5">
              {secondaryHvr.keyTools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Supporting Data Stack Ribbon */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <span className="text-zinc-500 uppercase tracking-wider text-[11px]">
          Supporting Technologies:
        </span>
        <div className="flex flex-wrap gap-2">
          {SECONDARY_SKILLS.map((sec) => (
            <span
              key={sec.name}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-1"
            >
              <CheckCircle2 className="w-3 h-3 text-zinc-500" />
              <span>{sec.name}</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
