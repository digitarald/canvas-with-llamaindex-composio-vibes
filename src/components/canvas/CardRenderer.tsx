"use client";

import { cn } from "@/lib/utils";
import { X, Plus, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, SprintData } from "@/lib/canvas/types";
import { 
  chartAddField1Metric, 
  chartRemoveField1Metric, 
  chartSetField1Label, 
  chartSetField1Value, 
  projectAddField4Item, 
  projectRemoveField4Item, 
  projectSetField4ItemDone, 
  projectSetField4ItemText,
  projectAddField6RiskFactor,
  projectRemoveField6RiskFactor,
  projectAddField7SuggestedAction,
  projectRemoveField7SuggestedAction,
  sprintAddField4TeamMember,
  sprintRemoveField4TeamMember,
  sprintSetField4TeamMember
} from "@/lib/canvas/updates";

export function CardRenderer(props: {
  item: Item;
  onUpdateData: (updater: (prev: ItemData) => ItemData) => void;
  onToggleTag: (tag: string) => void;
}) {
  const { item, onUpdateData, onToggleTag } = props;

  if (item.type === "note") {
    const d = item.data as NoteData;
    return (
      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (textarea)</label>
        <TextareaAutosize
          value={d.field1 ?? ""}
          onChange={(e) => onUpdateData(() => ({ field1: e.target.value }))}
          placeholder="Write note..."
          className="min-h-40 w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          minRows={6}
        />
      </div>
    );
  }

  if (item.type === "chart") {
    const d = item.data as ChartData;
    return (
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Field 1 (metrics)</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => chartAddField1Metric(prev as ChartData, "", "").next)}
          >
            <Plus className="size-3.5" />
            Add new
          </button>
        </div>
        <div className="space-y-3">
          {(!d.field1 || d.field1.length === 0) && (
            <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
              Nothing here yet. Add a metric to get started.
            </div>
          )}
          {d.field1.map((m, i) => {
            const number = String(m.id ?? String(i + 1)).padStart(3, "0");
            return (
            <div key={m.id ?? `metric-${i}`} className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground/80">{number}</span>
              <input
                value={m.label}
                placeholder="Metric label"
                onChange={(e) => onUpdateData((prev) => chartSetField1Label(prev as ChartData, i, e.target.value))}
                className="w-25 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
              />
              <div className="flex items-center gap-3 flex-1">
                <Progress value={m.value || 0} />
              </div>
              <input
                className={cn(
                  "w-10 rounded-md border px-2 py-1 text-xs outline-none appearance-none [-moz-appearance:textfield]",
                  "[&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0",
                  "[&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0",
                  "transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm",
                  "focus:bg-accent/10 focus:text-accent font-mono",
                )}
                type="number"
                min={0}
                max={100}
                value={m.value}
                onChange={(e) => onUpdateData((prev) => chartSetField1Value(prev as ChartData, i, e.target.value === "" ? "" : Number(e.target.value)))}
                placeholder="0"
              />
              <button
                type="button"
                aria-label="Delete metric"
                className="text-gray-400 hover:text-accent"
                onClick={() => onUpdateData((prev) => chartRemoveField1Metric(prev as ChartData, i))}
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          );})}
        </div>
      </div>
    );
  }

  if (item.type === "project") {
    const d = item.data as ProjectData;
    const set = (partial: Partial<ProjectData>) => onUpdateData((prev) => ({ ...(prev as ProjectData), ...partial }));
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Text)</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="Field 1 value"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Select)</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              required
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
            >
              <option value="">Select...</option>
              {["Option A", "Option B", "Option C"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Date)</label>
            <input
              type="date"
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              required
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 4 (checklist)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => projectAddField4Item(prev as ProjectData, "").next)}
            >
              <Plus className="size-3.5" />
              Add new
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                Nothing here yet. Add a checklist item to get started.
              </div>
            )}
            {(d.field4 ?? []).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground/80">{String(c.id ?? String(i + 1)).padStart(3, "0")}</span>
                <input
                  type="checkbox"
                  checked={!!c.done}
                  onChange={(e) => onUpdateData((prev) => projectSetField4ItemDone(prev as ProjectData, c.id, e.target.checked))}
                  className="h-4 w-4"
                />
                <input
                  value={c.text}
                  placeholder="Checklist item label"
                  onChange={(e) => onUpdateData((prev) => projectSetField4ItemText(prev as ProjectData, c.id, e.target.value))}
                  className="flex-1 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
                />
                <button
                  type="button"
                  aria-label="Delete checklist item"
                  className="text-gray-400 hover:text-accent"
                  onClick={() => onUpdateData((prev) => projectRemoveField4Item(prev as ProjectData, c.id))}
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Health Score */}
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 5 (Health Score)</label>
          <div className="flex items-center gap-3">
            <Progress value={d.field5 || 75} className="flex-1" />
            <input
              type="number"
              min={0}
              max={100}
              value={d.field5 || 75}
              onChange={(e) => set({ field5: Math.max(0, Math.min(100, Number(e.target.value))) })}
              className="w-16 rounded-md border px-2 py-1 text-xs outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            />
            <span className="text-xs text-gray-500">%</span>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 6 (Risk Factors)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => projectAddField6RiskFactor(prev as ProjectData, "Resource", "Potential resource constraint", "medium").next)}
            >
              <Plus className="size-3.5" />
              Add risk
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field6 || d.field6.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No risks identified yet.
              </div>
            )}
            {(d.field6 ?? []).map((risk) => (
              <div key={risk.id} className="flex items-start gap-2 p-2 border rounded-md bg-red-50/50">
                <AlertTriangle className={cn("size-4 mt-0.5", {
                  "text-red-600": risk.severity === "critical",
                  "text-orange-500": risk.severity === "high", 
                  "text-yellow-500": risk.severity === "medium",
                  "text-blue-500": risk.severity === "low"
                })} />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-xs font-medium">{risk.type}</div>
                  <div className="text-xs text-gray-600">{risk.description}</div>
                  <div className={cn("text-xs font-medium uppercase", {
                    "text-red-600": risk.severity === "critical",
                    "text-orange-500": risk.severity === "high", 
                    "text-yellow-500": risk.severity === "medium",
                    "text-blue-500": risk.severity === "low"
                  })}>
                    {risk.severity}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove risk"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => onUpdateData((prev) => projectRemoveField6RiskFactor(prev as ProjectData, risk.id))}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 7 (Suggested Actions)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => projectAddField7SuggestedAction(prev as ProjectData, "Review schedule", "Consider adjusting timeline based on current progress", "medium").next)}
            >
              <Plus className="size-3.5" />
              Add action
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field7 || d.field7.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No suggested actions yet.
              </div>
            )}
            {(d.field7 ?? []).map((action) => (
              <div key={action.id} className="flex items-start gap-2 p-2 border rounded-md bg-green-50/50">
                <CheckCircle className={cn("size-4 mt-0.5", {
                  "text-red-500": action.priority === "high",
                  "text-yellow-500": action.priority === "medium", 
                  "text-green-500": action.priority === "low"
                })} />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-xs font-medium">{action.title}</div>
                  <div className="text-xs text-gray-600">{action.description}</div>
                  <div className={cn("text-xs font-medium uppercase", {
                    "text-red-500": action.priority === "high",
                    "text-yellow-500": action.priority === "medium", 
                    "text-green-500": action.priority === "low"
                  })}>
                    {action.priority} priority
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove action"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => onUpdateData((prev) => projectRemoveField7SuggestedAction(prev as ProjectData, action.id))}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "sprint") {
    const d = item.data as SprintData;
    const set = (partial: Partial<SprintData>) => onUpdateData((prev) => ({ ...(prev as SprintData), ...partial }));
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Sprint Name)</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="Sprint name"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Status)</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              required
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
            >
              {["Planning", "Active", "Review", "Complete"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Target Date)</label>
            <input
              type="date"
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            />
          </div>
        </div>
        
        {/* Team Members */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 4 (Team Members)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => sprintAddField4TeamMember(prev as SprintData, "", "Developer", 100).next)}
            >
              <Plus className="size-3.5" />
              Add member
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No team members assigned yet.
              </div>
            )}
            {(d.field4 ?? []).map((member) => (
              <div key={member.id} className="flex items-center gap-2 p-2 border rounded-md bg-blue-50/50">
                <Users className="size-4 text-blue-500" />
                <div className="flex-1 grid grid-cols-1 @xs:grid-cols-3 gap-2">
                  <input
                    value={member.name}
                    placeholder="Name"
                    onChange={(e) => onUpdateData((prev) => sprintSetField4TeamMember(prev as SprintData, member.id, { name: e.target.value }))}
                    className="rounded-md border px-2 py-1 text-xs outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
                  />
                  <input
                    value={member.role}
                    placeholder="Role"
                    onChange={(e) => onUpdateData((prev) => sprintSetField4TeamMember(prev as SprintData, member.id, { role: e.target.value }))}
                    className="rounded-md border px-2 py-1 text-xs outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={member.capacity}
                      onChange={(e) => onUpdateData((prev) => sprintSetField4TeamMember(prev as SprintData, member.id, { capacity: Number(e.target.value) }))}
                      className="w-12 rounded-md border px-1 py-1 text-xs outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove team member"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => onUpdateData((prev) => sprintRemoveField4TeamMember(prev as SprintData, member.id))}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const e = item.data as EntityData;
  const setEntity = (partial: Partial<EntityData>) => onUpdateData((prev) => ({ ...(prev as EntityData), ...partial }));
  return (
    <div className="mt-4">
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Text)</label>
        <input
          value={e.field1}
          onChange={(ev) => setEntity({ field1: ev.target.value })}
          className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          placeholder="Field 1 value"
        />
      </div>
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Select)</label>
        <select
          value={e.field2}
          onChange={(ev) => setEntity({ field2: ev.target.value })}
          required
          className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
        >
          <option value="">Select...</option>
          {["Option A", "Option B", "Option C"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Tags)</label>
        <div className="flex flex-wrap gap-2">
          {(e.field3_options ?? []).map((t) => {
            const active = (e.field3 ?? []).includes(t);
            return (
              <button
                key={t}
                onClick={() => onToggleTag(t)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
                  active ? "bg-accent/20 border-accent text-accent" : "text-gray-600"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardRenderer;




