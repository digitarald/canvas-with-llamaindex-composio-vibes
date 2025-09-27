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

export type CardType = "project" | "entity" | "note" | "chart" | "investor" | "update" | "feedback" | "milestone";

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

export interface InvestorData {
  field1: string; // contact info (name, email, phone)
  field2: string; // investment stage (select: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B+' | 'Angel')
  field3: string; // communication preferences
  field4: ChecklistItem[]; // engagement tracking
  field4_id: number; // id counter
}

export interface UpdateData {
  field1: string; // update content (textarea)
  field2: string; // update type (select: 'Weekly' | 'Monthly' | 'Quarterly' | 'Ad-hoc')
  field3: string; // date (YYYY-MM-DD)
  field4: ChartMetric[]; // key metrics/highlights
  field4_id: number; // id counter
}

export interface FeedbackData {
  field1: string; // feedback content (textarea)
  field2: string; // priority (select: 'High' | 'Medium' | 'Low')
  field3: string; // deadline date (YYYY-MM-DD)
  field4: ChecklistItem[]; // action items
  field4_id: number; // id counter
}

export interface MilestoneData {
  field1: string; // milestone description
  field2: string; // milestone type (select: 'Fundraising' | 'Product' | 'Revenue' | 'Team' | 'Other')
  field3: string; // target date (YYYY-MM-DD)
  field4: ChartMetric[]; // dependencies/progress metrics
  field4_id: number; // id counter
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | InvestorData | UpdateData | FeedbackData | MilestoneData;

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




