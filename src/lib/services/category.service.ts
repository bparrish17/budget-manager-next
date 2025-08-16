"use server";

import db from "@/db";
import { categories } from "@/db/schema";

export async function fetchCategories() {
  return db.select().from(categories);
}

export async function createCategory(category: typeof categories.$inferInsert) {
  return db.insert(categories).values(category).returning();
}
