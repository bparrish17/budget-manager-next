import { NextFileProps } from "@/lib/types";

export default function Template({ children }: NextFileProps) {
  return (
    <div className="flex flex-col gap-4 w-full px-8 pt-6 items-center sm:items-start">
      {children}
    </div>
  );
}
