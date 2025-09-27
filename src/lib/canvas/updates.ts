import { ChartData, ProjectData, LearningObjectiveData, LearnerProfileData, LinkItem } from "@/lib/canvas/types";

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

// Learning Objective update functions
export function learningObjectiveAddField4Item(data: LearningObjectiveData, title?: string, url?: string): { next: LearningObjectiveData; createdId: string } {
  const existing = data.field4 ?? [];
  const nextCount = (data.field4_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const next = [...existing, { title: title ?? "", url: url ?? "" }];
  return { next: { ...data, field4: next, field4_id: nextCount }, createdId: id };
}

export function learningObjectiveSetField4Item(data: LearningObjectiveData, index: number, title: string, url: string): LearningObjectiveData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { title, url };
    return { ...data, field4: next } as LearningObjectiveData;
  }
  return data;
}

export function learningObjectiveRemoveField4Item(data: LearningObjectiveData, index: number): LearningObjectiveData {
  const next = [...(data.field4 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field4: next } as LearningObjectiveData;
  }
  return data;
}

export function learningObjectiveAddField5Item(data: LearningObjectiveData, prerequisite: string): LearningObjectiveData {
  const existing = data.field5 ?? [];
  if (!existing.includes(prerequisite)) {
    return { ...data, field5: [...existing, prerequisite] };
  }
  return data;
}

export function learningObjectiveRemoveField5Item(data: LearningObjectiveData, prerequisite: string): LearningObjectiveData {
  const next = (data.field5 ?? []).filter(item => item !== prerequisite);
  return { ...data, field5: next };
}

export function learningObjectiveAddField7Item(data: LearningObjectiveData, recommendation: string): LearningObjectiveData {
  const existing = data.field7 ?? [];
  if (!existing.includes(recommendation)) {
    return { ...data, field7: [...existing, recommendation] };
  }
  return data;
}

export function learningObjectiveRemoveField7Item(data: LearningObjectiveData, recommendation: string): LearningObjectiveData {
  const next = (data.field7 ?? []).filter(item => item !== recommendation);
  return { ...data, field7: next };
}

// Learner Profile update functions
export function learnerProfileAddField3Metric(data: LearnerProfileData, label?: string, value?: number | ""): { next: LearnerProfileData; createdId: string } {
  const existing = data.field3 ?? [];
  const nextCount = (data.field3_id ?? 0) + 1;
  const id = String(nextCount).padStart(3, "0");
  const safe: number | "" = typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : value === "" ? "" : 0;
  const next = [...existing, { id, label: label ?? "", value: safe }];
  return { next: { ...data, field3: next, field3_id: nextCount }, createdId: id };
}

export function learnerProfileSetField3Label(data: LearnerProfileData, index: number, label: string): LearnerProfileData {
  const next = [...(data.field3 ?? [])];
  if (index >= 0 && index < next.length) {
    next[index] = { ...next[index], label };
    return { ...data, field3: next } as LearnerProfileData;
  }
  return data;
}

export function learnerProfileSetField3Value(data: LearnerProfileData, index: number, value: number | ""): LearnerProfileData {
  const next = [...(data.field3 ?? [])];
  if (index >= 0 && index < next.length) {
    if (value === "") {
      next[index] = { ...next[index], value: "" };
    } else {
      const clamped = Math.max(0, Math.min(100, value));
      next[index] = { ...next[index], value: clamped };
    }
    return { ...data, field3: next } as LearnerProfileData;
  }
  return data;
}

export function learnerProfileRemoveField3Metric(data: LearnerProfileData, index: number): LearnerProfileData {
  const next = [...(data.field3 ?? [])];
  if (index >= 0 && index < next.length) {
    next.splice(index, 1);
    return { ...data, field3: next } as LearnerProfileData;
  }
  return data;
}

export function learnerProfileAddField6Item(data: LearnerProfileData, adjustment: string): LearnerProfileData {
  const existing = data.field6 ?? [];
  if (!existing.includes(adjustment)) {
    return { ...data, field6: [...existing, adjustment] };
  }
  return data;
}

export function learnerProfileRemoveField6Item(data: LearnerProfileData, adjustment: string): LearnerProfileData {
  const next = (data.field6 ?? []).filter(item => item !== adjustment);
  return { ...data, field6: next };
}




