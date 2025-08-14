import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  ChartColumnBig,
  BadgeDollarSign,
  BanknoteArrowDown,
  LayoutDashboard,
  Folders,
  Settings,
  // Goal,
} from "lucide-react";

import { signOut } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/home/2025/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: "/home/2025/expenses",
    icon: BanknoteArrowDown,
  },
  {
    title: "Income",
    url: "/home/2025/income",
    icon: BadgeDollarSign,
  },
  {
    title: "Investments",
    url: "/home/2025/investments",
    icon: ChartColumnBig,
  },
  {
    title: "Settings",
    url: "/home/settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Year
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
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
        <Button
          variant="outline"
          onClick={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          Sign Out
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
