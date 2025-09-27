"use client";

import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, ResearchTopicData, InsightData } from "@/lib/canvas/types";
import { chartAddField1Metric, chartRemoveField1Metric, chartSetField1Label, chartSetField1Value, projectAddField4Item, projectRemoveField4Item, projectSetField4ItemDone, projectSetField4ItemText } from "@/lib/canvas/updates";

export function CardRenderer(props: {
  item: Item;
  onUpdateData: (updater: (prev: ItemData) => ItemData) => void;
  onToggleTag: (tag: string) => void;
}) {
  const { item, onUpdateData, onToggleTag } = props;

  if (item.type === "note") {
    const d = item.data as NoteData;
    const setNote = (partial: Partial<NoteData>) => onUpdateData((prev) => ({ ...(prev as NoteData), ...partial }));
    return (
      <div className="mt-4">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Content)</label>
          <TextareaAutosize
            value={d.field1 ?? ""}
            onChange={(e) => setNote({ field1: e.target.value })}
            placeholder="Write note..."
            className="min-h-40 w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={6}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Source Attribution & Credibility)</label>
          <input
            value={d.field2 ?? ""}
            onChange={(e) => setNote({ field2: e.target.value })}
            placeholder="Source URL, credibility score, publication info..."
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Annotation Tags)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(d.field3 ?? []).map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-accent/20 border-accent text-accent px-2 py-0.5 text-xs">
                {tag}
                <button
                  onClick={() => setNote({ field3: (d.field3 ?? []).filter((_, idx) => idx !== i) })}
                  className="hover:text-accent/70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Add tags (themes, relevance, sentiment)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                setNote({ field3: [...(d.field3 ?? []), e.currentTarget.value.trim()] });
                e.currentTarget.value = '';
              }
            }}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 4 (Cross-References)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(d.field4 ?? []).map((ref, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-blue-100 border-blue-300 text-blue-700 px-2 py-0.5 text-xs">
                {ref}
                <button
                  onClick={() => setNote({ field4: (d.field4 ?? []).filter((_, idx) => idx !== i) })}
                  className="hover:text-blue-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Add cross-references and connections..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                setNote({ field4: [...(d.field4 ?? []), e.currentTarget.value.trim()] });
                e.currentTarget.value = '';
              }
            }}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
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

  if (item.type === "research-topic") {
    const d = item.data as ResearchTopicData;
    const setResearch = (partial: Partial<ResearchTopicData>) => onUpdateData((prev) => ({ ...(prev as ResearchTopicData), ...partial }));
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Research Question/Hypothesis)</label>
          <TextareaAutosize
            value={d.field1}
            onChange={(e) => setResearch({ field1: e.target.value })}
            placeholder="What research question or hypothesis are you investigating?"
            className="w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={3}
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Research Status)</label>
            <select
              value={d.field2}
              onChange={(e) => setResearch({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="Scoping">Scoping</option>
              <option value="Data Collection">Data Collection</option>
              <option value="Analysis">Analysis</option>
              <option value="Synthesis">Synthesis</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Target Completion Date)</label>
            <input
              type="date"
              value={d.field3}
              onChange={(e) => setResearch({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 4 (Data Sources)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(d.field4 ?? []).map((source, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-green-100 border-green-300 text-green-700 px-2 py-0.5 text-xs">
                {source}
                <button
                  onClick={() => setResearch({ field4: (d.field4 ?? []).filter((_, idx) => idx !== i) })}
                  className="hover:text-green-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Add data sources (APIs, databases, studies)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                setResearch({ field4: [...(d.field4 ?? []), e.currentTarget.value.trim()] });
                e.currentTarget.value = '';
              }
            }}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 5 (Key Findings)</label>
          <TextareaAutosize
            value={d.field5}
            onChange={(e) => setResearch({ field5: e.target.value })}
            placeholder="AI-generated insights and key findings will appear here..."
            className="w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={4}
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2 mt-3">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 6 (Confidence Level)</label>
            <select
              value={d.field6}
              onChange={(e) => setResearch({ field6: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Field 7 (Related Topics)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(d.field7 ?? []).map((topic, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-purple-100 border-purple-300 text-purple-700 px-2 py-0.5 text-xs">
                  {topic}
                  <button
                    onClick={() => setResearch({ field7: (d.field7 ?? []).filter((_, idx) => idx !== i) })}
                    className="hover:text-purple-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder="Add related topics..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setResearch({ field7: [...(d.field7 ?? []), e.currentTarget.value.trim()] });
                  e.currentTarget.value = '';
                }
              }}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "insight") {
    const d = item.data as InsightData;
    const setInsight = (partial: Partial<InsightData>) => onUpdateData((prev) => ({ ...(prev as InsightData), ...partial }));
    return (
      <div className="mt-4">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 1 (Insight Statement/Conclusion)</label>
          <TextareaAutosize
            value={d.field1}
            onChange={(e) => setInsight({ field1: e.target.value })}
            placeholder="What is the key insight or conclusion from your research?"
            className="w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={3}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 2 (Evidence Strength)</label>
          <select
            value={d.field2}
            onChange={(e) => setInsight({ field2: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
          >
            <option value="Weak">Weak</option>
            <option value="Moderate">Moderate</option>
            <option value="Strong">Strong</option>
            <option value="Conclusive">Conclusive</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 3 (Supporting Data Points)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(d.field3 ?? []).map((dataPoint, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-orange-100 border-orange-300 text-orange-700 px-2 py-0.5 text-xs">
                {dataPoint}
                <button
                  onClick={() => setInsight({ field3: (d.field3 ?? []).filter((_, idx) => idx !== i) })}
                  className="hover:text-orange-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Add supporting data points and source references..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                setInsight({ field3: [...(d.field3 ?? []), e.currentTarget.value.trim()] });
                e.currentTarget.value = '';
              }
            }}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Field 4 (Counterarguments or Limitations)</label>
          <TextareaAutosize
            value={d.field4}
            onChange={(e) => setInsight({ field4: e.target.value })}
            placeholder="What are the potential counterarguments, limitations, or caveats to this insight?"
            className="w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={3}
          />
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




