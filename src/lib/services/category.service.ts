"use server";

import db from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function fetchCategories() {
  return db.select().from(categories);
}

export async function createCategory(category: typeof categories.$inferInsert) {
  await db.insert(categories).values(category);
  revalidatePath("/home/settings");
}

export async function deleteCategory(categoryId: number) {
  await db.delete(categories).where(eq(categories.id, categoryId));
  revalidatePath("/home/settings");
}
