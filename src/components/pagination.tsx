"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function AppPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);
  console.log("allPages", allPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} className="font-normal" />
        </PaginationItem>
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`${page}-${index}`}>
              <PaginationLink href={createPageURL(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} className="font-normal" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

/*

<PaginationItem>
  <PaginationLink href={createPageURL(1)}>1</PaginationLink>
</PaginationItem>
  <PaginationItem>
  <PaginationLink href={createPageURL(2)} isActive>
    2
  </PaginationLink>
</PaginationItem>
<PaginationItem>
  <PaginationLink href={createPageURL(3)}>3</PaginationLink>
</PaginationItem>
<PaginationItem>
  <PaginationEllipsis />
</PaginationItem>
<PaginationItem>
  <PaginationNext href={createPageURL(currentPage + 1)} className="font-normal" />
</PaginationItem>
*/
