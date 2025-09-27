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

export type CardType = "project" | "entity" | "note" | "chart" | "table" | "relationship" | "migration" | "query";

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

// Database Schema Design Types
export interface ColumnDefinition {
  id: string;
  name: string;
  dataType: string; // VARCHAR(255), INTEGER, BOOLEAN, etc.
  nullable: boolean;
  primaryKey: boolean;
  unique: boolean;
  defaultValue: string;
  comment: string;
}

export interface IndexDefinition {
  id: string;
  name: string;
  columns: string[]; // column names
  unique: boolean;
  type: string; // BTREE, HASH, etc.
}

export interface TableData {
  field1: string; // table name
  field2: ColumnDefinition[]; // columns
  field2_id: number; // column id counter
  field3: IndexDefinition[]; // indexes
  field3_id: number; // index id counter
  field4: string; // table comment/description
}

export interface RelationshipData {
  field1: string; // relationship name
  field2: string; // source table id
  field3: string; // target table id
  field4: string[]; // source column names
  field5: string[]; // target column names
  field6: string; // relationship type: "one-to-one" | "one-to-many" | "many-to-many"
  field7: string; // on delete action: "CASCADE" | "SET NULL" | "RESTRICT" | "NO ACTION"
  field8: string; // on update action: "CASCADE" | "SET NULL" | "RESTRICT" | "NO ACTION"
}

export interface MigrationStep {
  id: string;
  type: string; // "CREATE_TABLE" | "ALTER_TABLE" | "DROP_TABLE" | "CREATE_INDEX" | "DROP_INDEX"
  sql: string; // SQL statement
  rollback: string; // rollback SQL statement
  description: string;
}

export interface MigrationData {
  field1: string; // migration name
  field2: string; // version/timestamp
  field3: MigrationStep[]; // migration steps
  field3_id: number; // step id counter
  field4: string; // migration status: "pending" | "applied" | "failed" | "rolled_back"
  field5: string; // migration description
}

export interface QueryData {
  field1: string; // query name
  field2: string; // SQL query
  field3: string; // query description
  field4: string; // query type: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "VIEW" | "PROCEDURE"
  field5: string[]; // tags for categorization
}

export type ItemData = ProjectData | EntityData | NoteData | ChartData | TableData | RelationshipData | MigrationData | QueryData;

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




