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

export type CardType = "project" | "entity" | "note" | "chart" | "learning-objective" | "learner-profile";

export interface ProjectData {
  field1: string; // text
  field2: string; // select
  field3: string; // date
  field4: ChecklistItem[]; // checklist
  field4_id: number; // id counter
  field5?: number; // engagement score (time spent, interaction quality)
  field6?: string; // difficulty adjustment (AI-recommended complexity level)
  field7?: string[]; // peer collaboration opportunities
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

export interface LearningObjectiveData {
  field1: string; // Learning objective title/description
  field2: string; // Mastery level (Novice, Developing, Proficient, Advanced, Expert)
  field3: string; // Target completion date
  field4: LinkItem[]; // Learning resources (videos, articles, exercises, assessments)
  field4_id: number; // id counter
  field5: string[]; // Prerequisites and dependencies
  field6: number; // Mastery score (AI-calculated based on multiple assessments) 0-100
  field7: string[]; // Adaptive recommendations (next best content/activities)
}

export interface LearnerProfileData {
  field1: string; // Learner name and basic info
  field2: string; // Learning style (Visual, Auditory, Kinesthetic, Reading/Writing)
  field3: ChartMetric[]; // Current skill levels across subjects
  field3_id: number; // id counter
  field4: string; // Learning goals and preferences
  field5: string; // Performance analytics and progress trends
  field6: string[]; // Recommended learning path adjustments
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | LearningObjectiveData | LearnerProfileData;

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




