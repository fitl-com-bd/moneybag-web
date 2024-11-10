import { Icon } from "@/components/ui"
import { CBadge, CNavGroup, CNavItem } from "@coreui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const _nav = [
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

export const AppSidebarNav = () => {
  const pathname = usePathname()

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

  return <>{_nav.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}</>
}
