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

export type CardType = "project" | "entity" | "note" | "chart" | "service" | "database" | "messagequeue" | "apigateway" | "externalservice" | "issue";

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

export interface ServiceData {
  field1: string; // service name/identifier
  field2: string; // health status (healthy/warning/error)
  field3: string; // service type (web/api/worker/etc)
  field4: ChartMetric[]; // resource metrics (CPU, Memory, etc)
  field4_id: number; // metrics id counter
  field5: string; // deployment info/version
  field6: string[]; // dependencies (other service names)
}

export interface DatabaseData {
  field1: string; // database name
  field2: string; // database type (postgresql/mysql/mongodb/etc)
  field3: string; // connection status
  field4: ChartMetric[]; // performance metrics
  field4_id: number; // metrics id counter
  field5: string; // schema info/size
  field6: string[]; // connected services
}

export interface MessageQueueData {
  field1: string; // queue/topic name
  field2: string; // queue type (rabbitmq/kafka/sqs/etc)
  field3: string; // status
  field4: ChartMetric[]; // throughput metrics
  field4_id: number; // metrics id counter
  field5: string; // message count/backlog
  field6: string[]; // producers/consumers
}

export interface ApiGatewayData {
  field1: string; // gateway name
  field2: string; // gateway type (nginx/traefik/aws-alb/etc)
  field3: string; // status
  field4: ChartMetric[]; // traffic metrics
  field4_id: number; // metrics id counter
  field5: string; // routing rules count
  field6: string[]; // backend services
}

export interface ExternalServiceData {
  field1: string; // service name
  field2: string; // service provider (aws/stripe/auth0/etc)
  field3: string; // connection status
  field4: ChartMetric[]; // usage metrics
  field4_id: number; // metrics id counter
  field5: string; // API version/endpoint
  field6: string[]; // dependent internal services
}

export interface IssueData {
  field1: string; // issue title
  field2: string; // severity (critical/high/medium/low)
  field3: string; // status (open/investigating/resolved)
  field4: ChecklistItem[]; // action items/debugging steps
  field4_id: number; // checklist id counter
  field5: string; // affected services
  field6: string; // incident timeline/notes
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




