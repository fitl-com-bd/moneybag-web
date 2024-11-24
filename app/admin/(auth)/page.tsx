"use client"
import { ShowPassword } from "@/components/ui"
import config from "@/config"
import { useLoginAdminMutation } from "@/store"
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
// import ForgetPassword from "./_components/ForgetPassword"

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()
  const [visible, setVisible] = useState<boolean | undefined>()
  const [loginAdmin, { isLoading }] = useLoginAdminMutation()

  const openModal = () => setVisible(true)

  const onSubmit = async (data: any) => {
    const response: any = await loginAdmin(data)

    if (response?.error) {
      console.error("There was an error!", response.error)
      const message = response.error?.data?.detail || "Something went wrong!"
      return toast.error(message)
    }
    if (response?.data?.access_token) {
      localStorage.setItem("token", response.data.access_token)
      toast.success("Login successful")
      router.push(config.ADMIN_DASHBOARD_URL)
    }
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
                <CForm className="justify-content-center px-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="text-center">
                    <CImage className="login-image-wrapper img-fluid mx-auto" src="images/logo.png" />
                  </div>
                  <div className="text-center mt-3 mb-8">
                    <h5 className="text-danger">Admin Sign In</h5>
                  </div>
                  <CFormInput
                    className="mb-4 custom-input"
                    placeholder="User Name"
                    type="text"
                    {...register("username")}
                    invalid={errors?.username as any}
                    feedbackInvalid={errors?.username?.message as any}
                  />
                  <ShowPassword>
                    <CFormInput
                      className="custom-input"
                      placeholder="Password"
                      type="password"
                      {...register("password")}
                      invalid={errors?.password as any}
                      feedbackInvalid={errors?.password?.message as any}
                    />
                  </ShowPassword>
                  <div className="d-flex mb-4">
                    <CButton color="link" onClick={openModal} className="text-danger p-0 text-decoration-none ms-auto">
                      Forgot password?
                    </CButton>
                  </div>
                  <div className="text-center mb-3">
                    <CButton
                      className="border-0 w-100 gradient-custom-2"
                      type="submit"
                      // onClick={submitUser}
                      disabled={isLoading}>
                      {isLoading && <CSpinner color="light" size="sm" className="me-2" />}
                      {isLoading ? "Signing in..." : "Sign in"}
                    </CButton>
                  </div>
                </CForm>
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
          <CModalHeader>
            <CModalTitle className="px-3 text-danger">Forgot Password</CModalTitle>
          </CModalHeader>
          <CModalBody>{/* <ForgetPassword /> */}</CModalBody>
        </CModal>
      </div>
    </div>
  )
}

export default Login
