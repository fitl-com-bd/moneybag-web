"use client"
import { Icon } from "@/components/ui"
import config from "@/config"
import { useAppSelector, useAuth } from "@/hooks"
import { userSingout } from "@/utils"
import { CButton, CImage, CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { AppSidebarNav } from "./AppSidebarNav"

const AppSidebar = () => {
  const { user, isLoading } = useAuth()
  const showSidebar = useAppSelector(state => state.entities.sidebar.showSidebar)

  return (
    <CSidebar position="fixed" visible={showSidebar}>
      <CSidebarBrand className="py-3 flex-center">
        <CImage className="image-wrapper" src={config.LOGO} />
      </CSidebarBrand>
      <hr className="my-2 mx-4" />
      {/* <h6 className="mt-4 mx-4 mb-2">Merchant Menu</h6> */}
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      /> */}
      <div className="flex-col gap-2.5 m-2.5">
        {!isLoading && user && (
          <div className="flex-col align-items-center gap-2 bg-anti-flash-white bg-opacity-50 shadow-sm rounded p-3">
            {/* <div className="d-flex gap-2">
              <Avatar
                src={user.merchant_logo_url}
                alt={user.merchant_name}
                size="lg"
              />
              <div className="flex-col">
                <span className="avatar-name-sm">{user.merchant_name}</span>
                <span className="small">@{user.user_id}</span>
              </div>
            </div> */}
            <CButton onClick={userSingout} color="danger" variant="outline" className="w-100 mt-1 flex-center gap-2">
              <Icon name="signOut" size={18} className="" />
              Sign Out
            </CButton>
          </div>
        )}
      </div>
    </CSidebar>
  )
}

export default AppSidebar
