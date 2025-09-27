import { AgentState, CardType, ChartData, EntityData, ItemData, NoteData, ProjectData, TableData, RelationshipData, MigrationData, QueryData } from "@/lib/canvas/types";

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
      return { field1: "" } as NoteData;
    case "chart":
      return { field1: [], field1_id: 0 } as ChartData;
    case "table":
      return {
        field1: "",
        field2: [],
        field2_id: 0,
        field3: [],
        field3_id: 0,
        field4: "",
      } as TableData;
    case "relationship":
      return {
        field1: "",
        field2: "",
        field3: "",
        field4: [],
        field5: [],
        field6: "one-to-many",
        field7: "CASCADE",
        field8: "CASCADE",
      } as RelationshipData;
    case "migration":
      return {
        field1: "",
        field2: new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5),
        field3: [],
        field3_id: 0,
        field4: "pending",
        field5: "",
      } as MigrationData;
    case "query":
      return {
        field1: "",
        field2: "",
        field3: "",
        field4: "SELECT",
        field5: [],
      } as QueryData;
    default:
      return { field1: "" } as NoteData;
  }
}




