"use server";

import db from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { insertWithUserId, whereUserId } from "./db.service";

export async function fetchCategories() {
  return whereUserId(db.select().from(categories).$dynamic(), categories.userId);
}

export async function createCategory(category: TInsertCategory) {
  await insertWithUserId<typeof categories, TInsertCategory>(categories, category);
  revalidatePath("/home/settings");
}

export async function deleteCategory(categoryId: number) {
  await db.delete(categories).where(eq(categories.id, categoryId));
  revalidatePath("/home/settings");
}

export async function updateCategory(category: TUpdateCategory) {
  await db.update(categories).set(category).where(eq(categories.id, category.id));
  revalidatePath("/home/settings");
}

export type TCategory = typeof categories.$inferSelect;
export type TInsertCategory = typeof categories.$inferInsert;
export type TUpdateCategory = Omit<typeof categories.$inferSelect, "createdAt" | "userId">;
