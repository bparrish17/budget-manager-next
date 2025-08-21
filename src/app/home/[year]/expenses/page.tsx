import { getExpensesCount, searchExpenses } from "@/lib/services/transaction.service";
import { ExpensesTable } from "./table";
import { columns } from "./columns";
import AppPagination from "@/components/pagination";
import { PageSizeSelect } from "@/components/page-size-select";

export default async function Expenses(props: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? Number(searchParams.pageSize) : 50;
  const expenses = await searchExpenses({ year: params.year, page, pageSize });
  const counts = await getExpensesCount(params.year, pageSize);

  return (
    <>
      <h4 className="text-2xl">Expenses</h4>
      <ExpensesTable columns={columns} data={expenses as any} />
      <div className="w-full flex items-center justify-between">
        <div className="min-w-fit text-sm text-slate-500">{`${counts.total} Expenses`}</div>
        <AppPagination totalPages={counts.pages} />
        <PageSizeSelect pageSize={pageSize} />
      </div>
    </>
  );
}
