import { ChartData, ProjectData, SprintData, TeamMember, RiskFactor, SuggestedAction } from "@/lib/canvas/types";

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

// Sprint update functions
export function sprintAddField4TeamMember(data: SprintData, name?: string, role?: string, capacity?: number): { next: SprintData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    role: role ?? "", 
    capacity: capacity ?? 100 
  }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function sprintSetField4TeamMember(data: SprintData, memberId: string, updates: Partial<TeamMember>): SprintData {
  const next = (data.field4 ?? []).map((member) => 
    member.id === memberId ? { ...member, ...updates } : member
  );
  return { ...data, field4: next } as SprintData;
}

export function sprintRemoveField4TeamMember(data: SprintData, memberId: string): SprintData {
  const next = (data.field4 ?? []).filter((member) => member.id !== memberId);
  return { ...data, field4: next } as SprintData;
}

// Project risk factor functions
export function projectAddField6RiskFactor(data: ProjectData, type?: string, description?: string, severity?: "low" | "medium" | "high" | "critical"): { next: ProjectData; createdId: string } {
  const existing = data.field6 ?? [];
  const nextCount = (data.field6_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    type: type ?? "General", 
    description: description ?? "", 
    severity: severity ?? "medium" 
  }];
  return { next: { ...data, field6: next, field6_id: nextCount }, createdId: id };
}

export function projectRemoveField6RiskFactor(data: ProjectData, riskId: string): ProjectData {
  const next = (data.field6 ?? []).filter((risk) => risk.id !== riskId);
  return { ...data, field6: next } as ProjectData;
}

// Project suggested action functions
export function projectAddField7SuggestedAction(data: ProjectData, title?: string, description?: string, priority?: "low" | "medium" | "high"): { next: ProjectData; createdId: string } {
  const existing = data.field7 ?? [];
  const nextCount = (data.field7_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    title: title ?? "", 
    description: description ?? "", 
    priority: priority ?? "medium" 
  }];
  return { next: { ...data, field7: next, field7_id: nextCount }, createdId: id };
}

export function projectRemoveField7SuggestedAction(data: ProjectData, actionId: string): ProjectData {
  const next = (data.field7 ?? []).filter((action) => action.id !== actionId);
  return { ...data, field7: next } as ProjectData;
}




