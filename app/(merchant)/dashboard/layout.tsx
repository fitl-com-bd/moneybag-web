import { LayoutProps } from "@/types"
import AppFooter from "./_components/AppFooter"
import AppHeader from "./_components/AppHeader"
import AppSidebar from "./_components/AppSidebar"

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-2.5 d-flex flex-column">{children}</div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DashboardLayout
