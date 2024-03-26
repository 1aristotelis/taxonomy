import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  rootPath: "/dashboard",
  mainNav: [
    /* {
      title: "Documentation",
      href: "/docs",
      disabled: true
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    }, */
  ],
  sidebarNav: [
    {
      title: "Projects",
      href: "/dashboard",
      icon: "post",
    },
    /* {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      disabled: true
    }, */
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
