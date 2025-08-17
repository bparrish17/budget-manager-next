import { auth } from "@/auth";
import { searchExpenses } from "@/lib/services/transaction.service";
import { ExpensesTable } from "./table";
import { columns } from "./columns";

export default async function Expenses() {
  const expenses = await searchExpenses();
  const session = await auth();
  console.log("session", session);
  console.log("Expenses: ", expenses);

  return (
    <>
      <h4 className="text-2xl">Expenses</h4>
      <ExpensesTable columns={columns} data={expenses} />
    </>
  );
}
