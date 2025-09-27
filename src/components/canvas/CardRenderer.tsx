"use client";

import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, TableData, RelationshipData, MigrationData, QueryData, ColumnDefinition, IndexDefinition, MigrationStep } from "@/lib/canvas/types";
import { chartAddField1Metric, chartRemoveField1Metric, chartSetField1Label, chartSetField1Value, projectAddField4Item, projectRemoveField4Item, projectSetField4ItemDone, projectSetField4ItemText } from "@/lib/canvas/updates";

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

  // Database card types
  if (item.type === "table") {
    const d = item.data as TableData;
    const set = (partial: Partial<TableData>) => onUpdateData((prev) => ({ ...(prev as TableData), ...partial }));

    const addColumn = () => {
      const newColumn: ColumnDefinition = {
        id: `col_${d.field2_id + 1}`,
        name: "",
        dataType: "VARCHAR(255)",
        nullable: true,
        primaryKey: false,
        unique: false,
        defaultValue: "",
        comment: "",
      };
      set({
        field2: [...d.field2, newColumn],
        field2_id: d.field2_id + 1,
      });
    };

    const updateColumn = (index: number, updates: Partial<ColumnDefinition>) => {
      const updatedColumns = [...d.field2];
      updatedColumns[index] = { ...updatedColumns[index], ...updates };
      set({ field2: updatedColumns });
    };

    const removeColumn = (index: number) => {
      set({ field2: d.field2.filter((_, i) => i !== index) });
    };

    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Table Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            placeholder="table_name"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
          <input
            value={d.field4}
            onChange={(e) => set({ field4: e.target.value })}
            placeholder="Table description"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Columns</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={addColumn}
            >
              <Plus className="size-3.5" />
              Add Column
            </button>
          </div>
          <div className="space-y-2">
            {d.field2.map((column, index) => (
              <div key={column.id} className="rounded border p-3 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    value={column.name}
                    onChange={(e) => updateColumn(index, { name: e.target.value })}
                    placeholder="column_name"
                    className="text-sm rounded border px-2 py-1"
                  />
                  <select
                    value={column.dataType}
                    onChange={(e) => updateColumn(index, { dataType: e.target.value })}
                    className="text-sm rounded border px-2 py-1"
                  >
                    <option value="VARCHAR(255)">VARCHAR(255)</option>
                    <option value="INTEGER">INTEGER</option>
                    <option value="BIGINT">BIGINT</option>
                    <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="TEXT">TEXT</option>
                    <option value="TIMESTAMP">TIMESTAMP</option>
                    <option value="DATE">DATE</option>
                    <option value="JSON">JSON</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={column.nullable}
                      onChange={(e) => updateColumn(index, { nullable: e.target.checked })}
                    />
                    Nullable
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={column.primaryKey}
                      onChange={(e) => updateColumn(index, { primaryKey: e.target.checked })}
                    />
                    Primary Key
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={column.unique}
                      onChange={(e) => updateColumn(index, { unique: e.target.checked })}
                    />
                    Unique
                  </label>
                  <button
                    type="button"
                    onClick={() => removeColumn(index)}
                    className="text-red-500 hover:text-red-700 ml-auto"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {column.defaultValue !== undefined && (
                  <input
                    value={column.defaultValue}
                    onChange={(e) => updateColumn(index, { defaultValue: e.target.value })}
                    placeholder="Default value"
                    className="mt-2 w-full text-xs rounded border px-2 py-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "relationship") {
    const d = item.data as RelationshipData;
    const set = (partial: Partial<RelationshipData>) => onUpdateData((prev) => ({ ...(prev as RelationshipData), ...partial }));

    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Relationship Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            placeholder="fk_user_posts"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Source Table ID</label>
            <input
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              placeholder="table_id_1"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Target Table ID</label>
            <input
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              placeholder="table_id_2"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Relationship Type</label>
          <select
            value={d.field6}
            onChange={(e) => set({ field6: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
          >
            <option value="one-to-one">One to One</option>
            <option value="one-to-many">One to Many</option>
            <option value="many-to-many">Many to Many</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">On Delete</label>
            <select
              value={d.field7}
              onChange={(e) => set({ field7: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="CASCADE">CASCADE</option>
              <option value="SET NULL">SET NULL</option>
              <option value="RESTRICT">RESTRICT</option>
              <option value="NO ACTION">NO ACTION</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">On Update</label>
            <select
              value={d.field8}
              onChange={(e) => set({ field8: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="CASCADE">CASCADE</option>
              <option value="SET NULL">SET NULL</option>
              <option value="RESTRICT">RESTRICT</option>
              <option value="NO ACTION">NO ACTION</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "migration") {
    const d = item.data as MigrationData;
    const set = (partial: Partial<MigrationData>) => onUpdateData((prev) => ({ ...(prev as MigrationData), ...partial }));

    const addStep = () => {
      const newStep: MigrationStep = {
        id: `step_${d.field3_id + 1}`,
        type: "CREATE_TABLE",
        sql: "",
        rollback: "",
        description: "",
      };
      set({
        field3: [...d.field3, newStep],
        field3_id: d.field3_id + 1,
      });
    };

    const updateStep = (index: number, updates: Partial<MigrationStep>) => {
      const updatedSteps = [...d.field3];
      updatedSteps[index] = { ...updatedSteps[index], ...updates };
      set({ field3: updatedSteps });
    };

    const removeStep = (index: number) => {
      set({ field3: d.field3.filter((_, i) => i !== index) });
    };

    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Migration Name</label>
            <input
              value={d.field1}
              onChange={(e) => set({ field1: e.target.value })}
              placeholder="create_users_table"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Version</label>
            <input
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              placeholder="2024-01-01-120000"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
          <TextareaAutosize
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            placeholder="Migration description..."
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={2}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
          <select
            value={d.field4}
            onChange={(e) => set({ field4: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
          >
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
            <option value="failed">Failed</option>
            <option value="rolled_back">Rolled Back</option>
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Migration Steps</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={addStep}
            >
              <Plus className="size-3.5" />
              Add Step
            </button>
          </div>
          <div className="space-y-3">
            {d.field3.map((step, index) => (
              <div key={step.id} className="rounded border p-3 bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <select
                    value={step.type}
                    onChange={(e) => updateStep(index, { type: e.target.value })}
                    className="text-sm rounded border px-2 py-1"
                  >
                    <option value="CREATE_TABLE">CREATE TABLE</option>
                    <option value="ALTER_TABLE">ALTER TABLE</option>
                    <option value="DROP_TABLE">DROP TABLE</option>
                    <option value="CREATE_INDEX">CREATE INDEX</option>
                    <option value="DROP_INDEX">DROP INDEX</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <TextareaAutosize
                  value={step.sql}
                  onChange={(e) => updateStep(index, { sql: e.target.value })}
                  placeholder="SQL statement..."
                  className="w-full text-xs rounded border px-2 py-1 font-mono mb-2"
                  minRows={2}
                />
                <TextareaAutosize
                  value={step.rollback}
                  onChange={(e) => updateStep(index, { rollback: e.target.value })}
                  placeholder="Rollback SQL..."
                  className="w-full text-xs rounded border px-2 py-1 font-mono"
                  minRows={1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === "query") {
    const d = item.data as QueryData;
    const set = (partial: Partial<QueryData>) => onUpdateData((prev) => ({ ...(prev as QueryData), ...partial }));

    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Query Name</label>
            <input
              value={d.field1}
              onChange={(e) => set({ field1: e.target.value })}
              placeholder="get_active_users"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Query Type</label>
            <select
              value={d.field4}
              onChange={(e) => set({ field4: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="SELECT">SELECT</option>
              <option value="INSERT">INSERT</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="VIEW">VIEW</option>
              <option value="PROCEDURE">PROCEDURE</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
          <input
            value={d.field3}
            onChange={(e) => set({ field3: e.target.value })}
            placeholder="Query description..."
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">SQL Query</label>
          <TextareaAutosize
            value={d.field2}
            onChange={(e) => set({ field2: e.target.value })}
            placeholder="SELECT * FROM users WHERE active = true;"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65 font-mono"
            minRows={4}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Tags</label>
          <input
            value={d.field5.join(", ")}
            onChange={(e) => set({ field5: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean) })}
            placeholder="analytics, reporting, users"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
          />
        </div>
      </div>
    );
  }

  // Fallback for unknown types
  return (
    <div className="mt-4 text-sm text-gray-500">
      Unknown card type: {item.type}
    </div>
  );
}

export default CardRenderer;




