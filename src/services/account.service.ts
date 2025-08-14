import db from "@/db";
import { accounts } from "@/db/schema";

export function fetchAccounts() {
  return db.select().from(accounts);
}
