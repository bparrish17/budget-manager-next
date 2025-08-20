"use server";

import db from "@/db";
import { categories, transactions } from "@/db/schema";
import { and, asc, eq, gt, gte, lt, lte } from "drizzle-orm";
import { getUserId, whereUserId, withPagination } from "./db.service";

function getExpenseFilters(userId: string) {
  return and(
    eq(transactions.userId, userId),
    lt(transactions.amount, 0),
    gte(transactions.date, "2025-01-01"),
    lte(transactions.date, "2025-12-31")
  );
}

export async function searchTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
  });
}

interface PageProps {
  page: number;
  pageSize: number;
}

export async function getExpensesCount(pageSize: number) {
  const userId = await getUserId();
  const total = await db.$count(transactions, getExpenseFilters(userId));
  return {
    total: total,
    pages: Math.ceil(total / pageSize),
  };
}

export async function searchExpenses({ page, pageSize }: PageProps) {
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
    .orderBy(asc(transactions.date))
    .where(getExpenseFilters(userId))
    .fullJoin(categories, eq(transactions.categoryId, categories.id))
    .$dynamic();

  return withPagination(query, page, pageSize);

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
