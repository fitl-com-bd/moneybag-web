"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useAddressQuery, useAllBranchesQuery, useBanksQuery, useCreateBranchMutation } from "@/store"
import { getDistrictsByDivision, getDivisions, getErrorMessage, Swal } from "@/utils"
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

export const SettlementAccount = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createBranch, { isLoading }] = useCreateBranchMutation()
  const { data: banks, isLoading: isBanksLoading } = useBanksQuery({})
  console.log(`🔥 | banks:`, banks)

  const { data: branches, isLoading: isBranchesLoading } = useAllBranchesQuery({})
  const router = useRouter()

  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const selectedDivision = watch("division_id")

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
      bank_id: id, // Ensure bank_id is included in the payload
    }

    const response = await createBranch(arg)

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
        title="Add Settlement Bank"
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
                {...register("fintech_name", {
                  required: {
                    value: true,
                    message: "Please enter the fintech name",
                  },
                })}
                invalid={errors?.fintech_name as any}
                feedbackInvalid={errors?.fintech_name?.message as any}
              />
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Settlement Bank</FormLabel>
              <CFormSelect
                {...register("settlement_bank")}
                invalid={errors?.settlement_bank as any}
                feedbackInvalid={errors?.settlement_bank?.message as any}>
                <option value="">Select Settlement Bank</option>
                {banks?.data?.map((bank: any) => (
                  <option value={bank.id} key={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </CFormSelect>
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
                <option value="">Select Branch Name</option>
                {branches?.map((branch: any) => (
                  <option value={branch.id} key={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Swift Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Swift Code"
                {...register("swift_code")}
                invalid={errors?.swift_code as any}
                feedbackInvalid={errors?.swift_code?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Routing Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Routing Number"
                {...register("routing_number")}
                invalid={errors?.routing_number as any}
                feedbackInvalid={errors?.routing_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Account Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Account Name"
                {...register("account_name")}
                invalid={errors?.account_name as any}
                feedbackInvalid={errors?.account_name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Account Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Account Number"
                {...register("account_number")}
                invalid={errors?.account_number as any}
                feedbackInvalid={errors?.account_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Remarks / Notes</FormLabel>
              <CFormTextarea
                placeholder="Notes"
                {...register("notes", {
                  required: {
                    value: true,
                    message: "Please enter a notes",
                  },
                })}
                invalid={errors?.notes as any}
                feedbackInvalid={errors?.notes?.message as any}
              />
            </CCol>
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
              </div>
              {errors?.status && <div className="invalid-feedback d-block">{errors?.status?.message as any}</div>}
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
