import db from "@/db";
import { transactions } from "@/db/schema";
import { gt, lt } from "drizzle-orm";

export function searchTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
  });
}

export function searchExpenses() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: lt(transactions.amount, 0),
  });
}

export function searchIncome() {
  return db.query.transactions.findMany({
    with: {
      category: true,
    },
    where: gt(transactions.amount, 0),
  });
}
