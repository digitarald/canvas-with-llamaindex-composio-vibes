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

export type CardType = "project" | "entity" | "note" | "chart" | "deal";

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
  field4?: number | ""; // engagement score 0-100
  field5?: string; // decision maker influence
  field6?: string; // communication preferences
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

export interface TouchpointItem {
  id: string;
  type: string; // email, call, meeting, etc.
  description: string;
  date: string;
  outcome?: string;
}

export interface ActionItem {
  id: string;
  action: string;
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

export interface CompetitorItem {
  id: string;
  name: string;
  threat: "high" | "medium" | "low";
  notes?: string;
}

export interface DealData {
  field1: string; // deal name/company
  field2: string; // stage: Lead, Qualified, Proposal, Negotiation, Closed-Won, Closed-Lost
  field3: string; // close date (predicted by AI, adjustable by user)
  field4: TouchpointItem[]; // deal activities
  field4_id: number; // id counter
  field5: number | ""; // AI confidence score 0-100
  field6: ActionItem[]; // next best actions
  field6_id: number; // id counter
  field7: CompetitorItem[]; // competitive intelligence
  field7_id: number; // id counter
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | DealData;

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




