"use server";

import db from "@/db";
import { categories, transactions } from "@/db/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { getUserId, whereUserId, withPagination } from "./db.service";

export async function searchTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
  });
}

export async function searchExpenses() {
  const userId = await getUserId();
  const query = db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      date: transactions.date,
      title: transactions.title,
      category: {
        id: categories.id,
        title: categories.title,
        color: categories.color,
      },
    })
    .from(transactions)
    .where(and(eq(transactions.userId, userId), lt(transactions.amount, 0)))
    .fullJoin(categories, eq(transactions.categoryId, categories.id))
    .$dynamic();

  return withPagination(query, 1, 50);

  // return db.query.transactions.findMany({
  //   with: {
  //     category: true,
  //   },
  //   where: and(eq(transactions.userId, userId), lt(transactions.amount, 0)),
  //   limit: 10,
  // });
}

export async function searchIncome() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: gt(transactions.amount, 0),
  });
}

export type TTransaction = typeof transactions.$inferSelect;
export type TInsertTransaction = typeof transactions.$inferInsert;
export type TUpdateTransaction = Omit<typeof transactions.$inferSelect, "createdAt" | "userId">;
