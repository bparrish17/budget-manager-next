import type { User } from "@/lib/definitions";
import postgres from "postgres";
import db, { UserSchema } from "@/db";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(email: string, passwordHashed: string) {
  try {
    await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${passwordHashed})
    `;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function searchUsers() {
  try {
    const users = await db.select().from(UserSchema);
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch user.");
  }
}
