"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { ORGANIZATION_TYPE } from "@/constants"
import { useCreateFinancialOrganizationMutation } from "@/store"
import { getErrorMessage, handleErrorResponse, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const BasicInformation = ({ setId, changeTab }: any) => {
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

  const [createFinancialOrganization, { isLoading }] = useCreateFinancialOrganizationMutation()

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
    }
    console.log(`🔥 | arg:`, arg)

    const response = await createFinancialOrganization(arg)

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
      setId(response?.data?.data?.id)
      changeTab("add_branch")
    }
  }

  return (
    <>
      <SectionHeader
        title="Add New Fintech"
        subtitle="Register a new fintech provider and configure its integration details."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Fintech Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Fintech Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter the fintech name",
                  },
                })}
                invalid={errors?.name as any}
                feedbackInvalid={errors?.name?.message as any}
              />
            </CCol>

            <CCol>
              <FormLabel>Alias / Short Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Alias / Short Name"
                {...register("short_name")}
                invalid={errors?.short_name as any}
                feedbackInvalid={errors?.short_name?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Fintech Type</FormLabel>
              <CFormSelect
                {...register("organization_type")}
                invalid={errors?.organization_type as any}
                feedbackInvalid={errors?.organization_type?.message as any}>
                <option value="">Select Fintech Type</option>
                {ORGANIZATION_TYPE.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Point of Contact</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Point of Contact"
                {...register("point_of_contact")}
                invalid={errors?.point_of_contact as any}
                feedbackInvalid={errors?.point_of_contact?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Phone Number"
                {...register("phone_number", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.phone_number as any}
                feedbackInvalid={errors?.phone_number?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Email</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email"
                {...register("email")}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Official Website</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Official Website"
                {...register("official_website")}
                invalid={errors?.official_website as any}
                feedbackInvalid={errors?.official_website?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Customer Support Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Customer Support Number"
                {...register("customer_support_number", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.customer_support_number as any}
                feedbackInvalid={errors?.customer_support_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Remarks / Note</FormLabel>
              <CFormTextarea rows={4} placeholder="Enter Note" {...register("notes")} />
            </CCol>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-3">
                <CFormCheck
                  type="radio"
                  label="Active"
                  value="true"
                  id="active"
                  {...register("is_active", {
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                  invalid={errors?.is_active as any}
                />
                <CFormCheck
                  type="radio"
                  label="Inactive"
                  value="false"
                  id="inactive"
                  {...register("is_active", {
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                  invalid={errors?.is_active as any}
                />
              </div>
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
