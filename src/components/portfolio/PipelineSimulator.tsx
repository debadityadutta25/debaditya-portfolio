import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  Layers,
  Database,
  Cloud,
  Workflow,
  HardDrive,
  Cpu,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code2,
  Clock,
  Zap,
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface PipelineStage {
  id: string;
  name: string;
  tech: string;
  category: string;
  icon: any;
  color: string;
  bgLight: string;
  status: 'idle' | 'active' | 'complete';
  latency: string;
  throughput: string;
  description: string;
  codeSnippet: string;
  keyFeatures: string[];
}

export const PipelineSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>('stage-3'); // default Databricks/PySpark
  const [recordsCount, setRecordsCount] = useState(124800);
  const [currentSpeed, setCurrentSpeed] = useState(14500);
  const [latencyMs, setLatencyMs] = useState(84);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Topology verified: Oracle DB -> Fivetran HVR -> Databricks Delta -> PySpark -> Snowflake',
    '[READY] Click "Run Live Simulation" to stream data packets through the architecture.',
  ]);

  const stages: PipelineStage[] = [
    {
      id: 'stage-1',
      name: 'Source OLTP RDBMS',
      tech: 'Oracle Database',
      category: 'Source Systems',
      icon: HardDrive,
      color: '#f43f5e',
      bgLight: 'rgba(244, 63, 94, 0.1)',
      status: isRunning && currentStepIndex >= 0 ? 'active' : 'idle',
      latency: '< 1ms',
      throughput: '35,000 tx/sec',
      description: 'High-volume enterprise transactional system recording customer orders, financial ledgers, and inventory mutations.',
      codeSnippet: `-- Oracle Database Transaction Trigger / LogMiner Mode
ALTER TABLE orders ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
SELECT scn, timestamp, operation, sql_redo 
FROM v$logmnr_contents 
WHERE table_name = 'ORDERS' AND seg_owner = 'PROD';`,
      keyFeatures: ['Supplemental Logging', 'PL/SQL Triggers', 'Partitioned Indexes', 'ACID Transactions'],
    },
    {
      id: 'stage-2',
      name: 'Real-Time CDC Replication',
      tech: 'Fivetran HVR & Informatica',
      category: 'Data Ingestion',
      icon: Workflow,
      color: '#0284c7',
      bgLight: 'rgba(2, 132, 199, 0.1)',
      status: isRunning && currentStepIndex >= 1 ? 'active' : 'idle',
      latency: '1.2 sec',
      throughput: '48,000 events/sec',
      description: 'Low-impact log-based Change Data Capture (CDC). Captures committed transaction logs from Oracle without querying the production tables directly.',
      codeSnippet: `# Fivetran HVR Channel Definition
hvr -r loc_oracle -t loc_delta_lake \\
    -A Capture_Method=LOG_MINER \\
    -A Slice_Condition="MOD(order_id, 4)" \\
    -C Integration_Frequency=CONTINUOUS`,
      keyFeatures: ['Log-based CDC', 'Zero Downtime', 'Schema Drift Handling', 'End-to-End Encryption'],
    },
    {
      id: 'stage-3',
      name: 'Lakehouse & Medallion Storage',
      tech: 'Databricks Delta Lake & AWS S3',
      category: 'Lakehouse Engine',
      icon: Layers,
      color: '#f97316',
      bgLight: 'rgba(249, 115, 22, 0.1)',
      status: isRunning && currentStepIndex >= 2 ? 'active' : 'idle',
      latency: '150 ms',
      throughput: '120,000 rows/sec',
      description: 'Unified storage combining ACID transactional guarantees with low-cost cloud object storage. Organizes data into Bronze (raw ingestion) and Silver (deduplicated).',
      codeSnippet: `-- Databricks Delta Lake Table Optimization
OPTIMIZE delta.\`/mnt/lakehouse/silver/orders\`
ZORDER BY (customer_id, order_timestamp);

-- Time Travel Audit Query
SELECT * FROM orders VERSION AS OF 42;`,
      keyFeatures: ['ACID Transactions', 'Time Travel', 'Z-Order Clustering', 'Auto Loader Ingestion'],
    },
    {
      id: 'stage-4',
      name: 'Distributed Processing Engine',
      tech: 'PySpark & Spark SQL',
      category: 'Transformation',
      icon: Zap,
      color: '#eab308',
      bgLight: 'rgba(234, 179, 8, 0.1)',
      status: isRunning && currentStepIndex >= 3 ? 'active' : 'idle',
      latency: '240 ms',
      throughput: '95,000 rows/sec',
      description: 'Distributed transformation cluster computing complex aggregations, joining streaming CDC feeds with dimension master records, and enforcing quality schemas.',
      codeSnippet: `# PySpark Structured Streaming Transformation
orders_df = spark.readStream.format("delta") \\
    .table("bronze_orders") \\
    .filter("status IS NOT NULL") \\
    .groupBy(window("order_time", "1 hour"), "region") \\
    .agg(sum("amount").alias("hourly_revenue"))

query = orders_df.writeStream.format("delta") \\
    .outputMode("complete") \\
    .table("gold_hourly_kpis")`,
      keyFeatures: ['DataFrame API', 'Watermarking', 'Broadcast Joins', 'Fault-Tolerant Checkpoints'],
    },
    {
      id: 'stage-5',
      name: 'Cloud Data Warehouse & BI',
      tech: 'Snowflake Cloud DW',
      category: 'Serving & Analytics',
      icon: Cloud,
      color: '#06b6d4',
      bgLight: 'rgba(6, 182, 212, 0.1)',
      status: isRunning && currentStepIndex >= 4 ? 'active' : 'idle',
      latency: '45 ms',
      throughput: 'Sub-second queries',
      description: 'Decoupled compute and storage enterprise warehouse serving curated Gold data marts, executive dashboards, and ML features with zero-copy clones.',
      codeSnippet: `-- Snowflake Dynamic Stream & Task Automation
CREATE OR REPLACE TASK refresh_revenue_marts_task
  WAREHOUSE = 'ANALYTICS_WH'
  SCHEDULE = '1 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('orders_cdc_stream')
AS
  MERGE INTO gold_sales_target t
  USING orders_cdc_stream s ON t.id = s.id
  WHEN MATCHED THEN UPDATE SET t.revenue = s.amount;`,
      keyFeatures: ['Zero-Copy Cloning', 'Virtual Warehouses', 'SnowSQL & Tasks', 'Role-Based Access Control'],
    },
  ];

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRecordsCount((prev) => prev + Math.floor(Math.random() * 450 + 200));
        setCurrentSpeed(Math.floor(14000 + Math.random() * 3000));
        setLatencyMs(Math.floor(65 + Math.random() * 35));

        setCurrentStepIndex((prev) => {
          const next = (prev + 1) % 5;
          const stageNames = ['Oracle DB', 'Fivetran HVR', 'Databricks Delta', 'PySpark Cluster', 'Snowflake DW'];
          const actions = [
            `[CDC] Captured 2,800 change records from Oracle redo logs.`,
            `[HVR] Streaming compressed micro-batches via TLS 1.3 to AWS S3.`,
            `[DELTA] Appended batches to Bronze Delta Lake; ACID commit #1042 verified.`,
            `[PYSPARK] SparkSession executed windowed join in 180ms across 8 executor nodes.`,
            `[SNOWFLAKE] Zero-copy stream processed into Gold analytics mart. Ready for BI.`,
          ];

          setLogs((prevLogs) => [
            `[${new Date().toLocaleTimeString()}] ${stageNames[next]}: ${actions[next]}`,
            ...prevLogs.slice(0, 10),
          ]);

          return next;
        });
      }, 1400);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleSimulation = () => {
    playSound('pipeline');
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    playSound('click');
    setIsRunning(false);
    setCurrentStepIndex(0);
    setRecordsCount(124800);
    setLogs([
      '[RESET] Simulation reset to initial state.',
      '[READY] Ready to stream live data packets.',
    ]);
  };

  const selectedStage = stages.find((s) => s.id === activeStageId) || stages[2];

  return (
    <section id="pipeline" className="py-20 relative z-10 border-t border-zinc-900 bg-zinc-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>INTERACTIVE ARCHITECTURE LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Data Pipeline <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                End-to-End Live Simulator
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Experience Debaditya's real-world pipeline design: from mission-critical Oracle transactional databases, through Fivetran HVR real-time CDC, into Databricks Medallion lakehouse, transformed by PySpark, and served on Snowflake.
            </p>
          </div>

          {/* Simulation Controls */}
          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <button
              onClick={toggleSimulation}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Run Live Simulation</span>
                </>
              )}
            </button>

            <button
              onClick={resetSimulation}
              title="Reset simulation counters"
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
              <span>EVENTS INGESTED</span>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
            </div>
            <div className="text-2xl font-mono font-bold text-white mt-1">
              {recordsCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
              +100% Zero-Loss Delivery
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
              <span>LIVE THROUGHPUT</span>
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-yellow-400 mt-1">
              {isRunning ? `${currentSpeed.toLocaleString()} r/s` : 'Standby'}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              PySpark Distributed Workers
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
              <span>END-TO-END LATENCY</span>
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
              {isRunning ? `${latencyMs} ms` : '< 2.0 s'}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Real-time LogMiner Stream
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
              <span>ACTIVE STACK</span>
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-indigo-300 mt-1 truncate">
              {isRunning ? stages[currentStepIndex].tech.split('&')[0] : 'Ready'}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Stage {currentStepIndex + 1} of 5
            </div>
          </div>
        </div>

        {/* Pipeline Architecture Flow Nodes */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStageId === stage.id;
              const isCurrentStep = isRunning && currentStepIndex === idx;

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    playSound('click');
                    setActiveStageId(stage.id);
                  }}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-900/90 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] scale-[1.02]'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                  } ${isCurrentStep ? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]' : ''}`}
                >
                  {/* Step pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold">
                      STAGE 0{idx + 1}
                    </span>
                    {isCurrentStep && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-1.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: stage.bgLight, color: stage.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-white text-sm tracking-tight leading-snug">
                      {stage.name}
                    </div>
                    <div className="text-xs font-mono text-cyan-400 truncate">
                      {stage.tech}
                    </div>
                  </div>

                  {/* Latency info */}
                  <div className="mt-4 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>Latency:</span>
                    <span className="text-zinc-200">{stage.latency}</span>
                  </div>

                  {/* Flow connector line on large screens */}
                  {idx < stages.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className={`w-3 h-0.5 ${isRunning ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-800'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive & Terminal Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Stage Details & Code Viewer */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-xl">
            <div className="flex items-start justify-between pb-4 border-b border-zinc-800 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  {selectedStage.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 flex items-center space-x-2">
                  <span>{selectedStage.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-normal">
                    {selectedStage.tech}
                  </span>
                </h3>
              </div>
              <div className="text-right font-mono text-xs text-zinc-400">
                <div>Throughput: <span className="text-emerald-400">{selectedStage.throughput}</span></div>
                <div>Latency: <span className="text-cyan-400">{selectedStage.latency}</span></div>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              {selectedStage.description}
            </p>

            {/* Key Architectural Features */}
            <div className="mb-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Architectural Capabilities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedStage.keyFeatures.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center space-x-1 text-xs font-mono px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Code / Configuration Snippet */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production Code / Pipeline DDL</span>
                </span>
                <span className="text-[10px] text-zinc-500">Live Architecture Spec</span>
              </div>
              <pre className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                <code>{selectedStage.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Real-Time Pipeline Stream Log Console */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                    CDC & Spark Execution Stream
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
                  <span className="text-[10px] font-mono text-zinc-400">
                    {isRunning ? 'STREAMING' : 'IDLE'}
                  </span>
                </div>
              </div>

              {/* Streaming Logs */}
              <div className="space-y-2 h-[260px] overflow-y-auto pr-1 font-mono text-[11px] text-zinc-300">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded bg-zinc-900/60 border border-zinc-800/50 leading-relaxed transition-all ${
                      index === 0 ? 'text-cyan-300 border-cyan-800/60 bg-cyan-950/20' : 'text-zinc-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Cluster State: Healthy (0 errors)</span>
              <button
                onClick={() => setLogs(['[LOGS CLEARED] Stream listening...'])}
                className="text-zinc-500 hover:text-zinc-300 underline"
              >
                Clear logs
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
