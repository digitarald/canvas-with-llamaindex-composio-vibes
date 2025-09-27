import { ChartData, ProjectData, ServiceData, DatabaseData, MessageQueueData, ApiGatewayData, ExternalServiceData, IssueData } from "@/lib/canvas/types";

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

// Service card update functions
export function serviceAddField4Metric(data: ServiceData, label?: string, value?: number | ""): { next: ServiceData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const safe: number | "" = typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : value === "" ? "" : 0;
  const next = [...existing, { id, label: label ?? "", value: safe }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function serviceSetField4Label(data: ServiceData, index: number, label: string): ServiceData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], label };
    return { ...data, field4: next } as ServiceData;
  }
  return data;
}

export function serviceSetField4Value(data: ServiceData, index: number, value: number | ""): ServiceData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    if (value === "") {
      next[index] = { ...next[index], value: "" };
    } else {
      const clamped = Math.max(0, Math.min(100, value));
      next[index] = { ...next[index], value: clamped };
    }
    return { ...data, field4: next } as ServiceData;
  }
  return data;
}

export function serviceRemoveField4Metric(data: ServiceData, index: number): ServiceData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field4: next } as ServiceData;
  }
  return data;
}

// Database card update functions
export function databaseAddField4Metric(data: DatabaseData, label?: string, value?: number | ""): { next: DatabaseData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const safe: number | "" = typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : value === "" ? "" : 0;
  const next = [...existing, { id, label: label ?? "", value: safe }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function databaseSetField4Label(data: DatabaseData, index: number, label: string): DatabaseData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], label };
    return { ...data, field4: next } as DatabaseData;
  }
  return data;
}

export function databaseSetField4Value(data: DatabaseData, index: number, value: number | ""): DatabaseData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    if (value === "") {
      next[index] = { ...next[index], value: "" };
    } else {
      const clamped = Math.max(0, Math.min(100, value));
      next[index] = { ...next[index], value: clamped };
    }
    return { ...data, field4: next } as DatabaseData;
  }
  return data;
}

export function databaseRemoveField4Metric(data: DatabaseData, index: number): DatabaseData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field4: next } as DatabaseData;
  }
  return data;
}

// Issue card update functions (similar to project for checklist field4)
export function issueAddField4Item(data: IssueData, text?: string): { next: IssueData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { id, text: text ?? "", done: false, proposed: false }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function issueSetField4ItemText(data: IssueData, checklistItemId: string, text: string): IssueData {
  const next = (data.field4 ?? []).map((item) => (item.id === checklistItemId ? { ...item, text } : item));
  return { ...data, field4: next } as IssueData;
}

export function issueSetField4ItemDone(data: IssueData, checklistItemId: string, done: boolean): IssueData {
  const next = (data.field4 ?? []).map((item) => (item.id === checklistItemId ? { ...item, done } : item));
  return { ...data, field4: next } as IssueData;
}

export function issueRemoveField4Item(data: IssueData, checklistItemId: string): IssueData {
  const next = (data.field4 ?? []).filter((item) => item.id !== checklistItemId);
  return { ...data, field4: next } as IssueData;
}




