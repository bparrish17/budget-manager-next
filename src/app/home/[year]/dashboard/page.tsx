import { MonthlyBarChart } from "@/components/bar-chart";
import { getMonthlyTotals } from "@/lib/services/transaction.service";

export default async function Dashboard(props: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const params = await props.params;
  const monthTotals = await getMonthlyTotals(params.year);

  return (
    <>
      <h4 className="text-2xl">Dashboard</h4>
      <div className="py-6 px-4 flex flex-wrap">
        <MonthlyBarChart
          title="Monthly Totals"
          description="January - June 2025"
          data={monthTotals}
        />
      </div>
    </>
  );
}
