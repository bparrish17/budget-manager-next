"use client";

import { Edit, TrashIcon } from "lucide-react";
import { useState } from "react";

import { categories } from "@/db/schema";
import { deleteCategory } from "@/lib/services/category.service";
import { categoryBgColorMap } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AppAlertDialog } from "@/components/alert-dialog";
import { CategoryFormDialog } from "@/components/category-form-dialog";

export function Category({ category }: { category: typeof categories.$inferSelect }) {
  const [isHovering, setIsHovering] = useState<boolean>();

  const handleDeleteClick = async () => {
    await deleteCategory(category.id);
  };

  return (
    <div
      className="flex flex-col gap-2 border rounded-[8px] min-w-40 shadow-sm relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <>
          <CategoryFormDialog
            title={`Edit Category "${category.title}"`}
            type="update"
            defaultValues={{ ...category, description: category.description ?? "" }}
            categoryId={category.id}
            categories={[]}
            onConfirm={() => setIsHovering(false)}
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute rounded-full size-8 -top-3 -right-3 border cursor-pointer"
            >
              <Edit size="6" />
            </Button>
          </CategoryFormDialog>
          <AppAlertDialog
            title="Delete Category?"
            description="Doing so will remove this category from all of your transactions."
            actionText="Delete Category"
            onCancel={() => setIsHovering(false)}
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
        className={`w-full h-3 ${categoryBgColorMap[category.color ?? "amber"]} rounded-t-[7px]`}
      />
      <div className="px-6 pb-3 pt-0 text-center">
        <span className="text-sm font-semibold">{category.title}</span>
      </div>
    </div>
  );
}
