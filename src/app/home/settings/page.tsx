"use server";

import { Separator } from "@/components/ui/separator";
import { fetchAccounts } from "@/lib/services/account.service";
import { fetchCategories } from "@/lib/services/category.service";
import { CategoryFormDialog } from "@/components/category-form-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    <>
      <h4 className="text-2xl">Settings</h4>
      <Separator />
      {/* categories */}
      <div className="flex flex-col gap-4 w-full items-center sm:items-start p-6">
        <h4 className="text-xl font-semibold">Categories</h4>
        <p className="text-muted-foreground text-sm">
          Categories help you understand where your income and expenses are going to.
        </p>
        <div className="flex flex-wrap gap-6 mt-4">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
        <CategoryFormDialog
          title="Create a new category"
          type="create"
          defaultValues={{ title: "" }}
          categories={[]}
        >
          <Button variant="outline" className="py-4 min-w-40 mt-8 shadow-sm">
            <Plus />
            Add Category
          </Button>
        </CategoryFormDialog>
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
    </>
  );
}
