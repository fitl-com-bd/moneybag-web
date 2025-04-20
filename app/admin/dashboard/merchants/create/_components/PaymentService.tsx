"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateMerchantPaymentServiceMutation } from "@/store/features/api/merchantServiceApi"
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

// TypeScript type support
interface PaymentServiceFormData {
  api_key: string
  secret: string
  bank_rate: string
  custom_rate: boolean
  moneybag_rate: string
  note?: string
  rate_type: string
  status: string
  merchant_service_fee: string
}

export const PaymentService = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createMerchantPaymentService] = useCreateMerchantPaymentServiceMutation()
  const router = useRouter()

  const onSubmit = async (data: PaymentServiceFormData) => {
    const payload = {
      api_key: {
        api_key: data.api_key,
        secret: data.secret,
      },
      bank_rate: data.bank_rate,
      financial_organization_id: 1, // Replace with actual value
      is_active: data.status === "active",
      is_custom_rate: data.custom_rate || false,
      merchant_id: 1, // Replace with actual value
      moneybag_rate: data.moneybag_rate,
      note: data.note || "",
      payment_provider_id: 1, // Replace with actual value
      rate_type: data.rate_type,
      total_rate: data.merchant_service_fee || "",
    }

    const response = await createMerchantPaymentService(payload)

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
                feedbackInvalid={errors?.service?.message as any}>
                <option value="">Choose...</option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
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
                <option value="">Choose...</option>
                <option value="moneybag_rate">Moneybag Rate</option>
                <option value="bank_rate">Bank Rate</option>
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
          <Button secondary>Previous</Button>
          <Button submit>Next</Button>
        </FormFooter>
      </CForm>
    </>
  )
}
