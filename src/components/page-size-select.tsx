"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [10, 20, 50, 100, 200];

export function PageSizeSelect({ pageSize }: { pageSize: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onPageSizeSelect = (val: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", val.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={pageSize.toString()} onValueChange={onPageSizeSelect}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt.toString()}>
              Show {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
