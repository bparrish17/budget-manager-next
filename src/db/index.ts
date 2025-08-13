import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const sqlClient = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  prepare: false,
});

export default drizzle({ client: sqlClient, schema });
