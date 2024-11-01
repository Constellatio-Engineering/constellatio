// exporting everything from drizzle-orm is correct and needed here because every package needs to import the same drizzle package, because of the type inference
// eslint-disable-next-line barrel-files/avoid-re-export-all
// export * from "drizzle-orm/sql";
export {
  eq, isNull, or, and, sql, desc, count, gt, lt, lte, gte, inArray, min, max, sum, notInArray, not, ne, SQL, asc, type SQLWrapper, between, countDistinct
} from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";
export { getTableColumns } from "drizzle-orm/utils";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

export {
  drizzleServerless,
  schema,
};
