"use client";

import { cn } from "@/lib/utils";
import { X, Plus, Play, Square } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { 
  ChartData, EntityData, Item, ItemData, NoteData, ProjectData,
  ApiEndpointData, ApiFlowData, MockServerData, TestSuiteData
} from "@/lib/canvas/types";
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

  // API Endpoint Card
  if (item.type === "api-endpoint") {
    const d = item.data as ApiEndpointData;
    const set = (partial: Partial<ApiEndpointData>) => onUpdateData((prev) => ({ ...(prev as ApiEndpointData), ...partial }));
    
    return (
      <div className="mt-4 space-y-4">
        {/* Method and URL */}
        <div className="grid grid-cols-[100px_1fr] gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Method</label>
            <select
              value={d.method || "GET"}
              onChange={(e) => set({ method: e.target.value })}
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">URL</label>
            <input
              value={d.url || ""}
              onChange={(e) => set({ url: e.target.value })}
              placeholder="https://api.example.com/endpoint"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none"
            />
          </div>
        </div>

        {/* Auth Configuration */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Authentication</label>
          <select
            value={d.authType || "none"}
            onChange={(e) => set({ authType: e.target.value })}
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none"
          >
            <option value="none">None</option>
            <option value="bearer">Bearer Token</option>
            <option value="basic">Basic Auth</option>
            <option value="api-key">API Key</option>
          </select>
        </div>

        {/* Headers */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Headers</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newHeader = {
                  id: String((d.headers_id || 0) + 1),
                  key: "",
                  value: "",
                  enabled: true
                };
                set({ 
                  headers: [...(d.headers || []), newHeader],
                  headers_id: (d.headers_id || 0) + 1
                });
              }}
            >
              <Plus className="size-3.5" />
              Add Header
            </Button>
          </div>
          <div className="space-y-2">
            {(d.headers || []).map((header, i) => (
              <div key={header.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <input
                  value={header.key}
                  onChange={(e) => {
                    const newHeaders = [...(d.headers || [])];
                    newHeaders[i] = { ...header, key: e.target.value };
                    set({ headers: newHeaders });
                  }}
                  placeholder="Header name"
                  className="rounded-md border px-2 py-1 text-sm outline-none"
                />
                <input
                  value={header.value}
                  onChange={(e) => {
                    const newHeaders = [...(d.headers || [])];
                    newHeaders[i] = { ...header, value: e.target.value };
                    set({ headers: newHeaders });
                  }}
                  placeholder="Header value"
                  className="rounded-md border px-2 py-1 text-sm outline-none"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const newHeaders = (d.headers || []).filter((_, idx) => idx !== i);
                    set({ headers: newHeaders });
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Test Button */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            disabled={!d.url || d.status === "pending"}
            onClick={() => {
              set({ status: "pending" });
              // Simulate API call for now
              setTimeout(() => {
                set({ 
                  status: "success",
                  lastResponse: JSON.stringify({ message: "Success" }, null, 2)
                });
              }, 1000);
            }}
          >
            {d.status === "pending" ? <Square className="size-4" /> : <Play className="size-4" />}
            {d.status === "pending" ? "Testing..." : "Test API"}
          </Button>
          <div className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            d.status === "success" && "bg-green-100 text-green-800",
            d.status === "error" && "bg-red-100 text-red-800",
            d.status === "pending" && "bg-yellow-100 text-yellow-800"
          )}>
            {d.status === "idle" ? "Not tested" : d.status}
          </div>
        </div>

        {/* Response Preview */}
        {d.lastResponse && (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Last Response</label>
            <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto max-h-32">
              {d.lastResponse}
            </pre>
          </div>
        )}
      </div>
    );
  }

  // API Flow Card
  if (item.type === "api-flow") {
    const d = item.data as ApiFlowData;
    const set = (partial: Partial<ApiFlowData>) => onUpdateData((prev) => ({ ...(prev as ApiFlowData), ...partial }));
    
    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
          <TextareaAutosize
            value={d.description || ""}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="Describe this API flow..."
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none resize-none"
            minRows={2}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Flow Steps</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newStep = {
                  id: String((d.steps_id || 0) + 1),
                  endpointId: "",
                  condition: "",
                  dataMapping: {},
                  delay: 0
                };
                set({ 
                  steps: [...(d.steps || []), newStep],
                  steps_id: (d.steps_id || 0) + 1
                });
              }}
            >
              <Plus className="size-3.5" />
              Add Step
            </Button>
          </div>
          <div className="space-y-3">
            {(d.steps || []).map((step, i) => (
              <div key={step.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Step {i + 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newSteps = (d.steps || []).filter((_, idx) => idx !== i);
                      set({ steps: newSteps });
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <input
                  value={step.endpointId}
                  onChange={(e) => {
                    const newSteps = [...(d.steps || [])];
                    newSteps[i] = { ...step, endpointId: e.target.value };
                    set({ steps: newSteps });
                  }}
                  placeholder="Endpoint ID"
                  className="w-full rounded-md border px-2 py-1 text-sm outline-none"
                />
                <input
                  value={step.condition || ""}
                  onChange={(e) => {
                    const newSteps = [...(d.steps || [])];
                    newSteps[i] = { ...step, condition: e.target.value };
                    set({ steps: newSteps });
                  }}
                  placeholder="Condition (optional)"
                  className="w-full rounded-md border px-2 py-1 text-sm outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            disabled={!d.steps?.length || d.status === "running"}
            onClick={() => {
              set({ status: "running", currentStep: 0 });
              // Simulate flow execution
              setTimeout(() => {
                set({ status: "completed", currentStep: undefined });
              }, 2000);
            }}
          >
            {d.status === "running" ? <Square className="size-4" /> : <Play className="size-4" />}
            {d.status === "running" ? "Running..." : "Run Flow"}
          </Button>
          <div className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            d.status === "completed" && "bg-green-100 text-green-800",
            d.status === "error" && "bg-red-100 text-red-800",
            d.status === "running" && "bg-blue-100 text-blue-800"
          )}>
            {d.status || "idle"}
          </div>
        </div>
      </div>
    );
  }

  // Mock Server Card
  if (item.type === "mock-server") {
    const d = item.data as MockServerData;
    const set = (partial: Partial<MockServerData>) => onUpdateData((prev) => ({ ...(prev as MockServerData), ...partial }));
    
    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Base URL</label>
            <input
              value={d.baseUrl || ""}
              onChange={(e) => set({ baseUrl: e.target.value })}
              placeholder="http://localhost:3001"
              className="w-full rounded-md border px-2 py-1.5 text-sm outline-none"
            />
          </div>
          <div className="flex items-end">
            <Button
              size="sm"
              variant={d.isRunning ? "destructive" : "default"}
              onClick={() => set({ isRunning: !d.isRunning })}
              className="w-full"
            >
              {d.isRunning ? <Square className="size-4" /> : <Play className="size-4" />}
              {d.isRunning ? "Stop Server" : "Start Server"}
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Mock Routes</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newRoute = {
                  id: String((d.routes_id || 0) + 1),
                  path: "/api/example",
                  method: "GET",
                  statusCode: 200,
                  responseBody: JSON.stringify({ message: "Hello World" }, null, 2),
                  enabled: true
                };
                set({ 
                  routes: [...(d.routes || []), newRoute],
                  routes_id: (d.routes_id || 0) + 1
                });
              }}
            >
              <Plus className="size-3.5" />
              Add Route
            </Button>
          </div>
          <div className="space-y-3">
            {(d.routes || []).map((route, i) => (
              <div key={route.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <select
                      value={route.method}
                      onChange={(e) => {
                        const newRoutes = [...(d.routes || [])];
                        newRoutes[i] = { ...route, method: e.target.value };
                        set({ routes: newRoutes });
                      }}
                      className="rounded border px-2 py-1 text-xs"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <input
                      value={route.path}
                      onChange={(e) => {
                        const newRoutes = [...(d.routes || [])];
                        newRoutes[i] = { ...route, path: e.target.value };
                        set({ routes: newRoutes });
                      }}
                      placeholder="/api/path"
                      className="flex-1 rounded border px-2 py-1 text-xs"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newRoutes = (d.routes || []).filter((_, idx) => idx !== i);
                      set({ routes: newRoutes });
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={route.statusCode}
                    onChange={(e) => {
                      const newRoutes = [...(d.routes || [])];
                      newRoutes[i] = { ...route, statusCode: parseInt(e.target.value) };
                      set({ routes: newRoutes });
                    }}
                    placeholder="200"
                    className="rounded border px-2 py-1 text-xs"
                  />
                  <input
                    type="number"
                    value={route.delay || 0}
                    onChange={(e) => {
                      const newRoutes = [...(d.routes || [])];
                      newRoutes[i] = { ...route, delay: parseInt(e.target.value) };
                      set({ routes: newRoutes });
                    }}
                    placeholder="Delay (ms)"
                    className="rounded border px-2 py-1 text-xs"
                  />
                </div>
                <TextareaAutosize
                  value={route.responseBody}
                  onChange={(e) => {
                    const newRoutes = [...(d.routes || [])];
                    newRoutes[i] = { ...route, responseBody: e.target.value };
                    set({ routes: newRoutes });
                  }}
                  placeholder="Response body (JSON)"
                  className="w-full rounded border px-2 py-1 text-xs resize-none font-mono"
                  minRows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Test Suite Card
  if (item.type === "test-suite") {
    const d = item.data as TestSuiteData;
    const set = (partial: Partial<TestSuiteData>) => onUpdateData((prev) => ({ ...(prev as TestSuiteData), ...partial }));
    
    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
          <TextareaAutosize
            value={d.description || ""}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="Describe this test suite..."
            className="w-full rounded-md border px-2 py-1.5 text-sm outline-none resize-none"
            minRows={2}
          />
        </div>

        {/* Test Statistics */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">{d.passedTests || 0}</div>
            <div className="text-xs text-gray-500">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">{d.failedTests || 0}</div>
            <div className="text-xs text-gray-500">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{d.totalTests || 0}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Test Cases</label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const newTest = {
                    id: String((d.testCases_id || 0) + 1),
                    name: "New Test",
                    endpointId: "",
                    assertions: [],
                    status: "pending" as const
                  };
                  set({ 
                    testCases: [...(d.testCases || []), newTest],
                    testCases_id: (d.testCases_id || 0) + 1
                  });
                }}
              >
                <Plus className="size-3.5" />
                Add Test
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // Simulate running all tests
                  const tests = d.testCases || [];
                  const passed = Math.floor(Math.random() * tests.length);
                  const failed = tests.length - passed;
                  set({ 
                    passedTests: passed,
                    failedTests: failed,
                    totalTests: tests.length,
                    lastRun: new Date().toISOString()
                  });
                }}
              >
                <Play className="size-3.5" />
                Run All
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {(d.testCases || []).map((test, i) => (
              <div key={test.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <input
                    value={test.name}
                    onChange={(e) => {
                      const newTests = [...(d.testCases || [])];
                      newTests[i] = { ...test, name: e.target.value };
                      set({ testCases: newTests });
                    }}
                    className="font-medium bg-transparent outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      test.status === "passed" && "bg-green-100 text-green-800",
                      test.status === "failed" && "bg-red-100 text-red-800",
                      test.status === "pending" && "bg-gray-100 text-gray-800"
                    )}>
                      {test.status}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newTests = (d.testCases || []).filter((_, idx) => idx !== i);
                        set({ testCases: newTests });
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
                <input
                  value={test.endpointId}
                  onChange={(e) => {
                    const newTests = [...(d.testCases || [])];
                    newTests[i] = { ...test, endpointId: e.target.value };
                    set({ testCases: newTests });
                  }}
                  placeholder="Endpoint ID to test"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default CardRenderer;




