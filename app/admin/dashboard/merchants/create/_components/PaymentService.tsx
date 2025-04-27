"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateMerchantPaymentServiceMutation, usePaymentProvidersQuery } from "@/store"
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

// Define RateType as an array of objects
const RATE_TYPES = [
  { value: "F", label: "Fixed" },
  { value: "P", label: "Percentage" },
]

export const PaymentService = ({ merchantId, changeTab }: any) => {
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

  const onSubmit = async (data: any) => {
    const arg = {
      merchant_id: merchantId,
      api_key: {
        api_key: data.api_key,
        secret: data.secret,
      },
      bank_rate: data.bank_rate,
      financial_organization_id: 1, // Replace with actual value
      is_active: data.status === "active",
      is_custom_rate: data.custom_rate || false,
      moneybag_rate: data.moneybag_rate,
      note: data.note || "",
      payment_provider_id: 1, // Replace with actual value
      rate_type: data.rate_type,
      total_rate: data.merchant_service_fee || "",
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
          <CRow>
            <CCol>
              <FormLabel required>API Key</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter API Key"
                {...register("api_key", {
                  required: {
                    value: true,
                    message: "Please enter the API key",
                  },
                })}
                invalid={errors?.api_key as any}
                feedbackInvalid={errors?.api_key?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Secret</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Secret"
                {...register("secret", {
                  required: {
                    value: true,
                    message: "Please enter the secret",
                  },
                })}
                invalid={errors?.secret as any}
                feedbackInvalid={errors?.secret?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Note</FormLabel>
              <CFormTextarea rows={4} placeholder="Enter Note" {...register("note")} />
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
