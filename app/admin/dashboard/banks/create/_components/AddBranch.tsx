"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useAllBranchesQuery, useBanksQuery, useCreateMerchantBankAccountMutation } from "@/store"
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

export const AddBranch = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createMerchantBankAccount, { isLoading }] = useCreateMerchantBankAccountMutation()
  const { data: banks, isLoading: isBanksLoading } = useBanksQuery({})
  const { data: branches, isLoading: isBranchesLoading } = useAllBranchesQuery({})
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const arg = {
      merchantId: id,
      account_name: data.account_name,
      account_number: data.account_number,
      branch_id: data.branch_id, // Replace with actual branch ID
      notes: data.notes || "Merchant bank account",
    }

    const response = await createMerchantBankAccount(arg)

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
      }).then(() => {
        router.back()
      })
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
              {/* <CFormSelect
                {...register("bank_name", {
                  required: {
                    value: true,
                    message: "Please select the bank name",
                  },
                })}
                invalid={errors?.bank_name as any}
                feedbackInvalid={errors?.bank_name?.message as any}
                disabled={isBanksLoading}>
                <option value="">Select Bank Name</option>
                {banks?.map((bank: any) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </CFormSelect> */}
            </CCol>

            <CCol>
              <FormLabel required>Branch Name</FormLabel>
              <CFormSelect
                {...register("branch_id", {
                  required: {
                    value: true,
                    message: "Please select the branch name",
                  },
                })}
                invalid={errors?.branch_id as any}
                feedbackInvalid={errors?.branch_id?.message as any}
                disabled={isBranchesLoading}>
                <option value="">Select Branch Name</option>
                {branches?.map((branch: any) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
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
          <CRow>
            <CCol>
              <FormLabel>Notes</FormLabel>
              <CFormTextarea rows={4} placeholder="Enter Notes" {...register("notes")} />
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary onClick={() => changeTab("payment_service")} disabled={isLoading} isLoading={isLoading}>
            Previous
          </Button>
          <Button submit disabled={isLoading} isLoading={isLoading}>
            Submit
          </Button>
        </FormFooter>
      </CForm>
    </>
  )
}
