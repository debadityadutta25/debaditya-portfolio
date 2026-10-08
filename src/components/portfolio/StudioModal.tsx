import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  BarChart3,
  Database,
  Flame,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  DatasetStats,
  FileMetadata,
  QueryState,
  SelectedColumn,
  SQLDialect,
  SparkConfig,
} from '../../types';
import {
  parseCsvContent,
  parseExcelBuffer,
  parseJsonContent,
  parseUploadedFile,
} from '../../utils/fileParser';
import { computeDatasetStats } from '../../utils/statistics';
import { SAMPLE_DATASETS, SampleDataset } from '../../utils/sampleData';
import { FileUploader } from '../FileUploader';
import { StatsDashboard } from '../StatsDashboard';
import { SQLViewer } from '../SQLViewer';
import { PySparkViewer } from '../PySparkViewer';
import { playSound } from '../../utils/soundEffects';

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveTab = 'stats' | 'sql' | 'pyspark';

export const StudioModal: React.FC<StudioModalProps> = ({ isOpen, onClose }) => {
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('stats');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [queryState, setQueryState] = useState<QueryState>({
    selectedColumns: [],
    filters: [],
    groupBy: [],
    orderBy: [],
    limit: 50,
    tableName: 'orders_dataset',
    dialect: 'snowflake',
    sparkConfig: {
      appName: 'DebadityaTransformationJob',
      inputPath: './data/orders_dataset.csv',
      mode: 'dataframe',
      outputAction: 'show',
      outputPath: './output/transformed_data.parquet',
    },
  });

  // Automatically load the E-commerce dataset on first open if empty
  useEffect(() => {
    if (isOpen && !stats && SAMPLE_DATASETS.length > 0) {
      loadSample(SAMPLE_DATASETS[0]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const loadSample = async (sample: SampleDataset) => {
    playSound('tab');
    setIsLoading(true);
    setError(null);

    try {
      let parsed;
      if (sample.type === 'csv') {
        parsed = await parseCsvContent(sample.rawContent, sample.filename);
      } else {
        parsed = parseJsonContent(sample.rawContent, sample.filename);
      }

      const computed = computeDatasetStats(parsed.headers, parsed.rows);
      setMetadata(parsed.metadata);
      setHeaders(parsed.headers);
      setRows(parsed.rows);
      setStats(computed);

      const defaultCols: SelectedColumn[] = parsed.headers.map((h, i) => ({
        id: `col-${i}-${h}`,
        column: h,
        alias: '',
        aggregation: 'NONE',
      }));

      setQueryState((prev) => ({
        ...prev,
        tableName: sample.filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_]/g, '_'),
        selectedColumns: defaultCols,
        groupBy: [],
        filters: [],
        orderBy: [],
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to parse sample dataset');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelected = async (file: File) => {
    playSound('click');
    setIsLoading(true);
    setError(null);

    try {
      const parsed = await parseUploadedFile(file);
      const computed = computeDatasetStats(parsed.headers, parsed.rows);

      setMetadata(parsed.metadata);
      setHeaders(parsed.headers);
      setRows(parsed.rows);
      setStats(computed);

      const defaultCols: SelectedColumn[] = parsed.headers.map((h, i) => ({
        id: `col-${i}-${h}`,
        column: h,
        alias: '',
        aggregation: 'NONE',
      }));

      const safeTableName = parsed.metadata.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_]/g, '_');

      setQueryState((prev) => ({
        ...prev,
        tableName: safeTableName || 'dataset',
        selectedColumns: defaultCols,
        groupBy: [],
        filters: [],
        orderBy: [],
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to process uploaded file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleColumn = (columnName: string) => {
    setQueryState((prev) => {
      const exists = prev.selectedColumns.find((c) => c.column === columnName);
      if (exists) {
        return {
          ...prev,
          selectedColumns: prev.selectedColumns.filter((c) => c.column !== columnName),
        };
      } else {
        const newCol: SelectedColumn = {
          id: `col-${Date.now()}-${columnName}`,
          column: columnName,
          alias: '',
          aggregation: 'NONE',
        };
        return {
          ...prev,
          selectedColumns: [...prev.selectedColumns, newCol],
        };
      }
    });
  };

  const handleSelectAllColumns = (selectAll: boolean) => {
    setQueryState((prev) => {
      if (selectAll) {
        const allCols: SelectedColumn[] = headers.map((h, i) => ({
          id: `col-${i}-${h}`,
          column: h,
          alias: '',
          aggregation: 'NONE',
        }));
        return { ...prev, selectedColumns: allCols };
      } else {
        return { ...prev, selectedColumns: [] };
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-7xl h-[94vh] rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">DataInsight Studio</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                  100% Client-Side Engine
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Interactive project by Debaditya Dutta • Offline Profiling & PySpark/SQL Compiler
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Sample Selector */}
            <div className="hidden md:flex items-center space-x-1.5">
              <span className="text-xs font-mono text-zinc-500">Test dataset:</span>
              {SAMPLE_DATASETS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSample(s)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono"
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        {stats && (
          <div className="px-6 py-2.5 bg-zinc-950 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('stats');
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'stats'
                    ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700/60'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Statistical Profiler</span>
              </button>

              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('sql');
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'sql'
                    ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700/60'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>SQL Engine (6 Dialects)</span>
              </button>

              <button
                onClick={() => {
                  playSound('tab');
                  setActiveTab('pyspark');
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'pyspark'
                    ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700/60'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>PySpark Script Generator</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-zinc-400">
              <span>{metadata?.name}</span>
              <span>•</span>
              <span className="text-cyan-400">{stats.totalRows.toLocaleString()} rows</span>
            </div>
          </div>
        )}

        {/* Studio Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950/60">
          {!stats ? (
            <div className="max-w-2xl mx-auto py-12 space-y-6">
              <FileUploader
                onFileSelected={handleFileSelected}
                onSampleSelected={loadSample}
                isLoading={isLoading}
                error={error}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {activeTab === 'stats' && (
                <StatsDashboard
                  stats={stats}
                  metadata={metadata!}
                  rows={rows}
                  headers={headers}
                  selectedColumns={queryState.selectedColumns}
                  onToggleColumn={handleToggleColumn}
                  onSelectAllColumns={handleSelectAllColumns}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'sql' && (
                <SQLViewer
                  queryState={queryState}
                  columns={stats.columns}
                  onDialectChange={(dialect) =>
                    setQueryState((prev) => ({ ...prev, dialect }))
                  }
                />
              )}

              {activeTab === 'pyspark' && (
                <PySparkViewer
                  queryState={queryState}
                  columns={stats.columns}
                  metadata={metadata!}
                  onChangeSparkConfig={(sparkConfig) =>
                    setQueryState((prev) => ({ ...prev, sparkConfig }))
                  }
                />
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
