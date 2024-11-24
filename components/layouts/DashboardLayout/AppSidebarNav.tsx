import { Icon } from "@/components/ui"
import { useAuth } from "@/hooks"
import { CBadge, CNavGroup, CNavItem } from "@coreui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

// Base interface for common properties
interface BaseNavItem {
  name: string
  href: string
  icon?: ReactNode
  active?: (pathname: string) => boolean
}

// Interface for single navigation items
interface NavItem extends BaseNavItem {
  component: any
}

// Interface for navigation groups with sub-items
interface NavGroup extends BaseNavItem {
  component: any
  items: NavItem[]
}

// Union type for all possible nav items
type NavItemType = NavItem | NavGroup

// Type for the entire navigation array
type NavType = NavItemType[]

const MERCHANT_NAV: NavType = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   href: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavItem,
    name: "Dashboard",
    href: "/dashboard",
    icon: <Icon name="home" className="nav-icon" />,
    active: (pathname: string) => pathname === "/dashboard",
  },
  {
    component: CNavItem,
    name: "Transaction List",
    href: "/dashboard/statement",
    icon: <Icon name="exchange" className="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: "Customer Invoice",
    icon: <Icon name="invoice" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Invoices",
        href: "/dashboard/invoice",
        icon: <Icon name="invoice" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Customers",
        href: "/dashboard/customer",
        icon: <Icon name="customer" className="nav-icon" />,
      },
    ],
  },

  {
    component: CNavItem,
    name: "Integration Details",
    href: "/dashboard/integration-details",
    icon: <Icon name="integration" className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Report",
    icon: <Icon name="report" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Settlement Report",
        href: "/dashboard/settlement-report",
        icon: <Icon name="report" className="nav-icon" />,
      },
    ],
  },
]

const ADMIN_NAV: NavType = [
  {
    component: CNavItem,
    name: "Dashboard",
    href: "/dashboard",
    icon: <Icon name="home" className="nav-icon" />,
    active: pathname => pathname === "/dashboard",
  },
  {
    component: CNavGroup,
    name: "Setup",
    href: "",
    icon: <Icon name="setup" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "User List",
        href: "/dashboard/users",
        icon: <Icon name="admin" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Merchant User List",
        href: "/dashboard/merchant-users",
        icon: <Icon name="merchant" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Merchant API Pass",
        href: "/dashboard/merchant-callbackUrl",
        icon: <Icon name="password" className="nav-icon" />,
      },

      {
        component: CNavItem,
        name: "Bank List",
        href: "/dashboard/bank",
        icon: <Icon name="bank" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Branch List",
        href: "/dashboard/branch",
        icon: <Icon name="bank" className="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: "Partner",
      //   href: "/partner",
      // },
      // {
      //   component: CNavItem,
      //   name: "Partner-Branch",
      //   href: "/partner-branch",
      // },
    ],
  },
  {
    component: CNavGroup,
    name: "Fintech Management",
    href: "",
    icon: <Icon name="wallet" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Fintech List",
        href: "/dashboard/fintech",
        icon: <Icon name="wallet" className="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: "Services",
      //   href: "/dashboard/service",
      // },
      {
        component: CNavItem,
        name: "Settlement Account",
        href: "/dashboard/settelment",
        icon: <Icon name="report" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Default Service",
        href: "/dashboard/default-servic/add-default-service",
        icon: <Icon name="service" className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Marchant Service",
    href: "/dashboard/create-new-merchant",
    icon: <Icon name="merchant" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Merchant List",
        href: "/dashboard/merchant",
        icon: <Icon name="merchant" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Merchant Service",
        href: "/dashboard/merchant-service",
        icon: <Icon name="service" className="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: "Merchant Store",
      //   href: "/merchant-store",
      // },
      // {
      //   component: CNavItem,
      //   name: "Bank Payment",
      //   href: "/bank-payment",
      // },
    ],
  },
  {
    component: CNavGroup,
    name: "Transaction",
    href: "",
    icon: <Icon name="transaction" className="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: "Merchant Transaction",
      //   href: "/dashboard/merchant-transaction",
      //   icon: <Icon name="merchant" className="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: "Transaction List",
        href: "/dashboard/transaction",
        icon: <Icon name="transaction" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Settlement",
        href: "/dashboard/settlement",
        icon: <Icon name="settlement" className="nav-icon" />,
        active: pathname => pathname === "/dashboard/settlement",
      },
      {
        component: CNavItem,
        name: "Settlement Report",
        href: "/dashboard/settlement-report",
        icon: <Icon name="report" className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Role Permission",
    href: "",
    icon: <Icon name="role" className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Role",
        href: "/dashboard/role",
        icon: <Icon name="role" className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Permission",
        href: "/dashboard/permission",
        icon: <Icon name="permission" className="nav-icon" />,
      },
    ],
  },
]

export const AppSidebarNav = () => {
  const pathname = usePathname()
  const { permissions, isSuperAdmin, isAdmin } = useAuth()
  // const navbarItems = isAdmin? isSuperAdmin ? ADMIN_NAV : getNavItems(ADMIN_NAV, routes, permissions) :MERCHANT_NAV
  const navbarItems = MERCHANT_NAV

  const navLink = (name: string, icon: any, badge?: any) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: any, index: number) => {
    const { component, name, badge, icon, active, ...rest } = item

    const Component = component
    const isLink = rest.href && !rest.items
    const otherProps = isLink ? { component: Link } : {}
    const isActive = active ? active(pathname) : pathname.startsWith(rest.href)
    const className = isActive ? "is_active active" : ""

    return (
      <Component {...otherProps} key={index} {...rest} className={className}>
        {navLink(name, icon, badge)}
      </Component>
    )
  }

  const navGroup = (item: any, index: number) => {
    const { component, name, icon, href, active, items, ...rest } = item

    const itemLinks = items?.map((item: any) => item.href)
    const isActive = active
      ? active(pathname)
      : href
      ? pathname.startsWith(href)
      : itemLinks?.some((itemLink: any) => pathname.startsWith(itemLink))

    const className = isActive ? "is_active" : ""

    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={isActive}
        className={className}
        {...rest}>
        {items?.map((item: any, index: number) => (item.items ? navGroup(item, index) : navItem(item, index)))}
      </Component>
    )
  }

  return <>{navbarItems.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}</>
}
