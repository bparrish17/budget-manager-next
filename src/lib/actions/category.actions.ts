"use server";

import { createCategory } from "../services/category.service";
import { categories } from "@/db/schema";

export const createCategoryAction = async (
  category: typeof categories.$inferInsert
) => {
  try {
    await createCategory(category);
    return category;
  } catch (e) {
    console.error("e", e);
    return null;
  }
};
