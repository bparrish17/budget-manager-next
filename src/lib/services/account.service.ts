"use server";

import db from "@/db";
import { accounts } from "@/db/schema";

export async function fetchAccounts() {
  return db.select().from(accounts);
}
