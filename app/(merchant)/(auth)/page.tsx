"use client"
import { useLoginUserMutation } from "@/store"
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from "@coreui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { ShowPassword } from "@/components/ui"
import ForgetPassword from "./_components/ForgetPassword"

const Login = () => {
  const router = useRouter()
  const [username, setuername] = useState("")
  const [password, setpassword] = useState("")
  const [visible, setVisible] = useState<boolean | undefined>()
  // const [isLoading, setIsLoading] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const openModal = () => setVisible(true)

  const handleUser = (e: any) => {
    const username = e.target.value
    setuername(username)
  }
  const handlePassword = (e: any) => {
    const password = e.target.value
    setpassword(password)
  }

  const submitUser = async (e: any) => {
    e.preventDefault()
    const response: any = await loginUser({ username, password })
    if (response?.error) {
      console.error("There was an error!", response.error)
    }
    if (response?.data?.access_token) {
      localStorage.setItem("token", response.data.access_token)
      toast.success("Login successful")
      return router.push("/dashboard")
    }
    toast.error("Something went wrong")
  }

  return (
    <div
      className="bg-anti-flash-white bg-watermark min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: `url("/images/auth-background.png")`,
      }}>
      <CContainer>
        <CRow className="justify-content-center mx-auto">
          <CCol sm={12} md={12} lg={6} xl={4}>
            <CCard className="border-0 shadow">
              <CCardBody className="p-sm-5 p-md-5 px-xl-4">
                <div className="justify-content-center px-3">
                  <div className="text-center">
                    <CImage className="login-image-wrapper img-fluid mx-auto" src="images/logo.png" />
                  </div>
                  <div className="text-center">
                    <h4 className="pt-4 text-danger">Marchant Sign in...</h4>
                  </div>
                  <CFormInput
                    className="my-4 custom-input"
                    placeholder="User Name"
                    type="text"
                    name="username"
                    onChange={handleUser}
                  />
                  <ShowPassword>
                    <CFormInput
                      className="my-4 custom-input"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={handlePassword}
                    />
                  </ShowPassword>
                  <CButton color="link" onClick={openModal} className="text-danger">
                    Forgot password?
                  </CButton>
                  <div className="text-center pt-3 mb-2 pb-1">
                    <CButton
                      className="border-0 mb-4 w-100 gradient-custom-2"
                      type="button"
                      disabled={isLoading}
                      onClick={submitUser}>
                      {isLoading && <CSpinner color="light" size="sm" className="me-2" />}
                      {isLoading ? "Signing in..." : "Sign in"}
                    </CButton>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <div>
        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}>
          <CModalHeader
          // onClose={() => {
          //   setVisible(false)
          // }}
          >
            <CModalTitle className="px-3 text-danger">Forgot Password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <ForgetPassword />
          </CModalBody>
        </CModal>
      </div>
    </div>
  )
}

export default Login
