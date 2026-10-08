import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Flame,
  Zap,
  Database,
  Cloud,
  Workflow,
  HardDrive,
  Code,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

interface SkillsSectionProps {
  onSelectTerminalCommand?: (cmd: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectTerminalCommand }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Big Data & Lakehouse',
    'Data Warehousing',
    'CDC & ETL',
    'Databases & Querying',
    'Cloud & Languages',
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return Flame;
      case 'Zap':
        return Zap;
      case 'Database':
        return Database;
      case 'Cloud':
        return Cloud;
      case 'Workflow':
        return Workflow;
      case 'Layers':
        return Layers;
      case 'HardDrive':
        return HardDrive;
      case 'Code':
        return Code;
      default:
        return Database;
    }
  };

  const handleTestInTerminal = (skillName: string) => {
    playSound('terminal');
    const cmdMap: Record<string, string> = {
      Databricks: 'lakehouse --optimize',
      PySpark: 'pyspark --stream',
      SQL: 'select * from candidates where name="Debaditya";',
      Snowflake: 'snowflake --cluster',
      'Fivetran HVR': 'hvr --status',
      'Informatica PowerCenter': 'informatica --mapping',
      'Oracle Database': 'oracle --explain',
      Python: 'python -c "import pandas, pyspark; print(\'Ready\')"',
      'AWS Fundamentals': 'aws s3 ls s3://production-lakehouse',
    };

    const cmd = cmdMap[skillName] || 'skills';
    if (onSelectTerminalCommand) {
      onSelectTerminalCommand(cmd);
    }
    const terminalEl = document.getElementById('terminal');
    if (terminalEl) {
      terminalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10 border-t border-zinc-900 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE EXPERTISE & PLATFORMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Arsenal & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Enterprise Data Capabilities
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Comprehensive fluency across big data processing, real-time CDC, cloud data warehouses, relational engines, and distributed pipeline infrastructure.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('tab');
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 scale-[1.02]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = getIcon(skill.iconName);
            return (
              <div
                key={skill.name}
                className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Name & Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                        style={{
                          backgroundColor: `${skill.color}15`,
                          color: skill.color,
                          border: `1px solid ${skill.color}40`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {skill.experience}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {skill.category.split(' ')[0]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                    {skill.description}
                  </p>

                  {/* Proficiency Meter */}
                  <div className="mb-5 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Production Mastery</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:border-zinc-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action: Test in CLI */}
                <button
                  onClick={() => handleTestInTerminal(skill.name)}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-cyan-400 transition-all flex items-center justify-between group/btn"
                >
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Run test command in CLI</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Competency Highlights Ribbon */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90 border border-zinc-800 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Modern Cloud Lakehouse</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Expertise in Lakehouse architectures, uniting the ACID reliability of data warehouses with low-cost cloud object storage on Databricks & Snowflake.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero-Downtime CDC</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Log-based CDC replication using Fivetran HVR 6.0 and Oracle LogMiner for instantaneous data availability with minimal source load.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Legacy Modernization</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Refactoring legacy on-premise Informatica PowerCenter & Oracle PL/SQL pipelines into cloud-native ELT, PySpark, and SnowSQL jobs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
