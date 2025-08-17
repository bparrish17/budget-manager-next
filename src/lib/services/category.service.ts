"use server";

import { auth } from "@/auth";
import db from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function fetchCategories() {
  return db.select().from(categories);
}

export async function createCategory(category: TInsertCategory) {
  await db.insert(categories).values(category);
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

export type TSelectCategory = typeof categories.$inferSelect;
export type TInsertCategory = typeof categories.$inferInsert;
export type TUpdateCategory = Omit<typeof categories.$inferSelect, "createdAt" | "userId">;
