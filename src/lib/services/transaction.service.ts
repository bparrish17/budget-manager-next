"use server";

import db from "@/db";
import { transactions } from "@/db/schema";
import { gt, lt } from "drizzle-orm";

export async function searchTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
  });
}

export async function searchExpenses() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: lt(transactions.amount, 0),
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
