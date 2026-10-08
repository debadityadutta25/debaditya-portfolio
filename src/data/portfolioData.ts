export interface PrimarySkill {
  name: string;
  category: string;
  level: number;
  highlight: string;
  description: string;
  keyTools: string[];
  color: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: 'Databricks' | 'Snowflake' | 'MongoDB' | 'Fivetran' | 'Reltio' | 'AWS';
  date: string;
  year: number;
  type: 'Certification' | 'Badge' | 'Accreditation';
  badgeColor: string;
  skillsCovered: string[];
}

export const PERSONAL_INFO = {
  name: "Debaditya Dutta",
  title: "Data Engineer",
  tagline: "Databricks • PySpark • SQL • Bitbucket • PyCharm • Informatica",
  location: "West Bengal, Pin- 712136, India",
  phone: "+91 6291622784",
  email: "debadityadutta10@gmail.com",
  linkedIn: "https://www.linkedin.com/in/debaditya-dutta-1295861b5/",
  github: "https://github.com/debadityadutta25",
  profileImage: "./profile.jpg",
  bio: "Results-driven Data Engineer specializing in scalable lakehouse architectures, distributed big data processing with PySpark & Databricks, complex SQL optimization, enterprise ETL mappings in Informatica PowerCenter, and professional software development practices using PyCharm and Bitbucket.",
};

// Prioritizing Databricks, PySpark, SQL, Bitbucket, PyCharm, and Informatica PowerCenter
export const PRIMARY_SKILLS: PrimarySkill[] = [
  {
    name: "Databricks",
    category: "Lakehouse Architecture",
    level: 95,
    highlight: "Medallion Architecture & Delta Lake",
    description: "Designing end-to-end Medallion (Bronze/Silver/Gold) pipelines, Delta Lake tables with ACID compliance, Auto Loader ingestion, Unity Catalog governance, and automated Databricks Workflows.",
    keyTools: ["Delta Lake", "Unity Catalog", "Databricks Workflows", "Auto Loader", "Cluster Optimization"],
    color: "#FF3621",
  },
  {
    name: "PySpark",
    category: "Distributed Big Data Processing",
    level: 94,
    highlight: "DataFrame API & Spark SQL",
    description: "Building resilient distributed data processing jobs using PySpark DataFrame API and Spark SQL. Tuning partition strategies, broadcast joins, caching, and handling skewed data in production clusters.",
    keyTools: ["Spark DataFrames", "Spark SQL", "Structured Streaming", "Broadcast Joins", "Partition Pruning"],
    color: "#E25A1C",
  },
  {
    name: "SQL",
    category: "Data Querying & Analytical Optimization",
    level: 96,
    highlight: "Complex Analytics & Query Tuning",
    description: "Authoring performant queries with analytical window functions, common table expressions (CTEs), multi-table joins, subqueries, and profiling execution plans for high-efficiency querying.",
    keyTools: ["Window Functions", "Recursive CTEs", "Explain Plan Tuning", "Aggregation Engines", "Data Modeling"],
    color: "#0284C7",
  },
  {
    name: "Bitbucket",
    category: "Version Control & CI/CD",
    level: 90,
    highlight: "Git Workflows & Team Collaboration",
    description: "Managing enterprise repositories, feature branch workflows, code reviews via Pull Requests, merge strategies, branching models, and integrating pipeline deployments with Bitbucket Pipelines.",
    keyTools: ["Git Branching", "Pull Requests", "Code Review", "Bitbucket Pipelines", "Merge Conflict Resolution"],
    color: "#2684FF",
  },
  {
    name: "PyCharm",
    category: "Python Development Environment",
    level: 92,
    highlight: "Professional IDE & Debugging",
    description: "Writing robust data engineering code in PyCharm with virtual environment isolation, interactive debugging, code profiling, type annotations, and automated unit testing suites.",
    keyTools: ["Remote Debugging", "Virtual Environments", "Code Profiling", "PyTest Unit Testing", "Refactoring"],
    color: "#21D789",
  },
  {
    name: "Informatica PowerCenter",
    category: "Enterprise ETL & Data Movement",
    level: 92,
    highlight: "Mappings, Workflows & Transformations",
    description: "Designing enterprise-grade ETL mappings, transformations (Router, Lookup, Joiner, Aggregator), parameter files, workflow monitor debugging, session scheduling, and error recovery.",
    keyTools: ["Mappings & Sessions", "Workflows", "Transformations", "Parameterization", "Workflow Monitor"],
    color: "#FF4D00",
  },
];

export const SECONDARY_SKILLS = [
  { name: "Fivetran HVR", role: "Real-time CDC Replication" },
  { name: "Snowflake", role: "Cloud Data Warehousing" },
  { name: "Oracle Database", role: "Enterprise RDBMS & PL/SQL" },
  { name: "Python", role: "Scripting & Automation" },
  { name: "AWS Fundamentals", role: "Cloud Storage & IAM" },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Databricks Certified Data Analyst Associate",
    issuer: "Databricks",
    date: "August, 2025",
    year: 2025,
    type: "Certification",
    badgeColor: "#FF3621",
    skillsCovered: ["Databricks SQL", "Dashboards", "Delta Lake", "Data Modeling"],
  },
  {
    id: "cert-2",
    title: "Snowflake Hands-On Data Engineering Badge",
    issuer: "Snowflake",
    date: "April, 2025",
    year: 2025,
    type: "Badge",
    badgeColor: "#29B5E8",
    skillsCovered: ["Data Pipelines", "Snowpipe", "Streams & Tasks", "VARIANT"],
  },
  {
    id: "cert-3",
    title: "Snowflake Hands-On Data Warehousing Badge",
    issuer: "Snowflake",
    date: "April, 2025",
    year: 2025,
    type: "Badge",
    badgeColor: "#29B5E8",
    skillsCovered: ["Virtual Warehouses", "Time Travel", "Zero-Copy Cloning", "RBAC"],
  },
  {
    id: "cert-4",
    title: "MongoDB SI Associate Certification",
    issuer: "MongoDB",
    date: "April, 2025",
    year: 2025,
    type: "Certification",
    badgeColor: "#00ED64",
    skillsCovered: ["Document Modeling", "Aggregation Framework", "Atlas Architecture"],
  },
  {
    id: "cert-5",
    title: "Fivetran HVR 6.0 Certification",
    issuer: "Fivetran",
    date: "October, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#0066FF",
    skillsCovered: ["HVR 6.0 Hub & Agent", "Log-based CDC", "High-Volume Replication"],
  },
  {
    id: "cert-6",
    title: "Fivetran Partner Technical Accreditation Certification",
    issuer: "Fivetran",
    date: "September, 2024",
    year: 2024,
    type: "Accreditation",
    badgeColor: "#0066FF",
    skillsCovered: ["Automated Connectors", "Target Warehouses", "dbt Transformations"],
  },
  {
    id: "cert-7",
    title: "Reltio Solution Architect Foundation Certification",
    issuer: "Reltio",
    date: "September, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#7B68EE",
    skillsCovered: ["Master Data Management (MDM)", "Entity Resolution", "Data Clean Rooms"],
  },
  {
    id: "cert-8",
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "August, 2024",
    year: 2024,
    type: "Certification",
    badgeColor: "#FF3621",
    skillsCovered: ["Apache Spark", "Delta Lake", "Databricks Workflows", "Production ETL"],
  },
  {
    id: "cert-9",
    title: "AWS Cloud Practitioner Certification",
    issuer: "AWS",
    date: "May, 2023",
    year: 2023,
    type: "Certification",
    badgeColor: "#FF9900",
    skillsCovered: ["AWS Cloud Architecture", "Security & IAM", "S3 Storage & EC2"],
  },
];
