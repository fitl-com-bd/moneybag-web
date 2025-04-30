"use client"
import { Button, Card, FormFooter, FormLabel, Icon, SectionHeader } from "@/components/ui"
import { useAddressQuery } from "@/store"
import {
  useCreateMerchantRepresentativeMutation,
  useMerchantNidMutation,
} from "@/store/features/api/merchantServiceApi"
import { getDistrictsByDivision, getDivisions, getErrorMessage, handleErrorResponse, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const BusinessRepresentative = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()
  const [createMerchantRepresentative, { isLoading }] = useCreateMerchantRepresentativeMutation()
  const [merchantNidSearch] = useMerchantNidMutation()
  const router = useRouter()
  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const selectedDivision = watch("division_id")

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
      id,
      city_id: 1,
    }

    const response = await createMerchantRepresentative(arg)

    if (response?.error) {
      handleErrorResponse(response, setError)
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: getErrorMessage(response.error),
        confirmButtonText: "Ok",
      })
    }

    if (response?.data?.success) {
      toast.success(response?.data?.message)
      changeTab("payment_service")
    }
  }

  const handleSearchNid = async () => {
    const arg = {
      nid_number: watch("nid_number"),
      date_of_birth: watch("birthdate"),
    }

    const response = await merchantNidSearch(arg)

    if (response?.error) {
      handleErrorResponse(response, setError)
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: getErrorMessage(response.error),
        confirmButtonText: "Ok",
      })
    }

    if (response?.data?.success) {
      toast.success(response?.data?.message || "NID details fetched successfully.")
      // Optionally, populate form fields with response data
      // setValue("first_name", response.data.first_name)
      // setValue("last_name", response.data.last_name)
    }
  }

  return (
    <>
      <SectionHeader
        title="Add Business Representative Information"
        subtitle="Enter the details of the authorized representative for your business, including identification and contact information."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol className="">
              <div className="form-group mb-3">
                <FormLabel required>NID</FormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter NID"
                  {...register("nid_number", {
                    required: {
                      value: true,
                      message: "Please enter the NID",
                    },
                  })}
                  invalid={errors?.nid_number as any}
                  feedbackInvalid={errors?.nid_number?.message as any}
                />
              </div>
              <div className="form-group mb-3">
                <FormLabel required>Date of Birth</FormLabel>
                <CFormInput
                  type="date"
                  {...register("birthdate", {
                    required: {
                      value: true,
                      message: "Please enter the date of birth",
                    },
                  })}
                  invalid={errors?.birthdate as any}
                  feedbackInvalid={errors?.birthdate?.message as any}
                />
              </div>
              <Button secondary onClick={handleSearchNid} className="px-4 d-inline-flex align-items-center">
                <Icon name="search" size={16} className="me-2" />
                Search
              </Button>
            </CCol>
            <CCol></CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>First Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter First Name"
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
                placeholder="Enter Last Name"
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
              <FormLabel required>Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Phone Number"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Please enter the phone number",
                  },
                })}
                invalid={errors?.phone as any}
                feedbackInvalid={errors?.phone?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Email Address</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email Address"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter the email address",
                  },
                })}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormCheck
                type="checkbox"
                {...register("is_merchant_user")}
                label="Is Merchant User (Merchant Admin)"
                id="isMerchantUser"
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Password</FormLabel>
              <CFormInput
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter the password",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                    message: "Password must contain at least one letter, one number, and one special character",
                  },
                })}
                invalid={errors?.password as any}
                feedbackInvalid={errors?.password?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Confirm Password</FormLabel>
              <CFormInput
                type="password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Please confirm the password",
                  },
                  validate: value => value === watch("password") || "Passwords do not match",
                })}
                invalid={errors?.confirm_password as any}
                feedbackInvalid={errors?.confirm_password?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Address</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Address"
                {...register("street", {
                  required: {
                    value: true,
                    message: "Please enter the address",
                  },
                })}
                invalid={errors?.street as any}
                feedbackInvalid={errors?.street?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Division</FormLabel>
              <CFormSelect
                {...register("division_id", {
                  required: {
                    value: true,
                    message: "Please select a division",
                  },
                })}
                invalid={errors?.division_id as any}
                feedbackInvalid={errors?.division_id?.message as any}
                disabled={isAddressLoading}>
                <option value="">Select Division</option>
                {getDivisions(addressData).map((division: any) => (
                  <option value={division.id} key={division.id}>
                    {division.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>District</FormLabel>
              <CFormSelect
                {...register("district_id", {
                  required: {
                    value: true,
                    message: "Please select a district",
                  },
                })}
                invalid={errors?.district_id as any}
                feedbackInvalid={errors?.district_id?.message as any}
                disabled={isAddressLoading || !selectedDivision}>
                <option value="">Select District</option>
                {getDistrictsByDivision(addressData, selectedDivision).map(district => (
                  <option value={district.id} key={district.id}>
                    {district.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Postal Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Postal Code"
                {...register("postal_code", {
                  required: {
                    value: true,
                    message: "Please enter the postal code",
                  },
                })}
                invalid={errors?.postal_code as any}
                feedbackInvalid={errors?.postal_code?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Permanent Address</FormLabel>
              <CFormTextarea
                rows={4}
                placeholder="Enter Permanent Address"
                {...register("permanent_address", {
                  required: {
                    value: true,
                    message: "Please enter the permanent address",
                  },
                })}
                invalid={errors?.permanent_address as any}
                feedbackInvalid={errors?.permanent_address?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary onClick={() => changeTab("business_details")} disabled={isLoading}>
            Previous
          </Button>
          <Button submit disabled={isLoading} isLoading={isLoading}>
            Next
          </Button>
        </FormFooter>
      </CForm>
    </>
  )
}
