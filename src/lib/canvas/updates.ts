import { ChartData, ProjectData, DealData } from "@/lib/canvas/types";

export function projectAddField4Item(data: ProjectData, text?: string): { next: ProjectData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { id, text: text ?? "", done: false, proposed: false }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function projectSetField4ItemText(data: ProjectData, checklistItemId: string, text: string): ProjectData {
  const next = (data.field4 ?? []).map((item) => (item.id === checklistItemId ? { ...item, text } : item));
  return { ...data, field4: next } as ProjectData;
}

export function projectSetField4ItemDone(data: ProjectData, checklistItemId: string, done: boolean): ProjectData {
  const next = (data.field4 ?? []).map((item) => (item.id === checklistItemId ? { ...item, done } : item));
  return { ...data, field4: next } as ProjectData;
}

export function projectRemoveField4Item(data: ProjectData, checklistItemId: string): ProjectData {
  const next = (data.field4 ?? []).filter((item) => item.id !== checklistItemId);
  return { ...data, field4: next } as ProjectData;
}

export function chartAddField1Metric(data: ChartData, label?: string, value?: number | ""): { next: ChartData; createdId: string } {
  const existing = data.field1 ?? [];
  const nextCount = (data.field1_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const safe: number | "" = typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : value === "" ? "" : 0;
  const next = [...existing, { id, label: label ?? "", value: safe }];
  return { next: { ...data, field1: next, field1_id: nextCount }, createdId: id };
}

export function chartSetField1Label(data: ChartData, index: number, label: string): ChartData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], label };
    return { ...data, field1: next } as ChartData;
  }
  return data;
}

export function chartSetField1Value(data: ChartData, index: number, value: number | ""): ChartData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    if (value === "") {
      next[index] = { ...next[index], value: "" };
    } else {
      const clamped = Math.max(0, Math.min(100, value));
      next[index] = { ...next[index], value: clamped };
    }
    return { ...data, field1: next } as ChartData;
  }
  return data;
}

export function chartRemoveField1Metric(data: ChartData, index: number): ChartData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field1: next } as ChartData;
  }
  return data;
}

// Deal update functions
export function dealAddField4Touchpoint(data: DealData, type: string, description?: string): { next: DealData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    type: type || "email", 
    description: description ?? "", 
    date: new Date().toISOString().split('T')[0]
  }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function dealSetField4TouchpointType(data: DealData, touchpointId: string, type: string): DealData {
  const next = (data.field4 ?? []).map((item) => (item.id === touchpointId ? { ...item, type } : item));
  return { ...data, field4: next } as DealData;
}

export function dealSetField4TouchpointDescription(data: DealData, touchpointId: string, description: string): DealData {
  const next = (data.field4 ?? []).map((item) => (item.id === touchpointId ? { ...item, description } : item));
  return { ...data, field4: next } as DealData;
}

export function dealRemoveField4Touchpoint(data: DealData, touchpointId: string): DealData {
  const next = (data.field4 ?? []).filter((item) => item.id !== touchpointId);
  return { ...data, field4: next } as DealData;
}

export function dealAddField6Action(data: DealData, action: string, priority?: string): { next: DealData; createdId: string } {
  const existing = data.field6 ?? [];
  const nextCount = (data.field6_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    action: action || "", 
    priority: (priority as "high" | "medium" | "low") || "medium"
  }];
  return { next: { ...data, field6: next, field6_id: nextCount }, createdId: id };
}

export function dealSetField6ActionText(data: DealData, actionId: string, action: string): DealData {
  const next = (data.field6 ?? []).map((item) => (item.id === actionId ? { ...item, action } : item));
  return { ...data, field6: next } as DealData;
}

export function dealSetField6ActionPriority(data: DealData, actionId: string, priority: "high" | "medium" | "low"): DealData {
  const next = (data.field6 ?? []).map((item) => (item.id === actionId ? { ...item, priority } : item));
  return { ...data, field6: next } as DealData;
}

export function dealRemoveField6Action(data: DealData, actionId: string): DealData {
  const next = (data.field6 ?? []).filter((item) => item.id !== actionId);
  return { ...data, field6: next } as DealData;
}

export function dealAddField7Competitor(data: DealData, name: string, threat?: string): { next: DealData; createdId: string } {
  const existing = data.field7 ?? [];
  const nextCount = (data.field7_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name || "", 
    threat: (threat as "high" | "medium" | "low") || "medium"
  }];
  return { next: { ...data, field7: next, field7_id: nextCount }, createdId: id };
}

export function dealSetField7CompetitorName(data: DealData, competitorId: string, name: string): DealData {
  const next = (data.field7 ?? []).map((item) => (item.id === competitorId ? { ...item, name } : item));
  return { ...data, field7: next } as DealData;
}

export function dealSetField7CompetitorThreat(data: DealData, competitorId: string, threat: "high" | "medium" | "low"): DealData {
  const next = (data.field7 ?? []).map((item) => (item.id === competitorId ? { ...item, threat } : item));
  return { ...data, field7: next } as DealData;
}

export function dealRemoveField7Competitor(data: DealData, competitorId: string): DealData {
  const next = (data.field7 ?? []).filter((item) => item.id !== competitorId);
  return { ...data, field7: next } as DealData;
}




