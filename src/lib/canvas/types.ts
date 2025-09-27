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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number; // 0-100 percentage
}

export interface RiskFactor {
  id: string;
  type: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export type CardType = "project" | "entity" | "note" | "chart" | "sprint";

export interface ProjectData {
  field1: string; // text
  field2: string; // select
  field3: string; // date
  field4: ChecklistItem[]; // checklist
  field4_id: number; // id counter
  field5: number; // health score (0-100)
  field6: RiskFactor[]; // risk factors
  field6_id: number; // risk id counter
  field7: SuggestedAction[]; // suggested actions
  field7_id: number; // action id counter
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

export interface SprintData {
  field1: string; // sprint name/title
  field2: string; // status (Planning, Active, Review, Complete)
  field3: string; // target completion date
  field4: TeamMember[]; // team member assignments
  field4_id: number; // team member id counter
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | SprintData;

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




