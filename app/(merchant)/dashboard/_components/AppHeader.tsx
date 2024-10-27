"use client"
import {
  CButton,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CHeader,
  CHeaderToggler,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { Avatar, Icon } from "@/components/ui"
import { useAuth } from "@/hooks"
import { sidebarToggle } from "@/store"
import { userSingout } from "@/utils"
import toast from "react-hot-toast"

const AppHeader = () => {
  const { user, isLoading } = useAuth()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState<boolean | undefined>()
  const [newPass, setNewPass] = useState<string | undefined>()
  const [conPass, setConPass] = useState<string | undefined>()

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" })

  const openModal = () => {
    setVisible(true)
  }

  const changePass = (e: any) => {
    if (newPass != conPass) {
      toast.error("Password don't match")
    } else {
      let data = {
        current_pwd: e.Prev_password,
        new_pwd: e.new_password,
      }
      console.log(data)
      // TODO: transfer this to rtk query
      // const headers = {
      //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      // }
      // axios
      //   .put(`${process.env.REACT_APP_API_URL}mruser-auth/update-pwd`, data, {
      //     headers,
      //   })
      //   .then(responce => {
      //     console.log(responce.data)
      //     swal({
      //       position: "top-end",
      //       text: responce.data.msg,
      //       icon: "success",
      //       button: false,
      //       timer: 1500,
      //     })
      //     setVisible(false)
      //     reset()
      //   })
      //   .catch(error => {
      //     console.error("There was an error!", error)
      //     swal({
      //       position: "top-end",
      //       text: "Password Change Failed",
      //       icon: "error",
      //       button: false,
      //       timer: 1500,
      //     })
      //   })
    }
  }

  const showPassword = () => {
    var x = document.getElementById("password1") as any
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }
  const showPassword2 = () => {
    var x = document.getElementById("password2") as any
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }
  const showPassword3 = () => {
    var x = document.getElementById("password3") as any
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

  return (
    <div>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="text-light bg-danger border-0 text-center rounded"
            onClick={() => dispatch(sidebarToggle())}>
            <Icon name="menu" />
          </CHeaderToggler>
          {!isLoading && user && (
            <CDropdown className="">
              <CDropdownToggle href="#" color="secondary" className="btn-clear d-flex align-items-center gap-2 py-0">
                <Avatar src={user.merchant_logo_url} alt={user.merchant_name} />
                <div className="flex-col justify-content-between align-items-start small">
                  <span className="avatar-name-sm lh-1">{user.merchant_name}</span>
                  <span className="small">@{user.user_id}</span>
                </div>
              </CDropdownToggle>
              <CDropdownMenu className="bg-white shadow">
                <CDropdownItem component="button" className="chang-password custom-text fw-bold" onClick={openModal}>
                  Change Password
                </CDropdownItem>
                <CDropdownItem component="button" className="fw-bold" onClick={userSingout}>
                  Sign Out
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          )}
        </CContainer>
        <div>
          <CModal
            visible={visible}
            onClose={() => {
              setVisible(false), reset()
            }}>
            <CModalHeader
              className="border border-light"
              // onClose={() => setVisible(false)}
            >
              <CModalTitle className="text-danger">Change Password</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CContainer>
                <CForm onSubmit={handleSubmit(changePass)}>
                  <CFormLabel className="mt-2">Previous Password</CFormLabel>
                  <CFormInput
                    className="custom-input mb-2"
                    type="password"
                    id="password1"
                    {...register("Prev_password", {})}
                  />
                  <span className="text-danger">{errors.Prev_password?.message as string}</span>
                  <span className="text-danger">{errors.Prev_password?.message as string}</span>
                  <CFormCheck name="status" onClick={showPassword} label="Show Password" />
                  <CFormLabel className="mt-2">New Password</CFormLabel>
                  <CFormInput
                    className="custom-input mb-2"
                    type="password"
                    id="password2"
                    {...register("new_password", {
                      minLength: {
                        value: 6,
                        message: "Password will be Minimum 6 Characters",
                      },
                      validate: value => {
                        return (
                          [/[A-Z]/, /[a-z]/, /[0-9]/, /[#?!@$%^&*-]/].every(pattern => pattern.test(value)) ||
                          "Password is weak!"
                        )
                      },
                    })}
                    onChange={e => {
                      setNewPass(e.target.value)
                    }}
                  />
                  <span className="text-danger">{errors.new_password?.message as string}</span>
                  <CFormCheck name="status" onClick={showPassword2} label="Show Password" />
                  <CFormLabel className="mt-2">Confirm Password</CFormLabel>
                  <CFormInput
                    className="custom-input mb-2"
                    type="password"
                    id="password3"
                    onChange={e => {
                      setConPass(e.target.value)
                    }}
                  />
                  <span className="text-danger">{getPasswordMatchingMess()}</span>
                  <CFormCheck name="status" onClick={showPassword3} label="Show Password" />
                  <div className="text-center mt-2">
                    <CButton color="danger text-light" type="submit">
                      Change Password
                    </CButton>
                  </div>
                </CForm>
              </CContainer>
            </CModalBody>
          </CModal>
        </div>
      </CHeader>
    </div>
  )
}

export default AppHeader
