import { fetchAccounts } from "@/services/account.service";
import { fetchCategories } from "@/services/category.service";

export default async function Settings() {
  const categories = await fetchCategories();
  const accounts = await fetchAccounts();

  console.log("categories", categories);
  console.log("accounts", accounts);

  return (
    <div className="flex flex-col gap-4 w-full px-8 pt-6 items-center sm:items-start">
      <h4 className="text-2xl">Settings</h4>
      <div className="w-full border-1" />
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start pt-6 pl-6">
        <h4 className="text-xl">Categories</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are
          going to.
        </p>
        <div className="mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col gap-2 p-2 bg-${category.color}-300`}
            >
              <span className="text-sm font-semibold">{category.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-1" />
      {/* accounts */}
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start pt-6 pl-6">
        <h4 className="text-xl">Accounts</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are
          going to.
        </p>
        <div className="mt-4">
          {accounts.map((account) => (
            <div key={account.id} className={`flex flex-col gap-2 p-2`}>
              <span className="text-sm font-semibold">{account.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
