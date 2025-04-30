"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBankMutation } from "@/store"
import { getErrorMessage, handleErrorResponse, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormTextarea, CRow } from "@coreui/react"
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
              <CFormInput
                type="text"
                placeholder="Select Fintech Type"
                {...register("type")}
                invalid={errors?.type as any}
                feedbackInvalid={errors?.type?.message as any}
              />
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
                {...register("website")}
                invalid={errors?.website as any}
                feedbackInvalid={errors?.website?.message as any}
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
