"use client";

import { categoryColorMap } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Edit, TrashIcon } from "lucide-react";
import { categories } from "@/db/schema";
import { useState } from "react";
import { AppAlertDialog } from "./alert-dialog";
import { deleteCategory } from "@/lib/services/category.service";

export function Category({ category }: { category: typeof categories.$inferSelect }) {
  const [isHovering, setIsHovering] = useState<boolean>();

  const handleDeleteClick = async () => {
    await deleteCategory(category.id);
  };

  return (
    <div
      className="p-3"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`flex flex-col gap-2 border rounded-[8px] min-w-40 shadow-sm relative`}>
        {isHovering && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute rounded-full size-8 -top-3 -right-3 border cursor-pointer"
            >
              <Edit size="6" />
            </Button>
            <AppAlertDialog
              title="Delete Category?"
              description="This will remove the category from all of your transactions as well."
              actionText="Delete Category"
              onConfirm={handleDeleteClick}
            >
              <Button
                variant="outline"
                size="icon"
                className="absolute rounded-full size-8 -bottom-3 -right-3 border cursor-pointer"
              >
                <TrashIcon size="6" />
              </Button>
            </AppAlertDialog>
          </>
        )}
        <div
          className={`w-full h-3 ${categoryColorMap[category.color ?? "amber"]} rounded-t-[7px]`}
        />
        <div className="px-6 pb-3 pt-0 text-center">
          <span className="text-sm font-semibold">{category.title}</span>
        </div>
      </div>
    </div>
  );
}
