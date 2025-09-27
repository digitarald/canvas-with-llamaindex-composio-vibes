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

export type CardType = "project" | "entity" | "note" | "chart" | "objective" | "key-result" | "scenario" | "initiative" | "risk";

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

export interface ObjectiveData {
  field1: string; // description (text)
  field2: string; // priority (select: High | Medium | Low)
  field3: string; // deadline date (YYYY-MM-DD)
  field4: ChecklistItem[]; // key results checklist
  field4_id: number; // id counter
}

export interface KeyResultData {
  field1: ChartMetric[]; // progress trend data (reusing chart field structure)
  field1_id: number; // id counter
  field2: string; // description (text)
  field3: string; // unit (select: Number | Percentage | Currency | Boolean)
  field4: string; // current vs target (text: "25 / 100")
}

export interface ScenarioData {
  field1: string; // description (textarea)
  field2: string; // probability (select: High | Medium | Low)
  field3: string[]; // impact areas (tags)
  field3_options: string[]; // available impact areas
}

export interface InitiativeData {
  field1: string; // description (text)
  field2: string; // status (select: Planning | In Progress | Completed | On Hold)
  field3: string; // timeline estimate (text)
  field4: ChecklistItem[]; // tasks/milestones checklist
  field4_id: number; // id counter
}

export interface RiskData {
  field1: string; // description (text)
  field2: string; // severity (select: Critical | High | Medium | Low)
  field3: string; // mitigation strategy (textarea)
  field4: ChecklistItem[]; // monitoring triggers checklist
  field4_id: number; // id counter
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | ObjectiveData | KeyResultData | ScenarioData | InitiativeData | RiskData;

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




