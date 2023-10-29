import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { env } from "../env.mjs";

const connectionString = env.DATABASE_URL;

// automatically close connections that have either been idle for 10 seconds or existed for more than 10 minutes
const client = postgres(connectionString, {
  connect_timeout: 10,
  connection: {
    application_name: `Constellatio-Web-App-${env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`
  },
  idle_timeout: 10,
  max: env.POSTGRES_MAX_CONNECTIONS,
  max_lifetime: 60 * 10
});

export const db = drizzle(client, { schema });
