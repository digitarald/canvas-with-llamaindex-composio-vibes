"use client";

import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, DealData } from "@/lib/canvas/types";
import { chartAddField1Metric, chartRemoveField1Metric, chartSetField1Label, chartSetField1Value, projectAddField4Item, projectRemoveField4Item, projectSetField4ItemDone, projectSetField4ItemText, dealAddField4Touchpoint, dealRemoveField4Touchpoint, dealSetField4TouchpointType, dealSetField4TouchpointDescription, dealAddField6Action, dealRemoveField6Action, dealSetField6ActionText, dealSetField6ActionPriority, dealAddField7Competitor, dealRemoveField7Competitor, dealSetField7CompetitorName, dealSetField7CompetitorThreat } from "@/lib/canvas/updates";

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
      </div>
    );
  }

  if (item.type === "deal") {
    const d = item.data as DealData;
    const set = (partial: Partial<DealData>) => onUpdateData((prev) => ({ ...(prev as DealData), ...partial }));
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Deal Name/Company)</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="Enter deal name or company"
          />
        </div>
        
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Stage)</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              required
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
            >
              <option value="">Select stage...</option>
              {["Lead", "Qualified", "Proposal", "Negotiation", "Closed-Won", "Closed-Lost"].map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Close Date)</label>
            <input
              type="date"
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
            />
          </div>
        </div>
        
        <div className="contents @xs:grid gap-3 md:grid-cols-2 mt-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 5 (AI Confidence Score)</label>
            <div className="flex items-center gap-2">
              <input
                className={cn(
                  "w-16 rounded-md border px-2 py-1.5 text-sm outline-none appearance-none [-moz-appearance:textfield]",
                  "[&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0",
                  "[&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0",
                  "transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm",
                  "focus:bg-accent/10 focus:text-accent font-mono",
                )}
                type="number"
                min={0}
                max={100}
                value={d.field5}
                onChange={(e) => set({ field5: e.target.value === "" ? "" : Number(e.target.value) })}
                placeholder="0"
              />
              <span className="text-xs text-gray-500">%</span>
              {d.field5 !== "" && (
                <div className="flex-1">
                  <Progress value={Number(d.field5) || 0} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 4 (Deal Activities)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => dealAddField4Touchpoint(prev as DealData, "email", "").next)}
            >
              <Plus className="size-3.5" />
              Add activity
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No activities yet. Add a touchpoint to get started.
              </div>
            )}
            {(d.field4 ?? []).map((t, i) => (
              <div key={t.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                <span className="text-xs font-mono text-muted-foreground/80">{String(t.id ?? String(i + 1)).padStart(3, "0")}</span>
                <select
                  value={t.type}
                  onChange={(e) => onUpdateData((prev) => dealSetField4TouchpointType(prev as DealData, t.id, e.target.value))}
                  className="w-20 rounded-md border px-1 py-0.5 text-xs outline-none"
                >
                  {["email", "call", "meeting", "demo", "proposal"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  value={t.description}
                  placeholder="Activity description"
                  onChange={(e) => onUpdateData((prev) => dealSetField4TouchpointDescription(prev as DealData, t.id, e.target.value))}
                  className="flex-1 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
                />
                <span className="text-xs text-gray-500">{t.date}</span>
                <button
                  type="button"
                  aria-label="Delete activity"
                  className="text-gray-400 hover:text-accent"
                  onClick={() => onUpdateData((prev) => dealRemoveField4Touchpoint(prev as DealData, t.id))}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 6 (Next Best Actions)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => dealAddField6Action(prev as DealData, "", "medium").next)}
            >
              <Plus className="size-3.5" />
              Add action
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field6 || d.field6.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No actions yet. Add a recommended action to get started.
              </div>
            )}
            {(d.field6 ?? []).map((a, i) => (
              <div key={a.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                <span className="text-xs font-mono text-muted-foreground/80">{String(a.id ?? String(i + 1)).padStart(3, "0")}</span>
                <select
                  value={a.priority}
                  onChange={(e) => onUpdateData((prev) => dealSetField6ActionPriority(prev as DealData, a.id, e.target.value as "high" | "medium" | "low"))}
                  className={cn(
                    "w-20 rounded-md border px-1 py-0.5 text-xs outline-none",
                    a.priority === "high" ? "text-red-600 bg-red-50" : 
                    a.priority === "medium" ? "text-yellow-600 bg-yellow-50" : 
                    "text-green-600 bg-green-50"
                  )}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <input
                  value={a.action}
                  placeholder="Action description"
                  onChange={(e) => onUpdateData((prev) => dealSetField6ActionText(prev as DealData, a.id, e.target.value))}
                  className="flex-1 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
                />
                <button
                  type="button"
                  aria-label="Delete action"
                  className="text-gray-400 hover:text-accent"
                  onClick={() => onUpdateData((prev) => dealRemoveField6Action(prev as DealData, a.id))}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Field 7 (Competitive Intelligence)</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => dealAddField7Competitor(prev as DealData, "", "medium").next)}
            >
              <Plus className="size-3.5" />
              Add competitor
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field7 || d.field7.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No competitors tracked. Add competitors to monitor threats.
              </div>
            )}
            {(d.field7 ?? []).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                <span className="text-xs font-mono text-muted-foreground/80">{String(c.id ?? String(i + 1)).padStart(3, "0")}</span>
                <input
                  value={c.name}
                  placeholder="Competitor name"
                  onChange={(e) => onUpdateData((prev) => dealSetField7CompetitorName(prev as DealData, c.id, e.target.value))}
                  className="flex-1 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
                />
                <select
                  value={c.threat}
                  onChange={(e) => onUpdateData((prev) => dealSetField7CompetitorThreat(prev as DealData, c.id, e.target.value as "high" | "medium" | "low"))}
                  className={cn(
                    "w-20 rounded-md border px-1 py-0.5 text-xs outline-none",
                    c.threat === "high" ? "text-red-600 bg-red-50" : 
                    c.threat === "medium" ? "text-yellow-600 bg-yellow-50" : 
                    "text-green-600 bg-green-50"
                  )}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  type="button"
                  aria-label="Delete competitor"
                  className="text-gray-400 hover:text-accent"
                  onClick={() => onUpdateData((prev) => dealRemoveField7Competitor(prev as DealData, c.id))}
                >
                  <X className="h-4 w-4" />
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
      
      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 4 (Engagement Score)</label>
        <div className="flex items-center gap-2">
          <input
            className={cn(
              "w-16 rounded-md border px-2 py-1.5 text-sm outline-none appearance-none [-moz-appearance:textfield]",
              "[&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0",
              "[&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0",
              "transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm",
              "focus:bg-accent/10 focus:text-accent font-mono",
            )}
            type="number"
            min={0}
            max={100}
            value={e.field4 ?? ""}
            onChange={(e) => setEntity({ field4: e.target.value === "" ? "" : Number(e.target.value) })}
            placeholder="0"
          />
          <span className="text-xs text-gray-500">%</span>
          {e.field4 !== "" && e.field4 !== undefined && (
            <div className="flex-1">
              <Progress value={Number(e.field4) || 0} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 5 (Decision Maker Influence)</label>
        <select
          value={e.field5 ?? ""}
          onChange={(e) => setEntity({ field5: e.target.value })}
          className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent invalid:text-gray-400"
        >
          <option value="">Select influence level...</option>
          {["High", "Medium", "Low", "Unknown"].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-gray-500">Field 6 (Communication Preferences)</label>
        <input
          value={e.field6 ?? ""}
          onChange={(e) => setEntity({ field6: e.target.value })}
          className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          placeholder="e.g., Email mornings, calls after 2pm"
        />
      </div>
    </div>
  );
}

export default CardRenderer;




