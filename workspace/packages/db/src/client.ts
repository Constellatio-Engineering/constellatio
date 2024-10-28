import { type ExtractTablesWithRelations } from "drizzle-orm";
import { type PgTransaction } from "drizzle-orm/pg-core";
import { drizzle, type PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { env } from "@constellatio/env";

const connectionString = env.DATABASE_URL;

console.log("drizzle.config.ts", env);
console.log("connectionString", connectionString);

// automatically close connections that have either been idle for 10 seconds or existed for more than 10 minutes
const client = postgres(connectionString, {
  connect_timeout: 10,
  connection: {
    application_name: `Constellatio-Web-App-${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`
  },
  idle_timeout: 10,
  max: env.POSTGRES_MAX_CONNECTIONS,
  max_lifetime: 60 * 10,
  prepare: false
});

export const db = drizzle(client, { schema });

type Db = typeof db;
type Transaction = PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;
export type DbConnection = Db | Transaction;
