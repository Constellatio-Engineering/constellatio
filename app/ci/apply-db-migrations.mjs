import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if(!connectionString)
{
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString, {
  max: 1,
  connect_timeout: 10,
  connection: {
    application_name: `CI_Constellatio-Web-App-${process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT}`
  },
  idle_timeout: 10,
  max_lifetime: 60 * 10,
  ...(process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development" && {
    prepare: false
  })
});
const db = drizzle(client);

try
{
  await migrate(db, { migrationsFolder: "src/db/migrations" });
}
catch (e)
{
  console.log("Error while applying migrations:", e);
  process.exit(1);
}

console.log("Migrations applied successfully");
process.exit(0);
