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
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export default function AppPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={clsx("font-normal", currentPage === 1 ? "disabled" : null)}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`${page}-${index}`}>
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
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={clsx("font-normal", currentPage === totalPages ? "disabled" : null)}
          />
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
