import { auth } from "@/auth";
import db from "@/db";
import { eq, InferInsertModel } from "drizzle-orm";
import { AnyPgColumn, AnyPgTable, PgSelect } from "drizzle-orm/pg-core";

export function withPagination<T extends PgSelect>(qb: T, page: number = 1, pageSize: number = 10) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

export async function getUserId(): Promise<string> {
  const session = await auth();
  return session?.user?.id!;
}

export async function withUserId<T>(insertValues: T) {
  const session = await auth();
  return { ...insertValues, userId: session?.user?.id };
}

export async function whereUserId<T extends PgSelect, TCol extends AnyPgColumn>(
  qb: T,
  userIdColumn: TCol
) {
  const session = await auth();
  return qb.where(eq(userIdColumn, session?.user?.id));
}

type WithUserId<TTable extends AnyPgTable> = InferInsertModel<TTable> & {
  userId: string;
};

export async function insertWithUserId<TTable extends AnyPgTable, TPayload>(
  table: TTable,
  payload: TPayload
) {
  const session = await auth();
  const insertValues = { ...payload, userId: session?.user?.id };
  return db.insert(table).values(insertValues as WithUserId<TTable>);
}
