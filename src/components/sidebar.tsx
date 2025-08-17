"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  LogOut,
  ChartColumnBig,
  BadgeDollarSign,
  BanknoteArrowDown,
  LayoutDashboard,
  Settings,
  // Goal,
} from "lucide-react";

import { signOut } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import YearDropdown from "./year-dropdown";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onSignOut } from "@/lib/actions/user.actions";

const items = [
  {
    title: "Dashboard",
    url: (selectedYear: string) => `/home/${selectedYear}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: (selectedYear: string) => `/home/${selectedYear}/expenses`,
    icon: BanknoteArrowDown,
  },
  {
    title: "Income",
    url: (selectedYear: string) => `/home/${selectedYear}/income`,
    icon: BadgeDollarSign,
  },
  {
    title: "Investments",
    url: (selectedYear: string) => `/home/${selectedYear}/investments`,
    icon: ChartColumnBig,
  },
  {
    title: "Settings",
    url: () => `/home/settings`,
    icon: Settings,
  },
];

export function AppSidebar() {
  const { year: urlParamYear } = useParams<{ year: string }>();
  const [selectedYear, setSelectedYear] = useState<string>();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (urlParamYear && urlParamYear !== selectedYear) {
      setSelectedYear(urlParamYear);
    }
  }, [urlParamYear, selectedYear]);

  const selectedYearSafe = selectedYear ?? new Date().getFullYear().toString();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <YearDropdown
              selectedYear={selectedYearSafe}
              onYearSelect={(year) => {
                if (pathname.split("/")[3]) {
                  router.replace(`/home/${year}/${pathname.split("/")[3]}`);
                } else {
                  setSelectedYear(year);
                }
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url(selectedYearSafe)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" onClick={onSignOut}>
          Sign Out
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
