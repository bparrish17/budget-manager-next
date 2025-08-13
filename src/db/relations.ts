import { relations } from "drizzle-orm/relations";
import { users, categories, transactions } from "./schema";

export const categoriesRelations = relations(categories, ({one, many}) => ({
	user: one(users, {
		fields: [categories.userId],
		references: [users.id]
	}),
	transactions: many(transactions),
}));

export const usersRelations = relations(users, ({many}) => ({
	categories: many(categories),
	transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({one}) => ({
	category: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	}),
	user: one(users, {
		fields: [transactions.userId],
		references: [users.id]
	}),
}));