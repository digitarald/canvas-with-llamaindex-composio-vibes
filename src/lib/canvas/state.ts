import { AgentState, CardType, ChartData, EntityData, ItemData, NoteData, ProjectData, ResearchTopicData, InsightData } from "@/lib/canvas/types";

export const initialState: AgentState = {
  items: [],
  globalTitle: "",
  globalDescription: "",
  lastAction: "",
  itemsCreated: 0,
  syncSheetId: "",
};

export function isNonEmptyAgentState(value: unknown): value is AgentState {
  if (value == null || typeof value !== "object") return false;
  const keys = Object.keys(value as Record<string, unknown>);
  return keys.length > 0;
}

export function defaultDataFor(type: CardType): ItemData {
  switch (type) {
    case "project":
      return {
        field1: "",
        field2: "",
        field3: "",
        field4: [],
        field4_id: 0,
      } as ProjectData;
    case "entity":
      return {
        field1: "",
        field2: "",
        field3: [],
        field3_options: ["Tag 1", "Tag 2", "Tag 3"],
      } as EntityData;
    case "note":
      return { 
        field1: "", 
        field2: "", 
        field3: [], 
        field4: [] 
      } as NoteData;
    case "chart":
      return { field1: [], field1_id: 0 } as ChartData;
    case "research-topic":
      return {
        field1: "", // research question/hypothesis
        field2: "Scoping", // research status
        field3: "", // target completion date
        field4: [], // data sources
        field5: "", // key findings
        field6: "Low", // confidence level
        field7: [], // related topics
      } as ResearchTopicData;
    case "insight":
      return {
        field1: "", // insight statement/conclusion
        field2: "Weak", // evidence strength
        field3: [], // supporting data points
        field4: "", // counterarguments or limitations
      } as InsightData;
    default:
      return { field1: "" } as NoteData;
  }
}




