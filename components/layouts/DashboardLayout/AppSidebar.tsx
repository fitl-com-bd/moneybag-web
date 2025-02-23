"use client"
import { Icon } from "@/components/ui"
import config from "@/config"
import { useAppSelector, useAuth } from "@/hooks"
import { handleSingout } from "@/utils"
import { CButton, CImage, CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { AppSidebarNav } from "./AppSidebarNav"

const AppSidebar = () => {
  const { user, isLoading, isAdmin } = useAuth()
  const showSidebar = useAppSelector(state => state.entities.sidebar.showSidebar)

  return (
    <CSidebar position="fixed" visible={showSidebar}>
      <CSidebarBrand className="pt-3c flex-center">
        <CImage className="image-wrapper" src={config.LOGO} />
      </CSidebarBrand>
      <hr className="my-2" />
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav />
        </SimpleBar>
      </CSidebarNav>
      {/* <div className="flex-col gap-2.5 m-2.5">
        {!isLoading && user && (
          <div className="flex-col align-items-center gap-2 bg-anti-flash-white bg-opacity-50 shadow-sm rounded p-3">
            <CButton onClick={handleSingout} color="danger" variant="outline" className="w-100 mt-1 flex-center gap-2">
              <Icon name="signOut" size={18} className="" />
              Sign Out
            </CButton>
          </div>
        )}
      </div> */}
    </CSidebar>
  )
}

export default AppSidebar
