"use client";

import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, ServiceData, DatabaseData, MessageQueueData, ApiGatewayData, ExternalServiceData, IssueData } from "@/lib/canvas/types";
import { chartAddField1Metric, chartRemoveField1Metric, chartSetField1Label, chartSetField1Value, projectAddField4Item, projectRemoveField4Item, projectSetField4ItemDone, projectSetField4ItemText, serviceAddField4Metric, serviceRemoveField4Metric, serviceSetField4Label, serviceSetField4Value, databaseAddField4Metric, databaseRemoveField4Metric, databaseSetField4Label, databaseSetField4Value, issueAddField4Item, issueRemoveField4Item, issueSetField4ItemDone, issueSetField4ItemText } from "@/lib/canvas/updates";

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

  if (item.type === "service") {
    const d = item.data as ServiceData;
    const set = (partial: Partial<ServiceData>) => onUpdateData((prev) => ({ ...(prev as ServiceData), ...partial }));
    const healthColor = d.field2 === "healthy" ? "text-green-600" : d.field2 === "warning" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Service ID</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="service-name"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Health Status</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", healthColor)}
            >
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Service Type</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="web">Web Service</option>
              <option value="api">API Service</option>
              <option value="worker">Background Worker</option>
              <option value="cron">Scheduled Job</option>
              <option value="stream">Stream Processor</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Deployment Info</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="v1.2.3 | k8s:prod | 3 replicas"
          />
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Resource Metrics</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => serviceAddField4Metric(prev as ServiceData, "", "").next)}
            >
              <Plus className="size-3.5" />
              Add metric
            </button>
          </div>
          <div className="space-y-3">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No metrics yet. Add CPU, Memory, or custom metrics.
              </div>
            )}
            {d.field4.map((m, i) => {
              const number = String(m.id ?? String(i + 1)).padStart(3, "0");
              return (
                <div key={m.id ?? `metric-${i}`} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground/80">{number}</span>
                  <input
                    value={m.label}
                    placeholder="CPU, Memory, etc."
                    onChange={(e) => onUpdateData((prev) => serviceSetField4Label(prev as ServiceData, i, e.target.value))}
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
                    onChange={(e) => onUpdateData((prev) => serviceSetField4Value(prev as ServiceData, i, e.target.value === "" ? "" : Number(e.target.value)))}
                    placeholder="0"
                  />
                  <button
                    type="button"
                    aria-label="Delete metric"
                    className="text-gray-400 hover:text-accent"
                    onClick={() => onUpdateData((prev) => serviceRemoveField4Metric(prev as ServiceData, i))}
                  >
                    <X className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Dependencies (comma-separated)</label>
          <input
            value={d.field6.join(", ")}
            onChange={(e) => set({ field6: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="auth-service, user-db, payment-api"
          />
        </div>
      </div>
    );
  }

  if (item.type === "database") {
    const d = item.data as DatabaseData;
    const set = (partial: Partial<DatabaseData>) => onUpdateData((prev) => ({ ...(prev as DatabaseData), ...partial }));
    const statusColor = d.field3 === "connected" ? "text-green-600" : d.field3 === "slow" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Database Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-database"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Database Type</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="redis">Redis</option>
              <option value="elasticsearch">Elasticsearch</option>
              <option value="cassandra">Cassandra</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Connection Status</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", statusColor)}
            >
              <option value="connected">Connected</option>
              <option value="slow">Slow</option>
              <option value="disconnected">Disconnected</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Schema Info</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="150 tables | 2.5GB | users, orders, products"
          />
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Performance Metrics</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => databaseAddField4Metric(prev as DatabaseData, "", "").next)}
            >
              <Plus className="size-3.5" />
              Add metric
            </button>
          </div>
          <div className="space-y-3">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No metrics yet. Add connection pool, query performance metrics.
              </div>
            )}
            {d.field4.map((m, i) => {
              const number = String(m.id ?? String(i + 1)).padStart(3, "0");
              return (
                <div key={m.id ?? `metric-${i}`} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground/80">{number}</span>
                  <input
                    value={m.label}
                    placeholder="Pool usage, Query time"
                    onChange={(e) => onUpdateData((prev) => databaseSetField4Label(prev as DatabaseData, i, e.target.value))}
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
                    onChange={(e) => onUpdateData((prev) => databaseSetField4Value(prev as DatabaseData, i, e.target.value === "" ? "" : Number(e.target.value)))}
                    placeholder="0"
                  />
                  <button
                    type="button"
                    aria-label="Delete metric"
                    className="text-gray-400 hover:text-accent"
                    onClick={() => onUpdateData((prev) => databaseRemoveField4Metric(prev as DatabaseData, i))}
                  >
                    <X className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Connected Services (comma-separated)</label>
          <input
            value={d.field6.join(", ")}
            onChange={(e) => set({ field6: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-service, order-service, analytics"
          />
        </div>
      </div>
    );
  }

  if (item.type === "issue") {
    const d = item.data as IssueData;
    const set = (partial: Partial<IssueData>) => onUpdateData((prev) => ({ ...(prev as IssueData), ...partial }));
    const severityColor = d.field2 === "critical" ? "text-red-600" : d.field2 === "high" ? "text-orange-600" : d.field2 === "medium" ? "text-yellow-600" : "text-blue-600";
    const statusColor = d.field3 === "resolved" ? "text-green-600" : d.field3 === "investigating" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Issue Title</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="High CPU usage on user-service"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Severity</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", severityColor)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", statusColor)}
            >
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Affected Services</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-service, auth-service"
          />
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Action Items</label>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              onClick={() => onUpdateData((prev) => issueAddField4Item(prev as IssueData, "").next)}
            >
              <Plus className="size-3.5" />
              Add step
            </button>
          </div>
          <div className="space-y-2">
            {(!d.field4 || d.field4.length === 0) && (
              <div className="grid place-items-center py-1.75 text-xs text-primary/50 font-medium text-pretty">
                No action items yet. Add debugging steps or remediation tasks.
              </div>
            )}
            {(d.field4 ?? []).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground/80">{String(c.id ?? String(i + 1)).padStart(3, "0")}</span>
                <input
                  type="checkbox"
                  checked={!!c.done}
                  onChange={(e) => onUpdateData((prev) => issueSetField4ItemDone(prev as IssueData, c.id, e.target.checked))}
                  className="h-4 w-4"
                />
                <input
                  value={c.text}
                  placeholder="Check logs, restart service, etc."
                  onChange={(e) => onUpdateData((prev) => issueSetField4ItemText(prev as IssueData, c.id, e.target.value))}
                  className="flex-1 rounded-md border px-2 py-1 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
                />
                <button
                  type="button"
                  aria-label="Delete action item"
                  className="text-gray-400 hover:text-accent"
                  onClick={() => onUpdateData((prev) => issueRemoveField4Item(prev as IssueData, c.id))}
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Incident Notes</label>
          <TextareaAutosize
            value={d.field6 ?? ""}
            onChange={(e) => set({ field6: e.target.value })}
            placeholder="Timeline, root cause analysis, lessons learned..."
            className="min-h-20 w-full resize-none rounded-md border bg-white/60 p-3 text-sm leading-6 outline-none placeholder:text-gray-400 transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            minRows={3}
          />
        </div>
      </div>
    );
  }

  // Add simplified renderers for other microservice card types
  if (item.type === "messagequeue") {
    const d = item.data as MessageQueueData;
    const set = (partial: Partial<MessageQueueData>) => onUpdateData((prev) => ({ ...(prev as MessageQueueData), ...partial }));
    const statusColor = d.field3 === "running" ? "text-green-600" : d.field3 === "warning" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Queue/Topic Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-events, order-processing"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Queue Type</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="rabbitmq">RabbitMQ</option>
              <option value="kafka">Apache Kafka</option>
              <option value="sqs">AWS SQS</option>
              <option value="pubsub">Google Pub/Sub</option>
              <option value="redis">Redis Streams</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", statusColor)}
            >
              <option value="running">Running</option>
              <option value="warning">Warning</option>
              <option value="stopped">Stopped</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Message Backlog</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="1,234 messages | 5.2MB"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Producers/Consumers (comma-separated)</label>
          <input
            value={d.field6.join(", ")}
            onChange={(e) => set({ field6: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-service → order-worker, notification-service"
          />
        </div>
      </div>
    );
  }

  if (item.type === "apigateway") {
    const d = item.data as ApiGatewayData;
    const set = (partial: Partial<ApiGatewayData>) => onUpdateData((prev) => ({ ...(prev as ApiGatewayData), ...partial }));
    const statusColor = d.field3 === "active" ? "text-green-600" : d.field3 === "degraded" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Gateway Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="api-gateway, ingress-nginx"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Gateway Type</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="nginx">Nginx</option>
              <option value="traefik">Traefik</option>
              <option value="aws-alb">AWS ALB</option>
              <option value="kong">Kong</option>
              <option value="envoy">Envoy</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", statusColor)}
            >
              <option value="active">Active</option>
              <option value="degraded">Degraded</option>
              <option value="down">Down</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Routing Rules</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="24 routes | Rate limit: 1000/min"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Backend Services (comma-separated)</label>
          <input
            value={d.field6.join(", ")}
            onChange={(e) => set({ field6: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="user-service, order-service, payment-service"
          />
        </div>
      </div>
    );
  }

  if (item.type === "externalservice") {
    const d = item.data as ExternalServiceData;
    const set = (partial: Partial<ExternalServiceData>) => onUpdateData((prev) => ({ ...(prev as ExternalServiceData), ...partial }));
    const statusColor = d.field3 === "connected" ? "text-green-600" : d.field3 === "slow" ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="mt-4 @container">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Service Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="Stripe API, Auth0, Twilio"
          />
        </div>
        <div className="contents @xs:grid gap-3 md:grid-cols-2">
          <div className="@max-xs:mb-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Provider</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent"
            >
              <option value="aws">AWS</option>
              <option value="stripe">Stripe</option>
              <option value="auth0">Auth0</option>
              <option value="twilio">Twilio</option>
              <option value="sendgrid">SendGrid</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Connection Status</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className={cn("w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent", statusColor)}
            >
              <option value="connected">Connected</option>
              <option value="slow">Slow</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">API Version/Endpoint</label>
          <input
            value={d.field5}
            onChange={(e) => set({ field5: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="v2020-08-27 | https://api.stripe.com"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">Dependent Services (comma-separated)</label>
          <input
            value={d.field6.join(", ")}
            onChange={(e) => set({ field6: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50 focus:shadow-sm focus:bg-accent/10 focus:text-accent focus:placeholder:text-accent/65"
            placeholder="payment-service, notification-service"
          />
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




