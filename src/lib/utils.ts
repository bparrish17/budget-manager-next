import { clsx, type ClassValue } from "clsx";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTransactionDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");

  const m = String(parseInt(month, 10));
  const d = String(parseInt(day, 10));

  return `${m}/${d}/${year}`;
}

export function formatAmount(value: number, isExpense: boolean) {
  const dividend = isExpense ? -100 : 100;
  return `$${(value / dividend).toFixed(2)}`;
}

export const useDebouncedCallback = (cb: Function, wait = 300) => {
  const debouncePropChange = useCallback(
    debounce((...args) => {
      cb(...args);
    }, wait),
    []
  );

  return debouncePropChange;
};

export function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}
