"use server";

import db from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { getUserId } from "./db.service";

export async function searchTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
  });
}

export async function searchExpenses() {
  const userId = await getUserId();
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: and(eq(transactions.userId, userId), lt(transactions.amount, 0)),
    limit: 10,
  });
}

export async function searchIncome() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: gt(transactions.amount, 0),
  });
}
