"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { RATE_TYPES } from "@/constants"
import {
  useCreateMerchantPaymentServiceMutation,
  useFinancialOrganizationsQuery,
  usePaymentProvidersQuery,
} from "@/store"
import { getErrorMessage, handleErrorResponse, Swal } from "@/utils"
import {
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

export const PaymentService = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createMerchantPaymentService, { isLoading }] = useCreateMerchantPaymentServiceMutation()
  const { data: paymentProviders, isLoading: isProvidersLoading } = usePaymentProvidersQuery({})
  const router = useRouter()

  const isCustomRate = watch("custom_rate")

  // useFinancialOrganizationsQuery
  const { data: financialOrganizations, isLoading: isFinancialOrganizationsLoading } = useFinancialOrganizationsQuery({
    skip: !isCustomRate,
  })

  const onSubmit = async (data: any) => {
    const arg: any = {
      merchant_id: id,
      api_key: data.api_key,
      bank_rate: data.bank_rate,
      is_active: data.status === "active",
      is_custom_rate: data.custom_rate || false,
      moneybag_rate: data.moneybag_rate,
      payment_provider_id: 1, // Replace with actual value
      rate_type: data.rate_type,
      total_rate: data.merchant_service_fee || "",
    }
    if (isCustomRate) {
      arg.financial_organization_id = data.financial_organization_id
    }

    const response = await createMerchantPaymentService(arg)

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
      changeTab("settlement_bank")
    }
  }

  return (
    <>
      <SectionHeader
        title="Select Merchant Payment Services"
        subtitle="Choose the payment services and methods you want to enable for your business transactions."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card
          className="space-y-6"
          header={
            <div className="d-flex justify-content-between align-items-center">
              <CCardTitle className="my-3c">Service Details</CCardTitle>
              <CFormSwitch
                {...register("custom_rate", {})}
                id="customRate"
                label="Custom Rate"
                invalid={errors?.custom_rate as any}
                className="switch-reverse"
              />
            </div>
          }>
          <CRow>
            <CCol>
              <FormLabel required>Service</FormLabel>
              <CFormSelect
                {...register("service", {
                  required: {
                    value: true,
                    message: "Please select a service",
                  },
                })}
                invalid={errors?.service as any}
                feedbackInvalid={errors?.service?.message as any}
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
            <CCol>
              <FormLabel required>Moneybag Rate</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Moneybag Rate"
                {...register("moneybag_rate", {
                  required: {
                    value: true,
                    message: "Please enter the moneybag rate",
                  },
                })}
                invalid={errors?.moneybag_rate as any}
                feedbackInvalid={errors?.moneybag_rate?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            {isCustomRate && (
              <CCol>
                <FormLabel required>Financial Organization</FormLabel>
                <CFormSelect
                  {...register("financial_organization_id", {
                    required: {
                      value: true,
                      message: "Please select a financial organization",
                    },
                  })}
                  invalid={errors?.financial_organization_id as any}
                  feedbackInvalid={errors?.financial_organization_id?.message as any}
                  disabled={isFinancialOrganizationsLoading}>
                  <option value="">Select Financial Organization</option>
                  {financialOrganizations?.data?.map((organization: any) => (
                    <option value={organization.id} key={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            )}
            <CCol>
              <FormLabel required>Bank Rate</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Bank Rate"
                {...register("bank_rate", {
                  required: {
                    value: true,
                    message: "Please enter the bank rate",
                  },
                })}
                invalid={errors?.bank_rate as any}
                feedbackInvalid={errors?.bank_rate?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Merchant Service Fee (MSF)</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Merchant Service Fee"
                {...register("merchant_service_fee", {
                  required: {
                    value: true,
                    message: "Please enter the merchant service fee",
                  },
                })}
                invalid={errors?.merchant_service_fee as any}
                feedbackInvalid={errors?.merchant_service_fee?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>API Key & Pass</FormLabel>
              <CFormTextarea
                rows={4}
                placeholder="Enter API Key & Pass"
                {...register("api_key", {
                  required: {
                    value: true,
                    message: "Please enter the API key & pass",
                  },
                })}
                invalid={errors?.api_key as any}
                feedbackInvalid={errors?.api_key?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-3">
                <CFormCheck
                  type="radio"
                  label="Active"
                  value="active"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                />
                <CFormCheck type="radio" label="Inactive" value="inactive" {...register("status")} />
              </div>
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary onClick={() => changeTab("business_representative")} disabled={isLoading}>
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
