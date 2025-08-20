"use client";

import { Badge } from "@/components/ui/badge";
import { TCategory } from "@/lib/services/category.service";
import { TTransaction } from "@/lib/services/transaction.service";
import { formatTransactionDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TTransaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => formatTransactionDate(info.getValue<string>()),
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
    accessorKey: "category",
    header: "Category",
    cell: (info) => {
      const category = info.getValue<TCategory>();
      return category ? <Badge variant={category.color as any}>{category.title}</Badge> : "";
    },
  },
];
