import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { env } from "../env.mjs";

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString, {
  max: env.POSTGRES_MAX_CONNECTIONS,
});
export const db = drizzle(client, { schema });
