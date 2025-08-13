import db from "@/db";
import { users as Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(email: string) {
  try {
    await db.insert(Users).values({ email, password: "hello world" });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function searchUsers() {
  return db.select().from(Users);
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(Users.email, email) });
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({ where: eq(Users.id, id) });
}
