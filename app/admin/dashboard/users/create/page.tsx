"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader, ShowPassword } from "@/components/ui"
import { DEPARTMENTS, GENDERS } from "@/constants"
import { useCreateUserMutation, useRolesQuery } from "@/store"
import { getErrorMessage, getOptions, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CRow } from "@coreui/react"
import omit from "lodash/omit"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
]

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()
  const { data: roles, isLoading } = useRolesQuery({})
  const [createUser] = useCreateUserMutation() // Use the mutation hook
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const arg = omit(data, ["confirm_password"])
    const response = await createUser(arg)

    if (response?.error) {
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: getErrorMessage(response.error),
        confirmButtonText: "Ok",
      })
    }

    if (response?.data?.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: response?.data?.message,
        confirmButtonText: "Continue",
      }).then(() => {
        router.back()
      })
    }
  }

  return (
    <>
      <SectionHeader title="Create User" subtitle="Create a new user with the required details" />
      <CForm className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>First Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="First Name"
                {...register("first_name", {
                  required: {
                    value: true,
                    message: "Please enter the first name",
                  },
                })}
                invalid={errors?.first_name as any}
                feedbackInvalid={errors?.first_name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Last Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Last Name"
                {...register("last_name", {
                  required: {
                    value: true,
                    message: "Please enter the last name",
                  },
                })}
                invalid={errors?.last_name as any}
                feedbackInvalid={errors?.last_name?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Email</FormLabel>
              <CFormInput
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter the email",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Phone</FormLabel>
              <CFormInput
                type="text"
                placeholder="Phone"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Please enter the phone number",
                  },

                  pattern: {
                    value: /^\+?[1-9]\d{9,14}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                invalid={errors?.phone as any}
                feedbackInvalid={errors?.phone?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>User ID</FormLabel>
              <CFormInput
                type="text"
                placeholder="User"
                {...register("user_id", {
                  required: {
                    value: true,
                    message: "Please enter the user ID",
                  },
                  minLength: {
                    value: 5,
                    message: "User ID must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 15,
                    message: "User ID must be at most 15 characters long",
                  },
                })}
                invalid={errors?.user_id as any}
                feedbackInvalid={errors?.user_id?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Gender</FormLabel>
              <CFormSelect placeholder="Select" {...register("gender")}>
                <option value="" selected disabled>
                  Select
                </option>
                {GENDERS.map(gender => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>National ID</FormLabel>
              <CFormInput
                type="text"
                placeholder="National ID"
                {...register("national_id", {
                  minLength: {
                    value: 5,
                    message: "National ID must be at least 5 characters long",
                  },
                })}
                invalid={errors?.national_id as any}
                feedbackInvalid={errors?.national_id?.message as any}
              />
            </CCol>
            <CCol></CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Role</FormLabel>
              <CFormSelect
                placeholder="Select Role"
                {...register("role_id", {
                  required: {
                    value: true,
                    message: "Please select a role",
                  },
                })}>
                <option value="" selected disabled>
                  Select Parent Role
                </option>
                {getOptions(roles, "title", "id").map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              {errors?.role_id && <div className="invalid-feedback d-block">{errors?.role_id?.message as any}</div>}
            </CCol>

            <CCol>
              <FormLabel>Department</FormLabel>
              <CFormSelect placeholder="Select" {...register("department")}>
                <option value="" selected disabled>
                  Select
                </option>
                {DEPARTMENTS.map(department => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-4">
                {STATUS_OPTIONS.map(status => (
                  <CFormCheck
                    key={status.value}
                    type="radio"
                    {...register("status", {
                      required: {
                        value: true,
                        message: "Please select a status",
                      },
                    })}
                    value={status.value}
                    label={status.label}
                    id={status.value}
                    invalid={errors?.status as any}
                  />
                ))}
              </div>
              {errors?.status && <div className="invalid-feedback d-block">{errors?.status?.message as any}</div>}
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Emergency Contact Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Emergency Contact Name"
                {...register("emergency_contact_name", {
                  minLength: {
                    value: 2,
                    message: "Emergency Contact Name must be at least 2 characters long",
                  },
                })}
                invalid={errors?.emergency_contact_name as any}
                feedbackInvalid={errors?.emergency_contact_name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Email Address</FormLabel>
              <CFormInput
                type="email"
                placeholder="Emergency Contact Email"
                {...register("emergency_contact_email", {
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid emergency contact email",
                  },
                })}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Emergency Contact Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Emergency Contact Number"
                {...register("emergency_contact_number", {
                  pattern: {
                    value: /^\+?[1-9]\d{9,14}$/,
                    message: "Please enter a valid emergency contact number",
                  },
                })}
                invalid={errors?.emergency_contact_number as any}
                feedbackInvalid={errors?.emergency_contact_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Password</FormLabel>
              <ShowPassword>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a password",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
                    },
                  })}
                  invalid={errors?.password as any}
                  feedbackInvalid={errors?.password?.message as any}
                />
              </ShowPassword>
            </CCol>
            <CCol>
              <FormLabel required>Confirm Password</FormLabel>
              <ShowPassword>
                <CFormInput
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "Please confirm your password",
                    },
                    validate: value => value === watch("password") || "Passwords do not match",
                  })}
                  invalid={errors?.confirm_password as any}
                  feedbackInvalid={errors?.confirm_password?.message as any}
                />
              </ShowPassword>
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary back>
            Cancel
          </Button>
          <Button submit>Save</Button>
        </FormFooter>
      </CForm>
    </>
  )
}

export default CreateUser
