import { ChartData, ProjectData, KPIData, ProcessData, CapacityData, IntegrationData, AlertData } from "@/lib/canvas/types";

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

// KPI Card functions
export function kpiAddField1Metric(data: KPIData, name?: string, value?: number | "", unit?: string, source?: string): { next: KPIData; createdId: string } {
  const existing = data.field1 ?? [];
  const nextCount = (data.field1_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    value: value ?? "", 
    unit: unit ?? "", 
    trend: "" as const,
    source: source ?? ""
  }];
  return { next: { ...data, field1: next, field1_id: nextCount }, createdId: id };
}

export function kpiSetField1MetricValue(data: KPIData, index: number, value: number | ""): KPIData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], value };
    return { ...data, field1: next } as KPIData;
  }
  return data;
}

export function kpiSetField1MetricTrend(data: KPIData, index: number, trend: "up" | "down" | "stable" | ""): KPIData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], trend };
    return { ...data, field1: next } as KPIData;
  }
  return data;
}

export function kpiRemoveField1Metric(data: KPIData, index: number): KPIData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field1: next } as KPIData;
  }
  return data;
}

// Process Card functions
export function processAddField2Step(data: ProcessData, name?: string): { next: ProcessData; createdId: string } {
  const existing = data.field2 ?? [];
  const nextCount = (data.field2_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    status: "pending" as const
  }];
  return { next: { ...data, field2: next, field2_id: nextCount }, createdId: id };
}

export function processSetField2StepStatus(data: ProcessData, stepId: string, status: "pending" | "in_progress" | "completed" | "blocked"): ProcessData {
  const next = (data.field2 ?? []).map((step) => (step.id === stepId ? { ...step, status } : step));
  return { ...data, field2: next } as ProcessData;
}

export function processRemoveField2Step(data: ProcessData, stepId: string): ProcessData {
  const next = (data.field2 ?? []).filter((step) => step.id !== stepId);
  return { ...data, field2: next } as ProcessData;
}

// Capacity Card functions
export function capacityAddField1Member(data: CapacityData, name?: string, role?: string): { next: CapacityData; createdId: string } {
  const existing = data.field1 ?? [];
  const nextCount = (data.field1_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    role: role ?? "",
    capacity: 100,
    workload: 0,
    skills: []
  }];
  return { next: { ...data, field1: next, field1_id: nextCount }, createdId: id };
}

export function capacitySetField1MemberWorkload(data: CapacityData, index: number, workload: number): CapacityData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    const clamped = Math.max(0, Math.min(100, workload));
    next[index] = { ...next[index], workload: clamped };
    return { ...data, field1: next } as CapacityData;
  }
  return data;
}

export function capacityRemoveField1Member(data: CapacityData, index: number): CapacityData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field1: next } as CapacityData;
  }
  return data;
}

// Integration Card functions
export function integrationAddField1Status(data: IntegrationData, name?: string): { next: IntegrationData; createdId: string } {
  const existing = data.field1 ?? [];
  const nextCount = (data.field1_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    status: "disconnected" as const,
    errorCount: 0,
    dataHealth: 100
  }];
  return { next: { ...data, field1: next, field1_id: nextCount }, createdId: id };
}

export function integrationSetField1Status(data: IntegrationData, index: number, status: "connected" | "error" | "syncing" | "disconnected"): IntegrationData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], status };
    return { ...data, field1: next } as IntegrationData;
  }
  return data;
}

export function integrationRemoveField1Status(data: IntegrationData, index: number): IntegrationData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field1: next } as IntegrationData;
  }
  return data;
}

// Alert Card functions
export function alertAddField1Rule(data: AlertData, name?: string): { next: AlertData; createdId: string } {
  const existing = data.field1 ?? [];
  const nextCount = (data.field1_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { 
    id, 
    name: name ?? "", 
    condition: "",
    threshold: 0,
    status: "active" as const,
    priority: "medium" as const,
    action: ""
  }];
  return { next: { ...data, field1: next, field1_id: nextCount }, createdId: id };
}

export function alertSetField1RuleStatus(data: AlertData, index: number, status: "active" | "triggered" | "resolved" | "disabled"): AlertData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], status };
    return { ...data, field1: next } as AlertData;
  }
  return data;
}

export function alertRemoveField1Rule(data: AlertData, index: number): AlertData {
  const next = [...(data.field1 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field1: next } as AlertData;
  }
  return data;
}




