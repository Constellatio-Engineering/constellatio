import { defineConfig } from "drizzle-kit";

// eslint-disable-next-line barrel-files/avoid-namespace-import
import * as process from "process";

const connectionString = process.env.DATABASE_URL;

if(!connectionString)
{
  throw new Error("Environment variable 'DATABASE_URL' is missing. Please check your .env file.");
}

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
