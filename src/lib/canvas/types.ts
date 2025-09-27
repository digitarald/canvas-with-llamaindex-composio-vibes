export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  proposed: boolean;
}

export interface LinkItem {
  title: string;
  url: string;
}

export type CardType = "project" | "entity" | "note" | "chart" | "kpi" | "process" | "capacity" | "integration" | "alert";

export interface ProjectData {
  field1: string; // text
  field2: string; // select
  field3: string; // date
  field4: ChecklistItem[]; // checklist
  field4_id: number; // id counter
}

export interface EntityData {
  field1: string; // text
  field2: string; // select
  field3: string[]; // tags
  field3_options: string[]; // options
}

export interface NoteData {
  field1?: string; // textarea
}

export interface ChartMetric {
  id: string;
  label: string;
  value: number | ""; // 0..100
}

export interface ChartData {
  field1: ChartMetric[]; // metrics
  field1_id: number; // id counter
}

// KPI Dashboard Card - Real-time metrics aggregation
export interface KPIMetric {
  id: string;
  name: string;
  value: number | "";
  unit: string; // e.g., "$", "%", "users"
  trend: "up" | "down" | "stable" | "";
  target?: number;
  source: string; // e.g., "Stripe", "Google Analytics"
}

export interface KPIData {
  field1: KPIMetric[]; // metrics array
  field1_id: number; // id counter
  field2: string; // time period (daily, weekly, monthly)
  field3: string; // dashboard theme/category
}

// Process Card - Workflow management
export interface ProcessStep {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed" | "blocked";
  assignee?: string;
  duration?: number; // estimated hours
  dependencies?: string[]; // step IDs
}

export interface ProcessData {
  field1: string; // process name/title
  field2: ProcessStep[]; // workflow steps
  field2_id: number; // step id counter
  field3: string; // process type (sales, hiring, product_release, etc.)
  field4: string; // automation status (manual, semi_automated, automated)
}

// Team Capacity Card - Resource allocation tracking
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number; // 0-100 percentage
  workload: number; // current utilization 0-100
  skills: string[];
}

export interface CapacityData {
  field1: TeamMember[]; // team members
  field1_id: number; // member id counter
  field2: string; // team/department name
  field3: string; // time period for planning
  field4: number; // overall team utilization 0-100
}

// Integration Card - Data pipeline status
export interface IntegrationStatus {
  id: string;
  name: string; // tool name (Stripe, Mixpanel, etc.)
  status: "connected" | "error" | "syncing" | "disconnected";
  lastSync?: string; // ISO date string
  errorCount: number;
  dataHealth: number; // 0-100 score
}

export interface IntegrationData {
  field1: IntegrationStatus[]; // integrations
  field1_id: number; // id counter
  field2: string; // sync frequency (realtime, hourly, daily)
  field3: number; // overall system health 0-100
}

// Alert Card - Automated notifications
export interface AlertRule {
  id: string;
  name: string;
  condition: string; // description of alert condition
  threshold: number;
  status: "active" | "triggered" | "resolved" | "disabled";
  priority: "low" | "medium" | "high" | "critical";
  action: string; // prescribed action
}

export interface AlertData {
  field1: AlertRule[]; // alert rules
  field1_id: number; // id counter
  field2: string; // notification channels (slack, email, etc.)
  field3: string; // alert category (performance, capacity, revenue, etc.)
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | KPIData | ProcessData | CapacityData | IntegrationData | AlertData;

export interface Item {
  id: string;
  type: CardType;
  name: string; // editable title
  subtitle: string; // subtitle shown under the title
  data: ItemData;
}

export interface AgentState {
  items: Item[];
  globalTitle: string;
  globalDescription: string;
  lastAction?: string;
  itemsCreated: number;
  syncSheetId?: string; // Google Sheet ID for auto-sync
  syncSheetName?: string; // Google Sheet name that was imported from
}




