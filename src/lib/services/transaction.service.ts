"use server";

import db from "@/db";
import { categories, transactions } from "@/db/schema";
import { and, asc, eq, gt, gte, lt, lte, avg, sum } from "drizzle-orm";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { getUserId, withPagination } from "./db.service";
import { formatAmount } from "../utils";

function getExpenseFilters(userId: string, startDate: string, endDate: string) {
  return and(
    eq(transactions.userId, userId),
    lt(transactions.amount, 0),
    gte(transactions.date, startDate),
    lte(transactions.date, endDate)
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

export async function getExpensesCount(year: string, pageSize: number) {
  const userId = await getUserId();
  const total = await db.$count(
    transactions,
    getExpenseFilters(userId, `${year}-01-01`, `${year}-12-31`)
  );
  return {
    total: total,
    pages: Math.ceil(total / pageSize),
  };
}

interface ExpensesPayload extends PageProps {
  year: string;
}

export async function searchExpenses({ year, page, pageSize }: ExpensesPayload) {
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
    .where(getExpenseFilters(userId, `${year}-01-01`, `${year}-12-31`))
    .fullJoin(categories, eq(transactions.categoryId, categories.id))
    .$dynamic();

  return withPagination(query, page, pageSize);
}

export async function getMonthlyTotals(year: string) {
  const userId = await getUserId();

  const fetchSumForMonth = async (month: number) => {
    console.log("fetching month", month, userId);
    const dayPlaceholder = new Date(Number(year), month, 5);
    const monthLabel = format(dayPlaceholder, "MMMM");

    return db
      .select({ value: sum(transactions.amount) })
      .from(transactions)
      .where(
        getExpenseFilters(
          userId,
          format(startOfMonth(dayPlaceholder), "yyyy-MM-dd"),
          format(endOfMonth(dayPlaceholder), "yyyy-MM-dd")
        )
      )
      .then((results) => ({
        label: monthLabel,
        value: results[0].value ? Number(results[0].value) / -100 : null,
      }));
  };

  return Promise.all(
    Array.from({ length: 12 }, (_, i) => i).map((month) => fetchSumForMonth(month))
  );
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
