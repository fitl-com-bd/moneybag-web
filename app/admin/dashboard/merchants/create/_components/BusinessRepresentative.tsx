"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import {
  useCreateMerchantRepresentativeMutation,
  useMerchantNidMutation,
} from "@/store/features/api/merchantServiceApi"
import { getErrorMessage, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const BusinessRepresentative = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createMerchantRepresentative] = useCreateMerchantRepresentativeMutation()
  const [merchantNid, { isLoading: isSearching }] = useMerchantNidMutation()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const response = await createMerchantRepresentative(data)

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
      })
      // .then(() => {
      //   router.back()
      // })
    }
  }

  const handleSearch = async () => {
    const nid = watch("nid_number")
    const birthdate = watch("birthdate")

    if (!nid || !birthdate) {
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please enter both NID and Date of Birth before searching.",
        confirmButtonText: "Ok",
      })
    }

    try {
      const response = await merchantNid({ nid_number: nid, date_of_birth: birthdate })
      if (response?.error) {
        return Swal.fire({
          title: "Error",
          icon: "error",
          text: getErrorMessage(response.error),
          confirmButtonText: "Ok",
        })
      }

      if (response?.data) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "NID details retrieved successfully.",
          confirmButtonText: "Ok",
        })
        // Handle the response data as needed
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "An unexpected error occurred.",
        confirmButtonText: "Ok",
      })
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
            <CCol>
              <div className="form-group">
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
              <div className="form-group">
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
            </CCol>
            <CCol>
              <Button type="button" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </CCol>
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
              <FormLabel required>City</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter City"
                {...register("city_id", {
                  required: {
                    value: true,
                    message: "Please enter the city",
                  },
                })}
                invalid={errors?.city_id as any}
                feedbackInvalid={errors?.city_id?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>District</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter District"
                {...register("district_id", {
                  required: {
                    value: true,
                    message: "Please enter the district",
                  },
                })}
                invalid={errors?.district_id as any}
                feedbackInvalid={errors?.district_id?.message as any}
              />
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
          <Button secondary>Previous</Button>
          <Button submit>Next</Button>
        </FormFooter>
      </CForm>
    </>
  )
}
