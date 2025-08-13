import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export * from "./schema";

const sqlClient = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  prepare: false,
});

export default drizzle(sqlClient);
