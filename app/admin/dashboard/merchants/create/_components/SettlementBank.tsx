// /api/v2/banks/accounts/merchant/:merchant_id/
"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBusinessDetailsMutation } from "@/store/features/api/merchantServiceApi"
import { getErrorMessage, Swal } from "@/utils"
import {
  CCardBody,
  CCardLink,
  CCardTitle,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CRow,
} from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
export const SettlementBank = () => {
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
        title="Provide Settlement Bank Details"
        subtitle="Enter the banking information required to process and settle transactions securely."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Bank Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Bank Name"
                {...register("bank_name", {
                  required: {
                    value: true,
                    message: "Please enter the bank name",
                  },
                })}
                invalid={errors?.bank_name as any}
                feedbackInvalid={errors?.bank_name?.message as any}
              />
            </CCol>

            <CCol>
              <FormLabel required>Branch Name</FormLabel>
              <CFormSelect
                {...register("branch_name", {
                  required: {
                    value: true,
                    message: "Please select the branch name",
                  },
                })}
                invalid={errors?.branch_name as any}
                feedbackInvalid={errors?.branch_name?.message as any}>
                <option value="">Choose...</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Routing No</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Routing No"
                {...register("routing_no", {
                  required: {
                    value: true,
                    message: "Please enter the routing number",
                  },
                })}
                invalid={errors?.routing_no as any}
                feedbackInvalid={errors?.routing_no?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Swift Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Swift Code"
                {...register("swift_code", {
                  required: {
                    value: true,
                    message: "Please enter the swift code",
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
              <FormLabel required>Account Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Account Name"
                {...register("account_name", {
                  required: {
                    value: true,
                    message: "Please enter the account name",
                  },
                })}
                invalid={errors?.account_name as any}
                feedbackInvalid={errors?.account_name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Account Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Account Number"
                {...register("account_number", {
                  required: {
                    value: true,
                    message: "Please enter the account number",
                  },
                })}
                invalid={errors?.account_number as any}
                feedbackInvalid={errors?.account_number?.message as any}
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
