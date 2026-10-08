import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  Maximize2,
  Copy,
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, CERTIFICATIONS_DATA } from '../../data/portfolioData';
import { playSound } from '../../utils/soundEffects';

interface TerminalEntry {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

interface InteractiveTerminalProps {
  initialCommand?: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ initialCommand }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: 'output',
      content: `Debaditya Dutta [Data Engineering CLI Engine v2.5]
Type 'help' to see available commands, or click any quick command chip below.`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (initialCommand) {
      executeCommand(initialCommand);
    }
  }, [initialCommand]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    playSound('terminal');

    // Add user input to terminal
    const newHistory: TerminalEntry[] = [
      ...history,
      { type: 'input', content: `debaditya@pipeline:~$ ${trimmed}` },
    ];

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      newHistory.push({
        type: 'output',
        content: `Available Commands:
  • skills       - Display categorized technical skill matrix
  • certs        - List all 9 official enterprise certifications & badges
  • pyspark      - Execute a sample distributed PySpark transformation job
  • sql          - Execute an analytical SQL window query
  • contact      - View contact coordinates, email, phone & LinkedIn
  • vcard        - Download Debaditya's vCard contact file
  • whoami       - View engineering profile & background summary
  • clear        - Clear the terminal console buffer`,
      });
    } else if (lower === 'skills' || lower.startsWith('skill')) {
      const skillsTable = SKILLS_DATA.map(
        (s) => `  [${s.level}%] ${s.name.padEnd(24)} -> ${s.tags.slice(0, 3).join(', ')}`
      ).join('\n');
      newHistory.push({
        type: 'success',
        content: `TECHNICAL SKILLS INVENTORY (9 CORE ENTERPRISE PLATFORMS):\n${skillsTable}`,
      });
    } else if (lower === 'certs' || lower === 'certifications') {
      const certsList = CERTIFICATIONS_DATA.map(
        (c, idx) => `  ${idx + 1}. [${c.issuer}] ${c.title} (${c.date})`
      ).join('\n');
      newHistory.push({
        type: 'success',
        content: `OFFICIAL CERTIFICATIONS & BADGES (9 TOTAL):\n${certsList}`,
      });
    } else if (lower.includes('pyspark') || lower.includes('spark')) {
      newHistory.push({
        type: 'output',
        content: `>>> from pyspark.sql import SparkSession
>>> from pyspark.sql.functions import col, window, sum
>>> spark = SparkSession.builder.appName("DebadityaPipeline").getOrCreate()
>>> df = spark.read.format("delta").load("/lakehouse/silver/orders")
>>> df.groupBy("region").agg(sum("revenue").alias("total_rev")).show(3)

+----------+--------------+
|    region|     total_rev|
+----------+--------------+
|     APAC | 42,910,240.00|
|    EMEA  | 38,120,500.00|
|       NA | 89,450,110.00|
+----------+--------------+
Stage completed: 8 executors, 0 shuffle spills, 185ms execution time.`,
      });
    } else if (lower.includes('sql') || lower.includes('select')) {
      newHistory.push({
        type: 'output',
        content: `SQL Query Execution Result:
SELECT candidate_name, role, location, status
FROM candidates
WHERE skills IN ('Databricks', 'Snowflake', 'PySpark', 'HVR')
LIMIT 1;

----------------------------------------------------------------------
| candidate_name  | role               | location     | status       |
|-----------------|--------------------|--------------|--------------|
| Debaditya Dutta | Lead Data Engineer | WB, India    | AVAILABLE    |
----------------------------------------------------------------------
1 row returned in 0.042 seconds.`,
      });
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'success',
        content: `CANDIDATE CONTACT DETAILS:
  • Name:     ${PERSONAL_INFO.name}
  • Email:    ${PERSONAL_INFO.email}
  • Phone:    ${PERSONAL_INFO.phone}
  • Location: ${PERSONAL_INFO.location}
  • LinkedIn: ${PERSONAL_INFO.linkedIn}
  • Status:   Ready for exciting Data Engineering opportunities.`,
      });
    } else if (lower === 'whoami' || lower === 'about') {
      newHistory.push({
        type: 'output',
        content: `${PERSONAL_INFO.aboutSummary}`,
      });
    } else if (lower === 'vcard' || lower === 'download') {
      // Trigger download
      const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PERSONAL_INFO.name}
TITLE:${PERSONAL_INFO.role}
EMAIL;TYPE=INTERNET:${PERSONAL_INFO.email}
TEL;TYPE=CELL:${PERSONAL_INFO.phone}
ADR;TYPE=HOME:;;West Bengal;Pin- 712136;India
URL:${PERSONAL_INFO.linkedIn}
NOTE:Specializing in Databricks, Snowflake, PySpark, Fivetran HVR, Oracle Database
END:VCARD`;

      const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Debaditya_Dutta_Contact.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      newHistory.push({
        type: 'success',
        content: `[SUCCESS] Debaditya_Dutta_Contact.vcf downloaded. Ready to import into contacts!`,
      });
    } else if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    } else {
      newHistory.push({
        type: 'error',
        content: `command not found: "${trimmed}". Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const presetChips = [
    { label: 'skills', cmd: 'skills' },
    { label: 'certs (9)', cmd: 'certs' },
    { label: 'pyspark demo', cmd: 'pyspark' },
    { label: 'sql query', cmd: 'sql' },
    { label: 'contact', cmd: 'contact' },
    { label: 'download vcard', cmd: 'vcard' },
    { label: 'help', cmd: 'help' },
  ];

  return (
    <section id="terminal" className="py-20 relative z-10 border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE CLI PROMPT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Data Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Interactive Terminal Shell
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2">
            Try interactive CLI commands or click preset pills to inspect real-time outputs.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-black border border-zinc-800 shadow-2xl overflow-hidden font-mono">
          
          {/* Title Bar */}
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-zinc-400 ml-2">debaditya@pipeline-cluster: ~/portfolio</span>
            </div>
            <div className="text-[11px] text-zinc-500">bash • 80x24</div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="px-4 py-2 bg-zinc-950/80 border-b border-zinc-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-zinc-500 mr-1">Quick run:</span>
            {presetChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => executeCommand(chip.cmd)}
                className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-cyan-950/50 hover:text-cyan-400 hover:border-cyan-800/50 border border-zinc-800 text-zinc-300 text-xs transition-all flex items-center space-x-1"
              >
                <span>$ {chip.label}</span>
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 h-[340px] overflow-y-auto space-y-3 cursor-text text-xs leading-relaxed"
          >
            {history.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {item.type === 'input' && (
                  <span className="text-cyan-400 font-semibold">{item.content}</span>
                )}
                {item.type === 'output' && (
                  <span className="text-zinc-300">{item.content}</span>
                )}
                {item.type === 'success' && (
                  <span className="text-emerald-400">{item.content}</span>
                )}
                {item.type === 'error' && (
                  <span className="text-rose-400">{item.content}</span>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-cyan-400 font-semibold select-none">
                debaditya@pipeline:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none caret-cyan-400 text-xs"
                autoFocus
                placeholder="Type 'help' or any command..."
              />
            </div>

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Press Enter to execute • Up/Down arrows for history</span>
            <button
              onClick={() => setHistory([])}
              className="hover:text-zinc-300 underline"
            >
              clear screen
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
