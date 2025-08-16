"use client";

import { categoryColorMap } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Edit, TrashIcon } from "lucide-react";
import { categories } from "@/db/schema";
import { useState } from "react";

export function Category({ category }: { category: typeof categories.$inferSelect }) {
  const [isHovering, setIsHovering] = useState<boolean>();

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`flex flex-col gap-2 border rounded-[8px] min-w-40 shadow-sm relative`}
    >
      {isHovering && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute rounded-full size-8 -top-3 -right-3 border cursor-pointer"
          >
            <Edit size="6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute rounded-full size-8 -bottom-3 -right-3 border cursor-pointer"
          >
            <TrashIcon size="6" />
          </Button>
        </>
      )}
      <div
        className={`w-full h-3 ${categoryColorMap[category.color ?? "amber"]} rounded-t-[7px]`}
      />
      <div className="px-6 pb-3 pt-0 text-center">
        <span className="text-sm font-semibold">{category.title}</span>
      </div>
    </div>
  );
}
