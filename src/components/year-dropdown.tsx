"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { ChevronDown } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const years = ["2025", "2024", "2023", "2022", "2021"];

export default function YearDropdown({
  selectedYear,
  onYearSelect,
}: {
  selectedYear: string;
  onYearSelect: (year: string) => void;
}) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="w-28">
          {selectedYear}
          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2">
        {years.map((year) => (
          <DropdownMenuItem key={year} onSelect={() => onYearSelect(year)}>
            <span>{year}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
