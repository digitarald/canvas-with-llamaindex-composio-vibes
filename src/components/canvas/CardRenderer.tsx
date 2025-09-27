"use client";

import { cn } from "@/lib/utils";
import { X, Plus, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Clock, Users, Activity, Database, Zap } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import type { ChartData, EntityData, Item, ItemData, NoteData, ProjectData, KPIData, ProcessData, CapacityData, IntegrationData, AlertData } from "@/lib/canvas/types";
import { 
  chartAddField1Metric, chartRemoveField1Metric, chartSetField1Label, chartSetField1Value, 
  projectAddField4Item, projectRemoveField4Item, projectSetField4ItemDone, projectSetField4ItemText,
  kpiAddField1Metric, kpiSetField1MetricValue, kpiSetField1MetricTrend, kpiRemoveField1Metric,
  processAddField2Step, processSetField2StepStatus, processRemoveField2Step,
  capacityAddField1Member, capacitySetField1MemberWorkload, capacityRemoveField1Member,
  integrationAddField1Status, integrationSetField1Status, integrationRemoveField1Status,
  alertAddField1Rule, alertSetField1RuleStatus, alertRemoveField1Rule
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
      </div>
    );
  }

  if (item.type === "kpi") {
    const d = item.data as KPIData;
    const set = (partial: Partial<KPIData>) => onUpdateData((prev) => ({ ...(prev as KPIData), ...partial }));
    
    const getTrendIcon = (trend: string) => {
      switch (trend) {
        case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
        case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
        case "stable": return <Minus className="h-4 w-4 text-yellow-500" />;
        default: return null;
      }
    };

    return (
      <div className="mt-4">
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Time Period</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="growth">Growth</option>
              <option value="revenue">Revenue</option>
              <option value="engagement">Engagement</option>
              <option value="performance">Performance</option>
            </select>
          </div>
        </div>
        
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">KPI Metrics</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => kpiAddField1Metric(prev as KPIData, "", "", "", "").next)}
          >
            <Plus className="size-3.5" />
            Add KPI
          </button>
        </div>
        
        <div className="space-y-3">
          {(!d.field1 || d.field1.length === 0) && (
            <div className="grid place-items-center py-4 text-xs text-primary/50 font-medium">
              No KPIs yet. Add metrics to track performance.
            </div>
          )}
          {d.field1.map((kpi, i) => (
            <div key={kpi.id} className="border rounded-lg p-3 bg-gray-50/50">
              <div className="flex items-center justify-between mb-2">
                <input
                  value={kpi.name}
                  placeholder="KPI Name"
                  onChange={(e) => onUpdateData((prev) => {
                    const next = [...(prev as KPIData).field1];
                    next[i] = { ...next[i], name: e.target.value };
                    return { ...prev, field1: next };
                  })}
                  className="font-medium text-sm bg-transparent border-none outline-none flex-1"
                />
                <button
                  type="button"
                  onClick={() => onUpdateData((prev) => kpiRemoveField1Metric(prev as KPIData, i))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpi.value}
                    placeholder="Value"
                    onChange={(e) => onUpdateData((prev) => kpiSetField1MetricValue(prev as KPIData, i, e.target.value === "" ? "" : Number(e.target.value)))}
                    className="w-20 text-sm border rounded px-2 py-1"
                  />
                  <input
                    value={kpi.unit}
                    placeholder="Unit"
                    onChange={(e) => onUpdateData((prev) => {
                      const next = [...(prev as KPIData).field1];  
                      next[i] = { ...next[i], unit: e.target.value };
                      return { ...prev, field1: next };
                    })}
                    className="w-16 text-xs border rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={kpi.trend}
                    onChange={(e) => onUpdateData((prev) => kpiSetField1MetricTrend(prev as KPIData, i, e.target.value as any))}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="">No trend</option>
                    <option value="up">Trending Up</option>
                    <option value="down">Trending Down</option>
                    <option value="stable">Stable</option>
                  </select>
                  {getTrendIcon(kpi.trend)}
                </div>
              </div>
              <input
                value={kpi.source}
                placeholder="Data Source (e.g., Stripe, GA4)"
                onChange={(e) => onUpdateData((prev) => {
                  const next = [...(prev as KPIData).field1];
                  next[i] = { ...next[i], source: e.target.value };
                  return { ...prev, field1: next };
                })}
                className="w-full text-xs border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "process") {
    const d = item.data as ProcessData;
    const set = (partial: Partial<ProcessData>) => onUpdateData((prev) => ({ ...(prev as ProcessData), ...partial }));
    
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "in_progress": return <Clock className="h-4 w-4 text-blue-500" />;
        case "blocked": return <AlertTriangle className="h-4 w-4 text-red-500" />;
        default: return <Clock className="h-4 w-4 text-gray-400" />;
      }
    };

    return (
      <div className="mt-4">
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Process Name</label>
          <input
            value={d.field1}
            onChange={(e) => set({ field1: e.target.value })}
            placeholder="e.g., Sales Workflow, Hiring Process"
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
          />
        </div>
        
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Process Type</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="general">General</option>
              <option value="sales">Sales</option>
              <option value="hiring">Hiring</option>
              <option value="product_release">Product Release</option>
              <option value="customer_onboarding">Customer Onboarding</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Automation Level</label>
            <select
              value={d.field4}
              onChange={(e) => set({ field4: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="manual">Manual</option>
              <option value="semi_automated">Semi-Automated</option>
              <option value="automated">Fully Automated</option>
            </select>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Process Steps</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => processAddField2Step(prev as ProcessData, "").next)}
          >
            <Plus className="size-3.5" />
            Add Step
          </button>
        </div>

        <div className="space-y-2">
          {(!d.field2 || d.field2.length === 0) && (
            <div className="grid place-items-center py-4 text-xs text-primary/50 font-medium">
              No steps defined. Add steps to map your process.
            </div>
          )}
          {d.field2.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3 p-2 border rounded-lg">
              <span className="text-xs font-mono text-muted-foreground/80">{String(i + 1).padStart(2, "0")}</span>
              {getStatusIcon(step.status)}
              <input
                value={step.name}
                placeholder="Step description"
                onChange={(e) => onUpdateData((prev) => {
                  const next = [...(prev as ProcessData).field2];
                  next[i] = { ...next[i], name: e.target.value };
                  return { ...prev, field2: next };
                })}
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <select
                value={step.status}
                onChange={(e) => onUpdateData((prev) => processSetField2StepStatus(prev as ProcessData, step.id, e.target.value as any))}
                className="text-xs border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
              <button
                type="button"
                onClick={() => onUpdateData((prev) => processRemoveField2Step(prev as ProcessData, step.id))}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "capacity") {
    const d = item.data as CapacityData;
    const set = (partial: Partial<CapacityData>) => onUpdateData((prev) => ({ ...(prev as CapacityData), ...partial }));

    return (
      <div className="mt-4">
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Team/Department</label>
            <input
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              placeholder="e.g., Engineering, Sales"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors placeholder:text-gray-400 hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Planning Period</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="current_sprint">Current Sprint</option>
              <option value="next_sprint">Next Sprint</option>
              <option value="current_quarter">Current Quarter</option>
              <option value="next_quarter">Next Quarter</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-500">Overall Team Utilization</label>
          <div className="flex items-center gap-3">
            <Progress value={d.field4} className="flex-1" />
            <span className="text-sm font-mono w-12">{d.field4}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={d.field4}
              onChange={(e) => set({ field4: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Team Members</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => capacityAddField1Member(prev as CapacityData, "", "").next)}
          >
            <Plus className="size-3.5" />
            Add Member
          </button>
        </div>

        <div className="space-y-3">
          {(!d.field1 || d.field1.length === 0) && (
            <div className="grid place-items-center py-4 text-xs text-primary/50 font-medium">
              No team members added. Add members to track capacity.
            </div>
          )}
          {d.field1.map((member, i) => (
            <div key={member.id} className="border rounded-lg p-3 bg-gray-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <input
                    value={member.name}
                    placeholder="Member Name"
                    onChange={(e) => onUpdateData((prev) => {
                      const next = [...(prev as CapacityData).field1];
                      next[i] = { ...next[i], name: e.target.value };
                      return { ...prev, field1: next };
                    })}
                    className="font-medium text-sm bg-transparent border-none outline-none flex-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateData((prev) => capacityRemoveField1Member(prev as CapacityData, i))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <input
                  value={member.role}
                  placeholder="Role"
                  onChange={(e) => onUpdateData((prev) => {
                    const next = [...(prev as CapacityData).field1];
                    next[i] = { ...next[i], role: e.target.value };
                    return { ...prev, field1: next };
                  })}
                  className="text-sm border rounded px-2 py-1"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs">Capacity:</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={member.capacity}
                    onChange={(e) => onUpdateData((prev) => {
                      const next = [...(prev as CapacityData).field1];
                      next[i] = { ...next[i], capacity: Number(e.target.value) };
                      return { ...prev, field1: next };
                    })}
                    className="w-16 text-xs border rounded px-2 py-1"
                  />
                  <span className="text-xs">%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium">Workload:</span>
                <Progress value={member.workload} className="flex-1" />
                <span className="text-xs font-mono w-10">{member.workload}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={member.workload}
                  onChange={(e) => onUpdateData((prev) => capacitySetField1MemberWorkload(prev as CapacityData, i, Number(e.target.value)))}
                  className="w-16"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "integration") {
    const d = item.data as IntegrationData;
    const set = (partial: Partial<IntegrationData>) => onUpdateData((prev) => ({ ...(prev as IntegrationData), ...partial }));
    
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "connected": return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "syncing": return <Activity className="h-4 w-4 text-blue-500" />;
        case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
        default: return <Database className="h-4 w-4 text-gray-400" />;
      }
    };

    return (
      <div className="mt-4">
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Sync Frequency</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">System Health</label>
            <div className="flex items-center gap-2">
              <Progress value={d.field3} className="flex-1" />
              <span className="text-sm font-mono w-12">{d.field3}%</span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Integrations</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => integrationAddField1Status(prev as IntegrationData, "").next)}
          >
            <Plus className="size-3.5" />
            Add Integration
          </button>
        </div>

        <div className="space-y-3">
          {(!d.field1 || d.field1.length === 0) && (
            <div className="grid place-items-center py-4 text-xs text-primary/50 font-medium">
              No integrations configured. Add tools to monitor data pipelines.
            </div>
          )}
          {d.field1.map((integration, i) => (
            <div key={integration.id} className="border rounded-lg p-3 bg-gray-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon(integration.status)}
                  <input
                    value={integration.name}
                    placeholder="Integration Name (e.g., Stripe, Mixpanel)"
                    onChange={(e) => onUpdateData((prev) => {
                      const next = [...(prev as IntegrationData).field1];
                      next[i] = { ...next[i], name: e.target.value };
                      return { ...prev, field1: next };
                    })}
                    className="font-medium text-sm bg-transparent border-none outline-none flex-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateData((prev) => integrationRemoveField1Status(prev as IntegrationData, i))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <select
                  value={integration.status}
                  onChange={(e) => onUpdateData((prev) => integrationSetField1Status(prev as IntegrationData, i, e.target.value as any))}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="disconnected">Disconnected</option>
                  <option value="connected">Connected</option>
                  <option value="syncing">Syncing</option>
                  <option value="error">Error</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Health:</span>
                  <Progress value={integration.dataHealth} className="flex-1" />
                  <span className="text-xs font-mono">{integration.dataHealth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Errors: {integration.errorCount}</span>
                <span>Last sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleDateString() : "Never"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "alert") {
    const d = item.data as AlertData;
    const set = (partial: Partial<AlertData>) => onUpdateData((prev) => ({ ...(prev as AlertData), ...partial }));
    
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "triggered": return <AlertTriangle className="h-4 w-4 text-red-500" />;
        case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "disabled": return <X className="h-4 w-4 text-gray-400" />;
        default: return <Zap className="h-4 w-4 text-blue-500" />;
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "critical": return "text-red-600 bg-red-50 border-red-200";
        case "high": return "text-orange-600 bg-orange-50 border-orange-200";
        case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
        default: return "text-gray-600 bg-gray-50 border-gray-200";
      }
    };

    return (
      <div className="mt-4">
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Notification Channel</label>
            <select
              value={d.field2}
              onChange={(e) => set({ field2: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="slack">Slack</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="webhook">Webhook</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Alert Category</label>
            <select
              value={d.field3}
              onChange={(e) => set({ field3: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none transition-colors hover:ring-1 hover:ring-border focus:ring-2 focus:ring-accent/50"
            >
              <option value="performance">Performance</option>
              <option value="capacity">Capacity</option>
              <option value="revenue">Revenue</option>
              <option value="security">Security</option>
              <option value="usage">Usage</option>
            </select>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Alert Rules</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            onClick={() => onUpdateData((prev) => alertAddField1Rule(prev as AlertData, "").next)}
          >
            <Plus className="size-3.5" />
            Add Rule
          </button>
        </div>

        <div className="space-y-3">
          {(!d.field1 || d.field1.length === 0) && (
            <div className="grid place-items-center py-4 text-xs text-primary/50 font-medium">
              No alert rules configured. Add rules to monitor thresholds.
            </div>
          )}
          {d.field1.map((rule, i) => (
            <div key={rule.id} className={`border rounded-lg p-3 bg-gray-50/50 ${getPriorityColor(rule.priority)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon(rule.status)}
                  <input
                    value={rule.name}
                    placeholder="Alert Rule Name"
                    onChange={(e) => onUpdateData((prev) => {
                      const next = [...(prev as AlertData).field1];
                      next[i] = { ...next[i], name: e.target.value };
                      return { ...prev, field1: next };
                    })}
                    className="font-medium text-sm bg-transparent border-none outline-none flex-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateData((prev) => alertRemoveField1Rule(prev as AlertData, i))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <select
                  value={rule.priority}
                  onChange={(e) => onUpdateData((prev) => {
                    const next = [...(prev as AlertData).field1];
                    next[i] = { ...next[i], priority: e.target.value as any };
                    return { ...prev, field1: next };
                  })}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
                <select
                  value={rule.status}
                  onChange={(e) => onUpdateData((prev) => alertSetField1RuleStatus(prev as AlertData, i, e.target.value as any))}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="triggered">Triggered</option>
                  <option value="resolved">Resolved</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <input
                  value={rule.condition}
                  placeholder="Alert condition"
                  onChange={(e) => onUpdateData((prev) => {
                    const next = [...(prev as AlertData).field1];
                    next[i] = { ...next[i], condition: e.target.value };
                    return { ...prev, field1: next };
                  })}
                  className="text-sm border rounded px-2 py-1"
                />
                <input
                  type="number"
                  value={rule.threshold}
                  placeholder="Threshold"
                  onChange={(e) => onUpdateData((prev) => {
                    const next = [...(prev as AlertData).field1];
                    next[i] = { ...next[i], threshold: Number(e.target.value) };
                    return { ...prev, field1: next };
                  })}
                  className="text-sm border rounded px-2 py-1"
                />
              </div>
              <input
                value={rule.action}
                placeholder="Prescribed action when triggered"
                onChange={(e) => onUpdateData((prev) => {
                  const next = [...(prev as AlertData).field1];
                  next[i] = { ...next[i], action: e.target.value };
                  return { ...prev, field1: next };
                })}
                className="w-full text-sm border rounded px-2 py-1"
              />
            </div>
          ))}
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




