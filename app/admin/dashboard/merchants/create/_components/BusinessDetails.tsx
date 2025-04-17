"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBusinessDetailsMutation } from "@/store/features/api/merchantServiceApi"
import { getErrorMessage, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const businessOption = [
  "CORPORATION",
  "Educational Institute",
  "Public Limited",
  "Partnership",
  "Proprietorship",
  "Non Profit",
  "Private Limited",
]

export const BusinessDetails = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createBusinessDetails] = useCreateBusinessDetailsMutation()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const response = await createBusinessDetails(data)
    
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

  return (
    <>
      <SectionHeader
        title="Enter Your Business Details"
        subtitle="Fill in all required information about your business, including contact details and registration documents."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Business Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Business Name"
                {...register("business_name", {
                  required: {
                    value: true,
                    message: "Please enter the business name",
                  },
                })}
                invalid={errors?.business_name as any}
                feedbackInvalid={errors?.business_name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Business Short Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Business Short Name"
                {...register("business_short_name", {
                  required: {
                    value: true,
                    message: "Please enter the business short name",
                  },
                })}
                invalid={errors?.business_short_name as any}
                feedbackInvalid={errors?.business_short_name?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>BIN</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter BIN"
                {...register("bin_no", {
                  required: {
                    value: true,
                    message: "Please enter the BIN",
                  },
                })}
                invalid={errors?.bin_no as any}
                feedbackInvalid={errors?.bin_no?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <div className="form-group">
            <FormLabel required>Legal Identity of Company</FormLabel>
            <CFormSelect
              {...register("legal_identity", {
                required: {
                  value: true,
                  message: "Please select an option",
                },
              })}
              invalid={errors?.legal_identity as any}
              feedbackInvalid={errors?.legal_identity?.message as any}>
              <option value="">Select</option>
              {businessOption.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </CFormSelect>
          </div>
          <CRow>
            <CCol>
              <FormLabel required>Industry/Business Type</FormLabel>
              <CFormSelect>
                <option value="">Select Industry/Business</option>
                {businessOption.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>Merchant Category Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Merchant Category Code"
                {...register("merchant_category_id", {
                  required: {
                    value: true,
                    message: "Please enter the merchant category code",
                  },
                })}
                invalid={errors?.merchant_category_id as any}
                feedbackInvalid={errors?.merchant_category_id?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Business Description</FormLabel>
              <CFormTextarea
                rows={4}
                placeholder="Enter Business Description"
                {...register("business_desc", {
                  required: {
                    value: true,
                    message: "Please enter the business description",
                  },
                })}
                invalid={errors?.business_desc as any}
                feedbackInvalid={errors?.business_desc?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Phone Number"
                {...register("business_phone", {
                  required: {
                    value: true,
                    message: "Please enter the phone number",
                  },
                })}
                invalid={errors?.business_phone as any}
                feedbackInvalid={errors?.business_phone?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Business Website</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Business Website"
                {...register("business_website", {
                  required: {
                    value: true,
                    message: "Please enter the business website",
                  },
                })}
                invalid={errors?.business_website as any}
                feedbackInvalid={errors?.business_website?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Email</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email"
                {...register("business_email", {
                  required: {
                    value: true,
                    message: "Please enter the email",
                  },
                })}
                invalid={errors?.business_email as any}
                feedbackInvalid={errors?.business_email?.message as any}
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
              <FormLabel required>Max Ticket Size</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Max Ticket Size"
                {...register("max_ticket_size", {
                  required: {
                    value: true,
                    message: "Please enter the max ticket size",
                  },
                })}
                invalid={errors?.max_ticket_size as any}
                feedbackInvalid={errors?.max_ticket_size?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Service Charge by Merchant*</FormLabel>
              <CFormSwitch
                {...register("bleeding", {})}
                reverse
                id="serviceCharge"
                label="Activate this option if the merchant will apply a service charge for transactions."
                invalid={errors?.bleeding as any}
                // feedbackInvalid={errors?.serviceCharge?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-4">
                <CFormCheck
                  type="radio"
                  {...register("merchant_status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="active"
                  label="Active"
                  id="active"
                  invalid={errors?.merchant_status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("merchant_status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="inactive"
                  label="Inactive"
                  id="inactive"
                  invalid={errors?.merchant_status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("merchant_status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="suspended"
                  label="Suspended"
                  id="suspended"
                  invalid={errors?.merchant_status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("merchant_status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="draft"
                  label="Draft"
                  id="draft"
                  invalid={errors?.merchant_status as any}
                />
              </div>
              {errors?.merchant_status && (
                <div className="invalid-feedback d-block">{errors?.merchant_status?.message as any}</div>
              )}
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary>Cancel</Button>
          <Button submit>Update</Button>
        </FormFooter>
      </CForm>
    </>
  )
}
