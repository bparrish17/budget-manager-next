import { auth } from "@/auth";
import { getExpensesCount, searchExpenses } from "@/lib/services/transaction.service";
import { ExpensesTable } from "./table";
import { columns } from "./columns";
import AppPagination from "@/components/pagination";
import { PageSizeSelect } from "@/components/page-size-select";

export default async function Expenses(props: {
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const searchParams = await props.searchParams;
  const expenses = await searchExpenses({
    page: Number(searchParams.page) ?? 1,
    pageSize: Number(searchParams.pageSize) ?? 50,
  });
  const counts = await getExpensesCount(50);
  console.log("Expenses: ", expenses, searchParams, counts);

  return (
    <>
      <h4 className="text-2xl">Expenses</h4>
      <ExpensesTable columns={columns} data={expenses as any} />
      <div className="w-full flex items-center justify-between">
        <div className="min-w-fit text-sm">{`${counts.total} Expenses`}</div>
        <AppPagination totalPages={counts.pages} />
        <PageSizeSelect pageSize={searchParams.pageSize || 50} />
      </div>
    </>
  );
}
