import db from "@/db";
import { categories } from "@/db/schema";

export function fetchCategories() {
  return db.select().from(categories);
}
