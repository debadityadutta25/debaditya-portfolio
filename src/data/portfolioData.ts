export interface SkillItem {
  name: string;
  category: 'Big Data & Lakehouse' | 'Data Warehousing' | 'CDC & ETL' | 'Databases & Querying' | 'Cloud & Languages';
  level: number; // percentage
  experience: string;
  description: string;
  tags: string[];
  color: string;
  iconName: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: 'Databricks' | 'Snowflake' | 'MongoDB' | 'Fivetran' | 'Reltio' | 'AWS';
  date: string;
  year: number;
  type: 'Certification' | 'Badge' | 'Accreditation';
  credentialUrl?: string;
  badgeColor: string;
  skillsCovered: string[];
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  liveDemo?: boolean;
  featured: boolean;
  category: string;
}

export const PERSONAL_INFO = {
  name: "Debaditya Dutta",
  role: "Data Engineer & Cloud Analytics Specialist",
  tagline: "Architecting high-throughput data pipelines, real-time CDC replication, and modern cloud lakehouses.",
  location: "West Bengal, Pin- 712136, India",
  pinCode: "712136",
  phone: "+91 6291622784",
  email: "debadityadutta10@gmail.com",
  linkedIn: "https://www.linkedin.com/in/debaditya-dutta-1295861b5/",
  github: "https://github.com/debadityadutta25",
  aboutSummary: `I am a specialized Data Engineer with hands-on expertise across modern lakehouse architectures, distributed big data processing, enterprise ETL/ELT modernization, and real-time CDC replication. With deep proficiency in Databricks, PySpark, Snowflake, Fivetran HVR, Oracle Database, and Informatica PowerCenter, I design and orchestrate scalable, fault-tolerant, petabyte-scale data pipelines that bridge legacy on-premises databases with modern cloud data platforms.`,
  stats: [
    { label: "Industry Certifications", value: "9+", subtext: "Databricks, Snowflake, AWS, Fivetran, MongoDB, Reltio" },
    { label: "Core Enterprise Tech", value: "9+", subtext: "Databricks, Snowflake, PySpark, Oracle, HVR, Informatica" },
    { label: "Pipeline Reliability", value: "99.9%", subtext: "Production SLA & ACID-compliant lakehouse tables" },
    { label: "Real-time CDC & Streaming", value: "Sub-Sec", subtext: "Log-based replication with zero data loss" },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  {
    name: "Databricks",
    category: "Big Data & Lakehouse",
    level: 95,
    experience: "Lakehouse & Unity Catalog",
    description: "Architecting Medallion (Bronze/Silver/Gold) architectures, Delta Lake optimization, cluster management, Auto Loader, and Databricks Workflows.",
    tags: ["Delta Lake", "Unity Catalog", "Workflows", "Auto Loader", "Cluster Tuning"],
    color: "#FF3621",
    iconName: "Flame",
  },
  {
    name: "PySpark",
    category: "Big Data & Lakehouse",
    level: 92,
    experience: "Distributed Spark Processing",
    description: "Developing scalable distributed data pipelines with Spark DataFrame API, Spark SQL, Structured Streaming, partitioned writes, and skew remediation.",
    tags: ["DataFrame API", "Spark SQL", "Structured Streaming", "Broadcast Joins", "Caching"],
    color: "#E25A1C",
    iconName: "Zap",
  },
  {
    name: "SQL",
    category: "Databases & Querying",
    level: 96,
    experience: "Advanced Analytics & Tuning",
    description: "Mastery over complex window functions, recursive CTEs, query plan execution profiling, index strategies, and multi-dialect query optimization.",
    tags: ["Window Functions", "CTEs", "Query Plan Tuning", "Analytics", "Subqueries"],
    color: "#00758F",
    iconName: "Database",
  },
  {
    name: "Snowflake",
    category: "Data Warehousing",
    level: 90,
    experience: "Cloud Data Warehousing",
    description: "Deploying high-performance cloud warehouses, SnowSQL, Streams & Tasks, Zero-Copy Cloning, Time Travel, dynamic masking, and cost optimization.",
    tags: ["SnowSQL", "Streams & Tasks", "Zero-Copy Clone", "Time Travel", "Virtual Warehouses"],
    color: "#29B5E8",
    iconName: "Cloud",
  },
  {
    name: "Fivetran HVR",
    category: "CDC & ETL",
    level: 94,
    experience: "Real-time High-Volume Replication",
    description: "Implementing distributed log-based Change Data Capture (CDC) replication with zero downtime, channel topologies, LogMiner integrations, and schema evolution.",
    tags: ["Log-based CDC", "Channel Config", "Oracle LogMiner", "Zero-Downtime", "HVR Hub/Agent"],
    color: "#0066FF",
    iconName: "Workflow",
  },
  {
    name: "Informatica PowerCenter",
    category: "CDC & ETL",
    level: 88,
    experience: "Enterprise ETL Workflows",
    description: "Designing enterprise-grade mappings, transformations (Router, Lookup, Joiner, Aggregator), parameter files, workflow monitor debugging, and error handling.",
    tags: ["Mappings", "Workflows", "Transformations", "Parameterization", "Sessions"],
    color: "#FF4D00",
    iconName: "Layers",
  },
  {
    name: "Oracle Database",
    category: "Databases & Querying",
    level: 90,
    experience: "Enterprise RDBMS & PL/SQL",
    description: "Managing enterprise database schemas, PL/SQL stored procedures, triggers, partitioning strategies, materialized views, and explain plan tuning.",
    tags: ["PL/SQL", "Stored Procedures", "Table Partitioning", "Indexes", "Explain Plan"],
    color: "#F80000",
    iconName: "HardDrive",
  },
  {
    name: "Python",
    category: "Cloud & Languages",
    level: 90,
    experience: "Data Engineering & Scripting",
    description: "Writing clean, production-grade scripts for data ingestion, automation, Pandas/NumPy transformations, API consumers, and pipeline test suites.",
    tags: ["Automation", "Pandas", "OOP", "APIs", "Data Validation"],
    color: "#3776AB",
    iconName: "Code",
  },
  {
    name: "AWS Fundamentals",
    category: "Cloud & Languages",
    level: 85,
    experience: "Cloud Infrastructure & Storage",
    description: "Leveraging core AWS data infrastructure including S3 data lakes, IAM security roles, EC2 compute, Lambda triggers, CloudWatch logs, and VPC networking.",
    tags: ["Amazon S3", "IAM", "EC2", "Lambda", "CloudWatch"],
    color: "#FF9900",
    iconName: "Cloud",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Databricks Certified Data Analyst Associate",
    issuer: "Databricks",
    date: "August, 2025",
    year: 2025,
    type: "Certification",
    badgeColor: "#FF3621",
    skillsCovered: ["Databricks SQL", "Dashboards & Visualizations", "Delta Lake Queries", "Data Modeling", "Partner Connect"],
    summary: "Validates proficiency in executing analytical queries on Databricks SQL, building interactive dashboards, and modeling datasets on Delta Lake.",
  },
  {
    id: "cert-2",
    title: "Snowflake Hands-On Data Engineering Badge",
    issuer: "Snowflake",
    date: "April, 2025",
    year: 2025,
    type: "Badge",
    badgeColor: "#29B5E8",
    skillsCovered: ["Data Pipelines", "Continuous Data Loading (Snowpipe)", "Streams & Tasks", "Semi-Structured Data (JSON/VARIANT)"],
    summary: "Hands-on mastery over building robust, automated data engineering pipelines in Snowflake using Snowpipe, Streams, Tasks, and JavaScript/Python UDFs.",
  },
  {
    id: "cert-3",
    title: "Snowflake Hands-On Data Warehousing Badge",
    issuer: "Snowflake",
    date: "April, 2025",
    year: 2025,
    type: "Badge",
    badgeColor: "#29B5E8",
    skillsCovered: ["Multi-Cluster Virtual Warehouses", "Time Travel", "Zero-Copy Cloning", "Data Sharing", "RBAC Security"],
    summary: "Demonstrates practical competence in architecting elastic data warehouses, managing storage/compute decoupling, and securing data with role-based access controls.",
  },
  {
    id: "cert-4",
    title: "MongoDB SI Associate Certification",
    issuer: "MongoDB",
    date: "April, 2025",
    year: 2025,
    type: "Certification",
    badgeColor: "#00ED64",
    skillsCovered: ["Document Modeling", "Aggregation Framework", "Atlas Architecture", "Indexing & Sharding", "Replica Sets"],
    summary: "Certifies knowledge of NoSQL architecture, document data modeling, multi-stage aggregation pipelines, and high-availability database cluster administration.",
  },
  {
    id: "cert-5",
    title: "Fivetran HVR 6.0 Certification",
    issuer: "Fivetran",
    date: "October, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#0066FF",
    skillsCovered: ["HVR 6.0 Hub & Agent Architecture", "Log-based CDC", "High-Volume Replication", "Heterogeneous Sources", "Channel Orchestration"],
    summary: "Comprehensive certification covering high-volume real-time replication, log-based CDC capture engine, channel deployment, and distributed replication topology.",
  },
  {
    id: "cert-6",
    title: "Fivetran Partner Technical Accreditation Certification",
    issuer: "Fivetran",
    date: "September, 2024",
    year: 2024,
    type: "Accreditation",
    badgeColor: "#0066FF",
    skillsCovered: ["Fivetran Core Architecture", "Automated Connectors", "Target Warehouses", "dbt Transformations", "Security & Encryption"],
    summary: "Validates technical proficiency in designing and deploying enterprise automated data integration architectures across diverse cloud sources and destinations.",
  },
  {
    id: "cert-7",
    title: "Reltio Solution Architect Foundation Certification",
    issuer: "Reltio",
    date: "September, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#7B68EE",
    skillsCovered: ["Master Data Management (MDM)", "Entity Resolution", "Data Clean Rooms", "Reltio Connected Data Platform", "Graph Relationships"],
    summary: "Validates core architectural concepts of modern cloud-native Master Data Management (MDM), real-time entity resolution, match/merge rules, and operational analytics.",
  },
  {
    id: "cert-8",
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "August, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#FF3621",
    skillsCovered: ["Apache Spark", "Delta Lake", "Databricks CLI & REST API", "Delta Live Tables", "Production Pipelines"],
    summary: "Recognizes foundational skills in building end-to-end data pipelines using Apache Spark, Delta Lake ACID transactions, and Lakehouse best practices.",
  },
  {
    id: "cert-9",
    title: "AWS Cloud Practitioner Certification",
    issuer: "AWS",
    date: "May, 2023",
    year: 2023,
    type: "Certification",
    badgeColor: "#FF9900",
    skillsCovered: ["AWS Cloud Architecture", "Security & Compliance (IAM)", "Core Services (S3, EC2, RDS)", "Cloud Economics & Pricing", "Billing Models"],
    summary: "Official Amazon Web Services certification proving fundamental fluency with the AWS cloud platform, shared responsibility security model, and cloud economics.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-1",
    title: "DataInsight Studio",
    subtitle: "100% Client-Side AI Data Profiler, SQL & PySpark Code Generator",
    description: "An offline-first browser analytical platform built with React, TypeScript, and Tailwind CSS. Uploads CSV, Excel (.xlsx/.xls), or JSON to compute deep distribution statistics, missingness rates, and generate production-grade ANSI/Snowflake/PostgreSQL SQL and PySpark DataFrame code with zero cloud upload.",
    architecture: ["Client-side Web Workers", "In-Memory Parsing (PapaParse/XLSX)", "AST Query Compiler", "PySpark Generator Engine"],
    metrics: [
      { label: "Data Privacy", value: "100% Client-Side" },
      { label: "SQL Dialects", value: "6 Supported" },
      { label: "Execution Time", value: "<150ms Instant" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "PySpark", "SQL", "Data Profiling"],
    liveDemo: true,
    featured: true,
    category: "Developer Tooling",
  },
  {
    id: "project-2",
    title: "High-Volume Real-Time CDC Pipeline",
    subtitle: "Heterogeneous Oracle to Snowflake & Databricks Delta Lake Replication",
    description: "Engineered a low-latency, log-based Change Data Capture (CDC) replication topology using Fivetran HVR. Captured transactional changes from mission-critical Oracle DB instances via LogMiner with sub-second replication latency into Snowflake and Databricks Delta Lake without impacting source OLTP workloads.",
    architecture: ["Oracle LogMiner", "Fivetran HVR 6.0 Hub & Agent", "Snowflake Target Warehouse", "Databricks Delta Lake"],
    metrics: [
      { label: "Latency", value: "< 2 Seconds" },
      { label: "Data Loss", value: "Zero (ACID CDC)" },
      { label: "Throughput", value: "50K+ Events/sec" },
    ],
    tags: ["Fivetran HVR", "Oracle Database", "Snowflake", "Databricks", "CDC", "LogMiner"],
    featured: true,
    category: "Real-Time Streaming",
  },
  {
    id: "project-3",
    title: "Enterprise Medallion Architecture Lakehouse",
    subtitle: "Automated Bronze -> Silver -> Gold Pipelines with PySpark & Delta Lake",
    description: "Architected a scalable Medallion Lakehouse on Databricks powered by PySpark. Ingests raw batch and streaming data into Bronze (raw append-only), enforces data schemas and de-duplication in Silver (cleaned & enriched), and serves aggregated business metrics into Gold with time-travel and Z-Order indexing.",
    architecture: ["Databricks Auto Loader", "PySpark DataFrame API", "Delta Lake ACID Engine", "Databricks Workflows"],
    metrics: [
      { label: "Query Speedup", value: "4.5x with Z-Order" },
      { label: "Data Quality", value: "100% Schema-Enforced" },
      { label: "Job Orchestration", value: "Automated Workflows" },
    ],
    tags: ["PySpark", "Databricks", "Delta Lake", "Python", "SQL", "Medallion"],
    featured: true,
    category: "Lakehouse Architecture",
  },
  {
    id: "project-4",
    title: "Legacy Informatica to Cloud ELT Modernization",
    subtitle: "Migration from On-Prem PowerCenter to AWS S3 & Snowflake Cloud Data Platform",
    description: "Modernized legacy on-premise Informatica PowerCenter ETL workflows into scalable cloud ELT pipelines. Converted row-by-row server-bound transformations into set-based Snowflake SQL and orchestrated data staging through Amazon S3 with automated error auditing.",
    architecture: ["Informatica PowerCenter", "Amazon S3 Staging", "Snowflake SnowSQL", "Python Audit Automation"],
    metrics: [
      { label: "Batch Window Reduction", value: "65% Faster" },
      { label: "Infrastructure Cost", value: "40% Savings" },
      { label: "Pipeline Reliability", value: "Zero Failures SLA" },
    ],
    tags: ["Informatica", "Snowflake", "AWS S3", "SQL", "ETL to ELT Migration"],
    featured: false,
    category: "Cloud Migration",
  },
];
