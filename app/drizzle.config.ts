/* eslint-disable import/no-unused-modules */

import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import * as process from "process";

dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if(!connectionString)
{
  throw new Error("Environment variable 'DATABASE_URL' is missing. Please check your .env file.");
}

const config: Config = {
  dbCredentials: {
    connectionString,
  },
  driver: "pg",
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
};

export default config;
