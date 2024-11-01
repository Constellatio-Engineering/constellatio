import { defineConfig } from "drizzle-kit";

import * as process from "process";

const connectionString = process.env.DATABASE_URL;

if(!connectionString)
{
  throw new Error("Environment variable 'DATABASE_URL' is missing. Please check your .env file.");
}

console.log("drizzle.config.ts: connectionString", connectionString);

export default defineConfig({
  dbCredentials: {
    url: connectionString,
  },
  dialect: "postgresql",
  out: "./migrations",
  schema: "./src/schema.ts",
  schemaFilter: ["public"],
  strict: false,
  verbose: true,
});
