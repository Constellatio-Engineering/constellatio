/* eslint-disable barrel-files/avoid-re-export-all,barrel-files/avoid-barrel-files */

// exporting everything from drizzle-orm is correct and needed here because every package needs to import the same drizzle package, because of the type inference

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";
export { getTableColumns } from "drizzle-orm/utils";
export { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
export * as schema from "./schema";
