import React, { useState } from "react"
// import axios from "axios"
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CImage,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"

const ForgetPassword = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" })
  // const navigate = useNavigate()
  const [username, setUsername] = useState()
  const [otp, setOtp] = useState()
  const [newPass, setNewPass] = useState()
  const [conPass, setConPass] = useState()
  const [merchantUser, setMerchantUserDetail] = useState<any>()
  const [userHide, setUserHide] = useState(false)
  const [otpHide, setOtpHide] = useState(true)
  const [passwordHide, setPasswordHide] = useState(true)

  const showPassword = () => {
    const x = document.getElementById("password") as any
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }
  const showConPassword = () => {
    const x = document.getElementById("showPassword") as any
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }

  const getPasswordMatchingMess = () => {
    if (conPass && conPass != newPass) {
      return "Password Mismatch"
    }
  }

  const submitMerchantUerName = () => {
    const data = {
      merchant_id: username,
    }
    // TODO: transfer this to rtk query
    // axios
    //   .put(`${process.env.REACT_APP_API_URL}mruser-auth/forgot-pwd`, data)
    //   .then(response => {
    //     console.log(response)
    //     setMerchantUserDetail(response.data)
    //     swal({
    //       text: `OTP sent to ${response.data.email.slice(0, 3)}........${response.data.email.slice(
    //         response.data.email.indexOf("@") - 3,
    //         response.data.email.length
    //       )}`,
    //       icon: "success",
    //       position: "top-end",
    //       button: true,
    //     })
    //     setUserHide(true)
    //     setOtpHide(false)
    //   })
    //   .catch(error => {
    //     console.error("There was an error!", error)
    //     swal({
    //       text: error.response.data.detail,
    //       icon: "error",
    //       position: "top-end",
    //       button: false,
    //       timer: 1500,
    //     })
    //   })
  }

  const submitOtp = () => {
    const data = {
      merchant_id: username,
      session_id: merchantUser?.session_id[0],
      otp_code: otp,
    }
    console.log(data)
    // TODO: transfer this to rtk query
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}mruser-auth/verify-forgot-pwd-otp`, data)
    //   .then(response => {
    //     console.log(response)
    //     setOtpHide(true)
    //     setPasswordHide(false)
    //   })
    //   .catch(error => {
    //     console.error("There was an error!", error)
    //     swal({
    //       text: error.response.data.detail,
    //       icon: "error",
    //       position: "top-end",
    //       button: false,
    //       timer: 1500,
    //     })
    //   })
  }

  const changePassword = (e: any) => {
    const data = {
      session_id: merchantUser?.session_id[0],
      merchant_no: merchantUser?.user_no,
      new_pwd: e.new_password,
    }
    // TODO: transfer this to rtk query
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}mruser-auth/reset-pwd-otp`, data)
    //   .then(response => {
    //     console.log(response)
    //     redirect("/login-redirect")
    //   })
    //   .catch(error => {
    //     console.error("There was an error!", error)
    //     swal({
    //       text: error.response.data.detail,
    //       icon: "error",
    //       position: "top-end",
    //       button: false,
    //       timer: 1500,
    //     })
    //   })
  }
  return (
    <CContainer>
      <div hidden={userHide}>
        <CFormLabel>Reset password with OTP</CFormLabel>
        <CFormInput
          className="my-3 custom-input"
          placeholder="Username"
          type="text"
          onChange={(e: any) => {
            setUsername(e.target.value)
          }}
        />
        <CButton onClick={submitMerchantUerName} className="bg-danger text-light border-0 mt-2">
          Submit
        </CButton>
      </div>
      <div hidden={otpHide}>
        <CFormLabel className="text-danger m-0">Submit OTP</CFormLabel>
        <CFormInput
          className="my-3 custom-input border"
          placeholder="OTP"
          type="text"
          onChange={(e: any) => {
            setOtp(e.target.value)
          }}
        />
        <CButton onClick={submitOtp} className="text-light bg-danger border-0">
          Submit
        </CButton>
      </div>
      <div hidden={passwordHide}>
        <CForm onSubmit={handleSubmit(changePassword)}>
          <CFormLabel>New Password</CFormLabel>
          <CFormInput
            className="mb-2"
            placeholder="New Password"
            type="password"
            id="password"
            {...register("new_password", {
              required: "Please Provide New Password",
              minLength: {
                value: 6,
                message: "Password will be Minimum 6 Characters",
              },
              validate: value => {
                return (
                  [/[A-Z]/, /[a-z]/, /[0-9]/, /[#?!@$%^&*-]/].every(pattern => pattern.test(value)) ||
                  "Password is weak! Please Follow [A-Z],[a-z],[0-9],[#?!@$%^&*-]"
                )
              },
            })}
            onChange={(e: any) => {
              setNewPass(e.target.value)
            }}
          />
          <span className="text-danger">{(errors as any)?.new_password?.message}</span>
          <CFormCheck name="status" onClick={showPassword} label="Show Password" />
          <CFormLabel>Confirm Password</CFormLabel>
          <CFormInput
            className="mb-2"
            placeholder="Confirm Password"
            type="password"
            id="showPassword"
            onChange={(e: any) => {
              setConPass(e.target.value)
            }}
          />
          <span className="text-danger">{getPasswordMatchingMess()}</span>
          <CFormCheck name="status" onClick={showConPassword} label="Show Password" />
          <CButton type="submit" color="primary">
            Submit Password
          </CButton>
        </CForm>
      </div>
    </CContainer>
  )
}

export default ForgetPassword
