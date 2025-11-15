"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User2,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LineChart,
  BarChart3,
  PieChart,
  Bell,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Notifications type
interface Notifications {
  inbox: number;
  alerts: number;
}

const NOTIFICATIONS: Notifications = {
  inbox: 3,
  alerts: 1,
};

// Dashboard menu
const DASHBOARDS = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  {
    title: "Analytics",
    url: "/analy",
    icon: LineChart,
    children: [
      { title: "Traffic", url: "/analy/traffic", icon: LineChart },
      { title: "Conversions", url: "/analy/conversion", icon: BarChart3 },
      { title: "Funnel", url: "/analy/funnel", icon: PieChart },
    ],
  },
  { title: "Sales Report", url: "/SalesReports", icon: BarChart3 },
  { title: "Audience", url: "/audience", icon: PieChart },
];

// Application items
const APP_ITEMS = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox, badgeKey: "inbox" },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

// Project options with icons
const PROJECTS = [
  { title: "Add Project", url: "/projects/add", icon: Plus },
  { title: "View Projects", url: "/projects", icon: LayoutDashboard },
  { title: "Add Element", url: "/projects/elements/add", icon: Plus },
  { title: "View Elements", url: "/projects/elements", icon: LayoutDashboard },
];

export default function AppSidebar() {
  const pathname = usePathname() ?? "/";
  const { state: sidebarState } = useSidebar();
  const collapsed = sidebarState === "collapsed";

  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    dashboards: true,
    projects: false,
  });

  const toggleMenu = (key: string) => setOpenMenus((s) => ({ ...s, [key]: !s[key] }));

  // Automatically expand a menu if a child is active
  const isActive = (url: string) => pathname === url || (url !== "/" && pathname.startsWith(url));
  React.useEffect(() => {
    DASHBOARDS.forEach((d) => {
      if ("children" in d && d.children) {
        const activeChild = d.children.some((sub) => isActive(sub.url));
        if (activeChild) setOpenMenus((prev) => ({ ...prev, [d.title]: true }));
      }
    });
  }, [pathname]);

  const easing: Easing = [0.42, 0, 0.58, 1];
  const submenuVariants: Variants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.18, ease: easing } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.22, ease: easing } },
  };

  const renderMenuItems = (items: typeof DASHBOARDS | typeof APP_ITEMS) =>
    items.map((d) => {
      const Icon = d.icon;
      const hasChildren = "children" in d && Array.isArray(d.children) && d.children.length > 0;
      const rootActive = isActive(d.url);

      return (
        <div key={d.title} className="relative">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={collapsed ? d.title : undefined}
              className={`group relative flex items-center gap-3 rounded-lg px-2 py-2 transition ${
                rootActive ? "bg-muted/60 font-semibold" : "hover:bg-muted/50"
              }`}
              onClick={(e) => {
                if (hasChildren) {
                  e.preventDefault();
                  toggleMenu(d.title);
                }
              }}
              aria-expanded={hasChildren ? !!openMenus[d.title] : undefined}
            >
              <Link href={d.url} className="flex items-center gap-3 w-full">
                {Icon && <Icon className="h-[18px] w-[18px] opacity-80" />}
                <span className="text-sm">{d.title}</span>
                {hasChildren && !collapsed && (
                  <span className="ml-auto flex items-center">
                    {openMenus[d.title] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {hasChildren && (
            <AnimatePresence initial={false}>
              {openMenus[d.title] && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={submenuVariants}
                  className="ml-8 mt-1 flex flex-col gap-1"
                >
                  {d.children!.map((sub) => (
                    <li key={sub.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={collapsed ? sub.title : undefined}
                        className={`group flex items-center gap-2 rounded-md px-2 py-1 text-sm transition ${
                          isActive(sub.url) ? "bg-muted/60 font-medium" : "hover:bg-muted/40"
                        }`}
                      >
                        <Link href={sub.url} className="w-full flex items-center gap-2">
                          {sub.icon && <sub.icon className="h-3 w-3 opacity-80" />}
                          <span>{sub.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}
        </div>
      );
    });

  const renderProjectItems = () =>
    PROJECTS.map((p) => (
      <li key={p.title}>
        <SidebarMenuButton
          asChild
          tooltip={collapsed ? p.title : undefined}
          className={`group flex items-center gap-2 rounded-md px-2 py-1 text-sm transition ${
            isActive(p.url) ? "bg-muted/60 font-medium" : "hover:bg-muted/40"
          }`}
        >
          <Link href={p.url} className="w-full flex items-center gap-2">
            {p.icon && <p.icon className="h-3 w-3 opacity-80" />}
            <span>{p.title}</span>
          </Link>
        </SidebarMenuButton>
      </li>
    ));

  return (
    <Sidebar collapsible="icon" className="border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <SidebarHeader className="py-4 px-3">
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={collapsed ? "Studio Admin" : undefined} className="gap-3 rounded-lg px-2 py-2 hover:bg-muted/60 transition">
            <Link href="/" className="flex items-center gap-3">
            <div className="font-extrabold text-xl">S</div>
              <span className="px-2 font-semibold text-sm">Strange Zone</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <div
              className="flex items-center justify-between px-2 text-xs font-semibold tracking-wide text-muted-foreground"
              role="button"
              onClick={() => toggleMenu("dashboards")}
            >
              <span>Dashboards</span>
              <button
                aria-label="toggle dashboards"
                className="ml-2 inline-flex items-center justify-center rounded-md p-1 hover:bg-muted/50 transition"
              >
                {openMenus["dashboards"] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 flex flex-col gap-1">{renderMenuItems(DASHBOARDS)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Application */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 text-xs font-semibold tracking-wide text-muted-foreground">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 flex flex-col gap-1">
              {APP_ITEMS.map((it) => {
                const Icon = it.icon!;
                const active = isActive(it.url);
                const badgeCount = it.badgeKey ? NOTIFICATIONS[it.badgeKey as keyof Notifications] : 0;

                return (
                  <SidebarMenuItem key={it.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={collapsed ? `${it.title}${badgeCount ? ` • ${badgeCount}` : ""}` : undefined}
                      className={`group relative flex items-center gap-3 rounded-lg px-2 py-2 transition ${
                        active ? "bg-muted/60 font-semibold" : "hover:bg-muted/50"
                      }`}
                    >
                      <Link href={it.url} className="flex items-center gap-3 w-full">
                        <Icon className="h-[18px] w-[18px] opacity-80" />
                        <span className="text-sm">{it.title}</span>
                        {badgeCount > 0 && <span className="ml-auto text-xs font-semibold">{badgeCount}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel asChild>
            <div
              className="flex items-center justify-between px-2 text-xs font-semibold tracking-wide text-muted-foreground"
              role="button"
              onClick={() => toggleMenu("projects")}
            >
              <span>Projects</span>
              <button
                aria-label="toggle projects"
                className="ml-2 inline-flex items-center justify-center rounded-md p-1 hover:bg-muted/50 transition"
              >
                {openMenus["projects"] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <AnimatePresence>
              {openMenus["projects"] && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={submenuVariants}
                  className="ml-2 mt-1 flex flex-col gap-1"
                >
                  {renderProjectItems()}
                </motion.ul>
              )}
            </AnimatePresence>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2 pb-4 pt-2">
        <SidebarMenu className="flex items-center">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 transition">
                  <User2 className="h-[18px] w-[18px]" />
                  <span className="text-sm">Abdul Hadi</span>
                  <span className="ml-auto inline-flex items-center pl-20 gap-2">
                    <Bell className="h-4 w-4 opacity-80" />
                    {NOTIFICATIONS.alerts > 0 && <span className="text-xs font-semibold">{NOTIFICATIONS.alerts}</span>}
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
