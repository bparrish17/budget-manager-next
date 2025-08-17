"use client";

import { TTransaction } from "@/lib/services/transaction.service";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TTransaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => `$${(info.getValue<number>() / -100).toFixed(2)}`,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category.title",
    header: "Category",
  },
];
