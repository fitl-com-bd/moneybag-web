"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useParams } from "@/hooks"
import {
  useAddressQuery,
  useCreateBusinessDetailsMutation,
  useMerchantCategoriesQuery,
  useUpdateBusinessDetailsMutation,
} from "@/store"
import { getDistrictsByDivision, getDivisions, getErrorMessage, handleErrorResponse, scrollToTop, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import isEmpty from "lodash/isEmpty"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const LEGAL_IDENTITY_OPTIONS = [
  { label: "Educational Institution", value: "Educational Institution" },
  { label: "Corporation", value: "Corporation" },
  { label: "Sole Proprietorship", value: "Sole Proprietorship" },
  { label: "Partnership", value: "Partnership" },
  { label: "Limited Liability Company", value: "Limited Liability Company" },
  { label: "Public Company", value: "Public Company" },
  { label: "Non-Governmental Organization", value: "Non-Governmental Organization" },
  { label: "Other", value: "Other" },
]

const STATUS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
  { label: "Draft", value: "DRAFT" },
]

export const BusinessDetails = ({ id, defaultValues }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm({ defaultValues })
  const isCreate = isEmpty(defaultValues)
  const [_, setParams] = useParams()
  const [createBusinessDetails, { isLoading: isCreateLoading }] = useCreateBusinessDetailsMutation()
  const [updateBusinessDetails, { isLoading: isUpdateLoading }] = useUpdateBusinessDetailsMutation()
  const isLoading = isCreateLoading || isUpdateLoading
  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const { data: merchantCategories, isLoading: isCategoriesLoading } = useMerchantCategoriesQuery({})
  const selectedDivision = watch("division_id")
  // const selectedIndustryType = watch("industry_type")

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
      city_id: 1,
    }
    const response = await (isCreate ? createBusinessDetails(arg) : updateBusinessDetails({ id, ...arg }))

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
      const id = response?.data?.data?.merchant_id
      setParams({ id, tab: "business_representative" })
      scrollToTop()
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
                  pattern: {
                    value: /^\d+$/,
                    message: "BIN must be a number",
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
              {LEGAL_IDENTITY_OPTIONS.map((option, index) => (
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
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
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
                  pattern: {
                    value: /^\d+$/,
                    message: "Postal code must be a number",
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
                  pattern: {
                    value: /^\d+$/,
                    message: "Max ticket size must be a number",
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
                {STATUS.map(status => (
                  <CFormCheck
                    type="radio"
                    {...register("merchant_status", {
                      required: {
                        value: true,
                        message: "Please select a status",
                      },
                    })}
                    value={status.value}
                    label={status.label}
                    id={status.value}
                    invalid={errors?.merchant_status as any}
                    key={status.value}
                  />
                ))}
              </div>
              {errors?.merchant_status && (
                <div className="invalid-feedback d-block">{errors?.merchant_status?.message as any}</div>
              )}
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary back disabled={isLoading}>
            Cancel
          </Button>
          <Button submit disabled={isLoading} isLoading={isLoading}>
            Next
          </Button>
        </FormFooter>
      </CForm>
    </>
  )
}
