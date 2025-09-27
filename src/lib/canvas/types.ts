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

export type CardType = "project" | "entity" | "note" | "chart" | "research-topic" | "insight";

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
  field2?: string; // source attribution and credibility scoring
  field3?: string[]; // annotation tags (themes, relevance, sentiment)
  field4?: string[]; // AI-suggested cross-references and connections
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

export interface ResearchTopicData {
  field1: string; // research question/hypothesis
  field2: string; // research status (Scoping, Data Collection, Analysis, Synthesis, Complete)
  field3: string; // target completion date
  field4: string[]; // data sources (array of connected APIs and databases)
  field5: string; // key findings (AI-generated insights updated in real-time)
  field6: string; // confidence level (AI assessment of data quality and completeness)
  field7: string[]; // related topics (automatically discovered connections)
}

export interface InsightData {
  field1: string; // insight statement/conclusion
  field2: string; // evidence strength (Weak, Moderate, Strong, Conclusive)
  field3: string[]; // supporting data points (array of source references)
  field4: string; // counterarguments or limitations
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | ResearchTopicData | InsightData;

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




