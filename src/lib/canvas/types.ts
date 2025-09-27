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

export type CardType = "project" | "entity" | "note" | "chart" | "service" | "database" | "message-queue" | "api-gateway" | "external-service" | "issue";

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

// Microservices architecture types
export type HealthStatus = "healthy" | "warning" | "critical" | "unknown";

export interface ServiceData {
  field1: string; // service name/endpoint
  field2: HealthStatus; // health status
  field3: string; // version/deployment info
  field4: string; // resource usage (CPU/Memory)
  field5: string[]; // dependencies (connected services)
}

export interface DatabaseData {
  field1: string; // database name/connection string
  field2: HealthStatus; // health status
  field3: string; // database type (PostgreSQL, MongoDB, etc.)
  field4: string; // connection pool info
  field5: string; // query performance metrics
}

export interface MessageQueueData {
  field1: string; // queue/topic name
  field2: HealthStatus; // health status
  field3: string; // queue type (RabbitMQ, Kafka, etc.)
  field4: string; // throughput metrics
  field5: string[]; // connected services
}

export interface ApiGatewayData {
  field1: string; // gateway name/endpoint
  field2: HealthStatus; // health status
  field3: string; // routing rules summary
  field4: string; // rate limits
  field5: string; // traffic distribution
}

export interface ExternalServiceData {
  field1: string; // service name/API
  field2: HealthStatus; // health status
  field3: string; // service type (SaaS, third-party API, etc.)
  field4: string; // SLA/uptime info
  field5: string; // integration details
}

export interface IssueData {
  field1: string; // issue title/description
  field2: string; // severity (critical, high, medium, low)
  field3: string; // status (open, investigating, resolved)
  field4: string; // affected services
  field5: string; // resolution notes
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | ServiceData | DatabaseData | MessageQueueData | ApiGatewayData | ExternalServiceData | IssueData;

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




