import { Separator } from "@/components/ui/separator";
import { fetchAccounts } from "@/lib/services/account.service";
import { fetchCategories } from "@/lib/services/category.service";
import { CategoryFormDialog } from "@/components/create-category-form-dialog";
import { categoryColorMap } from "@/lib/constants";
import { map } from "lodash";
import { Button } from "@/components/ui/button";
import { Edit, EllipsisVertical, TrashIcon } from "lucide-react";
import { Category } from "@/components/category";

export default async function Settings() {
  const categories = await fetchCategories();
  const accounts = await fetchAccounts();
  /*
    import { ChevronRightIcon } from "lucide-react"

    import { Button } from "@/components/ui/button"

    export function ButtonIcon() {
      return (
        <Button variant="secondary" size="icon" className="size-8">
          <ChevronRightIcon />
        </Button>
      )
    }
  */
  return (
    <div className="flex flex-col gap-4 w-full px-8 pt-6 items-center sm:items-start">
      <h4 className="text-2xl">Settings</h4>
      <Separator />
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start py-6 pl-6">
        <h4 className="text-xl font-semibold">Categories</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are going to.
        </p>
        <div className="flex gap-6 flex-wrap mt-4">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
        <CategoryFormDialog categories={categories} />
      </div>

      <Separator />
      {/* accounts */}
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start py-6 pl-6">
        <h4 className="text-xl font-semibold">Accounts</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are going to.
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
