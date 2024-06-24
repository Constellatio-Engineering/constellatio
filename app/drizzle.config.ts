/* eslint-disable import/no-unused-modules */

// import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import * as process from "process";

// dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if(!connectionString)
{
  throw new Error("Environment variable 'DATABASE_URL' is missing. Please check your .env file.");
}

console.log("drizzle.config.ts: connectionString", connectionString);

const config: Config = {
  dbCredentials: {
    url: connectionString,
  },
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  strict: true,
};

export default config;
