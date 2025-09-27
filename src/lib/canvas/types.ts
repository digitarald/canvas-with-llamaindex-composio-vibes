export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  proposed: boolean;
}

export interface LinkItem {
  title: string;
  url: string;
}

export type CardType = "project" | "entity" | "note" | "chart" | "api-endpoint" | "api-flow" | "mock-server" | "test-suite";

export interface ProjectData {
  field1: string; // text
  field2: string; // select
  field3: string; // date
  field4: ChecklistItem[]; // checklist
  field4_id: number; // id counter
}

export interface EntityData {
  field1: string; // text
  field2: string; // select
  field3: string[]; // tags
  field3_options: string[]; // options
}

export interface NoteData {
  field1?: string; // textarea
}

export interface ChartMetric {
  id: string;
  label: string;
  value: number | ""; // 0..100
}

export interface ChartData {
  field1: ChartMetric[]; // metrics
  field1_id: number; // id counter
}

// API Integration Card Types
export interface HttpHeader {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiEndpointData {
  method: string; // GET, POST, PUT, DELETE, etc.
  url: string;
  headers: HttpHeader[];
  authType: string; // none, bearer, basic, api-key
  authConfig: Record<string, string>; // flexible auth config
  requestSchema?: string; // JSON schema or example
  responseSchema?: string; // JSON schema or example
  description: string;
  status: "idle" | "pending" | "success" | "error";
  lastResponse?: string;
  lastError?: string;
  headers_id: number; // id counter for headers
}

export interface FlowStep {
  id: string;
  endpointId: string; // reference to API endpoint card
  condition?: string; // conditional logic
  dataMapping: Record<string, string>; // map response data to next request
  delay?: number; // delay in milliseconds
}

export interface ApiFlowData {
  steps: FlowStep[];
  description: string;
  status: "idle" | "running" | "completed" | "error";
  currentStep?: number;
  results: Record<string, unknown>; // execution results
  steps_id: number; // id counter
}

export interface MockRoute {
  id: string;
  path: string;
  method: string;
  statusCode: number;
  responseBody: string;
  delay?: number;
  enabled: boolean;
}

export interface MockServerData {
  routes: MockRoute[];
  baseUrl: string;
  description: string;
  isRunning: boolean;
  routes_id: number; // id counter
}

export interface TestCase {
  id: string;
  name: string;
  endpointId: string; // reference to API endpoint card
  assertions: TestAssertion[];
  status: "pending" | "passed" | "failed" | "skipped";
  lastRun?: string;
  duration?: number;
}

export interface TestAssertion {
  id: string;
  type: "status" | "header" | "body" | "response-time";
  field?: string; // for header/body assertions
  operator: "equals" | "contains" | "greater-than" | "less-than";
  expected: string;
  actual?: string;
  passed?: boolean;
}

export interface TestSuiteData {
  testCases: TestCase[];
  description: string;
  coverage: number; // percentage
  totalTests: number;
  passedTests: number;
  failedTests: number;
  lastRun?: string;
  testCases_id: number; // id counter
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | ApiEndpointData | ApiFlowData | MockServerData | TestSuiteData;

export interface Item {
  id: string;
  type: CardType;
  name: string; // editable title
  subtitle: string; // subtitle shown under the title
  data: ItemData;
}

export interface AgentState {
  items: Item[];
  globalTitle: string;
  globalDescription: string;
  lastAction?: string;
  itemsCreated: number;
  syncSheetId?: string; // Google Sheet ID for auto-sync
  syncSheetName?: string; // Google Sheet name that was imported from
}




