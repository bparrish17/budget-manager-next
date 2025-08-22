"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format, subMonths, subWeeks } from "date-fns";

type QuickFilter = "last_week" | "last_month" | "last_3_months";

export function TransactionQuickFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (filter: QuickFilter) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    const setStartDate = (date: Date) => params.set("startDate", format(date, "yyyy-MM-dd"));

    if (filter === "last_week") {
      setStartDate(subWeeks(new Date(), 1));
    } else if (filter === "last_month") {
      setStartDate(subMonths(new Date(), 1));
    } else if (filter === "last_3_months") {
      setStartDate(subMonths(new Date(), 3));
    } else {
      params.delete("startDate");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ToggleGroup variant="outline" type="single" onValueChange={handleChange}>
      <ToggleGroupItem value="last_week" aria-label="Toggle Last Week Filter">
        Last Week
      </ToggleGroupItem>
      <ToggleGroupItem value="last_month" aria-label="Toggle Last Month Filter">
        Last Month
      </ToggleGroupItem>
      <ToggleGroupItem
        value="last_3_months"
        aria-label="Toggle Last 3 Months Filter"
        className="px-5"
      >
        Last 3 Months
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function startDateToToggleValue(searchParams: URLSearchParams) {
  const paramDate = searchParams.get("startDate")?.toString();
}
