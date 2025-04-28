"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBankMutation } from "@/store"
import { getErrorMessage, handleErrorResponse, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormTextarea, CRow } from "@coreui/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const BankInformation = ({ setId, changeTab }: any) => {
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

  const [createBank, { isLoading }] = useCreateBankMutation()

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
    }
    const response = await createBank(arg)

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
      setId(response?.data?.data?.merchant_id)
      changeTab("add_branch")
    }
  }

  return (
    <>
      <SectionHeader title="Bank Information" subtitle="Register a new bank and manage its branches." />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Bank Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Bank Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter the bank Name",
                  },
                })}
                invalid={errors?.name as any}
                feedbackInvalid={errors?.name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Alias / Short Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Bank Short Name"
                {...register("short_name", {
                  required: {
                    value: true,
                    message: "Please enter the bank short name",
                  },
                })}
                invalid={errors?.short_name as any}
                feedbackInvalid={errors?.short_name?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Swift Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Swift Code"
                {...register("swift_code", {
                  required: {
                    value: true,
                    message: "Please enter the Swift Code",
                  },
                })}
                invalid={errors?.swift_code as any}
                feedbackInvalid={errors?.swift_code?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Primary Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Primary Phone Number"
                {...register("primary_phone", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.primary_phone as any}
                feedbackInvalid={errors?.primary_phone?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Secondary Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Secondary Phone Number"
                {...register("secondary_phone", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.secondary_phone as any}
                feedbackInvalid={errors?.secondary_phone?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Email Address</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email Address"
                {...register("email")}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Official Website</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Official Website"
                {...register("website")}
                invalid={errors?.website as any}
                feedbackInvalid={errors?.website?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
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
                  {...register("is_active", {
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                />
                <CFormCheck type="radio" label="Inactive" value="false" {...register("is_active")} />
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
