"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBusinessDetailsMutation } from "@/store/features/api/merchantServiceApi"
import { getErrorMessage, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const businessOption = [
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
                {...register("businessName", {
                  required: {
                    value: true,
                    message: "Please enter the business name",
                  },
                })}
                invalid={errors?.businessName as any}
                feedbackInvalid={errors?.businessName?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Business Short Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Business Short Name"
                {...register("businessShortName", {
                  required: {
                    value: true,
                    message: "Please enter the business short name",
                  },
                })}
                invalid={errors?.businessShortName as any}
                feedbackInvalid={errors?.businessShortName?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>BIN</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter BIN"
                {...register("bin", {
                  required: {
                    value: true,
                    message: "Please enter the BIN",
                  },
                })}
                invalid={errors?.bin as any}
                feedbackInvalid={errors?.bin?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <div className="form-group">
            <FormLabel required>Legal Identity of Company</FormLabel>
            <CFormSelect
              {...register("businessOption", {
                required: {
                  value: true,
                  message: "Please select an option",
                },
              })}
              invalid={errors?.businessOption as any}
              feedbackInvalid={errors?.businessOption?.message as any}>
              <option value="">Select</option>
              {businessOption.map((country, index) => (
                <option value={country} key={index}>
                  {country}
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
              <CFormInput type="text" placeholder="Enter Merchant Category Code" />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Business Description</FormLabel>
              <CFormTextarea rows={4} text="" />
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
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter the phone number",
                  },
                })}
                invalid={errors?.phoneNumber as any}
                feedbackInvalid={errors?.phoneNumber?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Business Website</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Business Website"
                {...register("businessWebsite", {
                  required: {
                    value: true,
                    message: "Please enter the business website",
                  },
                })}
                invalid={errors?.businessWebsite as any}
                feedbackInvalid={errors?.businessWebsite?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Email</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter the email",
                  },
                })}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
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
                {...register("address", {
                  required: {
                    value: true,
                    message: "Please enter the address",
                  },
                })}
                invalid={errors?.address as any}
                feedbackInvalid={errors?.address?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>City</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter City"
                {...register("city", {
                  required: {
                    value: true,
                    message: "Please enter the city",
                  },
                })}
                invalid={errors?.city as any}
                feedbackInvalid={errors?.city?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>District</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter District"
                {...register("district", {
                  required: {
                    value: true,
                    message: "Please enter the district",
                  },
                })}
                invalid={errors?.district as any}
                feedbackInvalid={errors?.district?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Postal Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Postal Code"
                {...register("postalCode", {
                  required: {
                    value: true,
                    message: "Please enter the postal code",
                  },
                })}
                invalid={errors?.postalCode as any}
                feedbackInvalid={errors?.postalCode?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Max Ticket Size</FormLabel>
              <CFormSelect>
                <option value="">Select</option>
                {businessOption.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel>Service Charge by Merchant*</FormLabel>
              <CFormSwitch
                {...register("serviceCharge", {})}
                reverse
                id="serviceCharge"
                label="Activate this option if the merchant will apply a service charge for transactions."
                invalid={errors?.serviceCharge as any}
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
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="active"
                  label="Active"
                  id="active"
                  invalid={errors?.status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="inactive"
                  label="Inactive"
                  id="inactive"
                  invalid={errors?.status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="suspended"
                  label="Suspended"
                  id="suspended"
                  invalid={errors?.status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="draft"
                  label="Draft"
                  id="draft"
                  invalid={errors?.status as any}
                />
              </div>
              {errors?.status && <div className="invalid-feedback d-block">{errors?.status?.message as any}</div>}
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
