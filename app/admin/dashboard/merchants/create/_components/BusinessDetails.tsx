"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useAddressQuery, useCreateBusinessDetailsMutation, useMerchantCategoriesQuery } from "@/store"
import { getErrorMessage, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import React from "react"
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

const getDivisions = (data: any, countryId: number = 1) => {
  const country = (data?.countries || []).find((country: any) => country.id === countryId)
  return country ? country.divisions : []
}

const getDistrictsByDivision = (data: any, divisionId: string) => {
  const division = getDivisions(data).find((div: any) => div.id === parseInt(divisionId))
  const districts: any[] = []
  division?.cities?.forEach((city: any) => {
    const cityDistricts = city.districts.forEach((district: any) => {
      districts.push(district)
    })
  })
  return districts
}

const handleErrorResponse = (response: any, setError: any) => {
  const error = response?.error

  if (error?.status === 422 && error?.data?.detail) {
    error.data.detail.forEach((error: any) => {
      const field = error.loc[1] // Extract the field name from the error location
      const message = error.msg // Extract the error message
      setError(field, { type: "manual", message }) // Set the error in the form
    })
  }
}

const legalIdentityOptions = [
  { label: "Educational Institution", value: "Educational Institution" },
  { label: "Corporation", value: "Corporation" },
  { label: "Sole Proprietorship", value: "Sole Proprietorship" },
  { label: "Partnership", value: "Partnership" },
  { label: "Limited Liability Company", value: "Limited Liability Company" },
  { label: "Public Company", value: "Public Company" },
  { label: "Non-Governmental Organization", value: "Non-Governmental Organization" },
  { label: "Other", value: "Other" },
]

export const BusinessDetails = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm()

  const [createBusinessDetails] = useCreateBusinessDetailsMutation()
  const router = useRouter()
  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const { data: merchantCategories, isLoading: isCategoriesLoading } = useMerchantCategoriesQuery({})
  const selectedDivision = watch("division_id")
  // const selectedIndustryType = watch("industry_type")

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
      city_id: 1,
    }
    const response = await createBusinessDetails(arg)

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
              {legalIdentityOptions.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </div>
          <CRow>
            <CCol>
              <FormLabel required>Industry/Business Type</FormLabel>
              <CFormSelect
                {...register("industry_type", {
                  required: {
                    value: true,
                    message: "Please select an industry/business type",
                  },
                })}
                invalid={errors?.industry_type as any}
                feedbackInvalid={errors?.industry_type?.message as any}
                onChange={e => {
                  const selectedValue = e.target.value
                  setValue("merchant_category_id", selectedValue)
                  clearErrors("merchant_category_id")
                }}
                disabled={isCategoriesLoading}>
                <option value="">Select Industry/Business</option>
                {merchantCategories?.map((category: any) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>Merchant Category Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Merchant Category Code"
                {...register("merchant_category_id", {
                  required: {
                    value: true,
                    message: "Merchant category code is required",
                  },
                })}
                invalid={errors?.merchant_category_id as any}
                feedbackInvalid={errors?.merchant_category_id?.message as any}
                readOnly
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
                // reverse
                id="serviceCharge"
                label="Activate this option if the merchant will apply a service charge for transactions."
                invalid={errors?.bleeding as any}
                className="small"
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
