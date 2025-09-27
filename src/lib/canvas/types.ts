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

export type CardType = "project" | "entity" | "note" | "chart" | "business-metric" | "automation-rule";

export interface ProjectData {
  field1: string; // text
  field2: string; // select
  field3: string; // date
  field4: ChecklistItem[]; // checklist
  field4_id: number; // id counter
  field5?: string; // ROI calculation (actual vs. projected)
  field6?: string; // Resource allocation (time, money, tools)
  field7?: string; // Success metrics and KPI tracking
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

export interface BusinessMetricData {
  field1: string; // Metric name (Revenue, CAC, LTV, Conversion Rate, etc.)
  field2: string; // Current value with trend indicators
  field3: string; // Target/goal value
  field4: string; // Data sources (connected platforms feeding this metric)
  field5: string; // AI insights (pattern analysis and recommendations)
  field6: string; // Automated actions (triggered based on thresholds)
}

export interface AutomationRuleData {
  field1: string; // Rule name and trigger conditions
  field2: string; // Status (Active, Paused, Testing)
  field3: string; // Actions to execute (email campaigns, inventory orders, etc.)
  field4: string; // Success rate and performance metrics
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | BusinessMetricData | AutomationRuleData;

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




