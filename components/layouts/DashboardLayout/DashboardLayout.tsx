import { LayoutProps } from "@/types"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import AppSidebar from "./AppSidebar"

export const DashboardLayout = ({ children }: LayoutProps) => (
  <div>
    <AppSidebar />
    <div className="wrapper d-flex flex-column vh-100">
      <AppHeader />
      <div className="body body-wrapper">{children}</div>
      <AppFooter />
    </div>
  </div>
)
