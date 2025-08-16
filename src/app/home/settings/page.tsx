import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAccounts } from "@/services/account.service";
import { fetchCategories } from "@/services/category.service";
import { Plus } from "lucide-react";

const colorMap: { [color: string]: string } = {
  red: "bg-red-400",
  orange: "bg-orange-400",
  amber: "bg-yellow-400",
  yellow: "bg-yellow-400",
  lime: "bg-lime-400",
  green: "bg-green-400",
  emerald: "bg-emerald-400",
  teal: "bg-teal-400",
  cyan: "bg-cyan-400",
  sky: "bg-sky-400",
  blue: "bg-blue-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  fuchsia: "bg-fuchsia-400",
  pink: "bg-pink-400",
  rose: "bg-rose-400",
  slate: "bg-slate-400",
  gray: "bg-gray-400",
  zinc: "bg-zinc-400",
  neutral: "bg-neutral-400",
  stone: "bg-stone-400",
  black: "bg-black",
};

export default async function Settings() {
  const categories = await fetchCategories();
  const accounts = await fetchAccounts();

  console.log("categories", categories);
  console.log("accounts", accounts);

  return (
    <div className="flex flex-col gap-4 w-full px-8 pt-6 items-center sm:items-start">
      <h4 className="text-2xl">Settings</h4>
      <Separator />
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start py-6 pl-6">
        <h4 className="text-xl font-semibold">Categories</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are
          going to.
        </p>
        <div className="flex gap-6 flex-wrap mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col gap-2 border rounded-[8px] min-w-40 shadow-sm`}
            >
              <div
                className={`w-full h-3 ${
                  colorMap[category.color ?? "amber"]
                } rounded-t-[7px]`}
              />
              <div className="px-6 pb-3 pt-0 text-center">
                <span className="text-sm font-semibold">{category.title}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="py-4 min-w-40 mt-8 shadow-sm">
          <Plus />
          Add Category
        </Button>
      </div>

      <Separator />
      {/* accounts */}
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start py-6 pl-6">
        <h4 className="text-xl font-semibold">Accounts</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are
          going to.
        </p>
        <div className="mt-4">
          {accounts.map((account) => (
            <div key={account.id} className={`flex flex-col gap-2 p-2`}>
              <span className="text-sm">
                <span className="font-semibold">{account.institutionName}</span>
                &nbsp;-&nbsp;
                {account.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
