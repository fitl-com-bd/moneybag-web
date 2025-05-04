"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { ORGANIZATION_TYPE, RATE_TYPES } from "@/constants"
import {
  useAddressQuery,
  useAllBranchesQuery,
  useBanksQuery,
  useCreateBranchMutation,
  useCreateFinancialServiceMutation,
  usePaymentProvidersQuery,
} from "@/store"
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
import toast from "react-hot-toast"

export const Services = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createFinancialService, { isLoading }] = useCreateFinancialServiceMutation()
  const { data: paymentProviders, isLoading: isProvidersLoading } = usePaymentProvidersQuery({})
  const router = useRouter()

  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const selectedDivision = watch("division_id")

  const onSubmit = async (data: any) => {
    const arg = {
      id,
      body: [{ ...data }],
    }

    const response = await createFinancialService(arg)

    if (response?.error) {
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: getErrorMessage(response.error),
        confirmButtonText: "Ok",
      })
    }

    if (response?.data?.success) {
      toast.success(response?.data?.message)
      changeTab("settlement_account")
    }
  }

  return (
    <>
      <SectionHeader
        title="Add Settlement Bank"
        subtitle="Register a new fintech provider and configure its integration details."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card
          className="space-y-6"
          header={
            <div className="d-flex justify-content-between align-items-center">
              <CCardTitle className="my-3c">Service Details</CCardTitle>
            </div>
          }>
          <CRow>
            <CCol>
              <FormLabel>Service Type</FormLabel>
              <CFormSelect
                {...register("service_type")}
                invalid={errors?.service_type as any}
                feedbackInvalid={errors?.service_type?.message as any}>
                <option value="">Select Service Type</option>
                {ORGANIZATION_TYPE.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>Service</FormLabel>
              <CFormSelect
                {...register("service_id", {
                  required: {
                    value: true,
                    message: "Please select a service",
                  },
                })}
                invalid={errors?.service_id as any}
                feedbackInvalid={errors?.service_id?.message as any}
                disabled={isProvidersLoading}>
                <option value="">Select Service</option>
                {paymentProviders?.map((provider: any) => (
                  <option value={provider.id} key={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>Rate Type</FormLabel>
              <CFormSelect
                {...register("rate_type", {
                  required: {
                    value: true,
                    message: "Please select a rate type",
                  },
                })}
                invalid={errors?.rate_type as any}
                feedbackInvalid={errors?.rate_type?.message as any}>
                <option value="">Select Rate Type</option>
                {RATE_TYPES.map(rateType => (
                  <option value={rateType.value} key={rateType.value}>
                    {rateType.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Moneybag Rate</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Moneybag Rate"
                {...register("rate", {
                  required: {
                    value: true,
                    message: "Please enter the moneybag rate",
                  },
                })}
                invalid={errors?.rate as any}
                feedbackInvalid={errors?.rate?.message as any}
              />
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
                />
              </div>
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary onClick={() => changeTab("basic_information")} disabled={isLoading}>
            Previous
          </Button>
          <Button submit disabled={isLoading} isLoading={isLoading}>
            Next
          </Button>
        </FormFooter>
      </CForm>
    </>
  )
}
