// /payment-configs/merchant-payment-services
"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateBusinessDetailsMutation } from "@/store/features/api/merchantServiceApi"
import { getErrorMessage, Swal } from "@/utils"
import { CCardTitle, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

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
        title="Select Merchant Payment Services"
        subtitle="Choose the payment services and methods you want to enable for your business transactions."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CCardTitle className="">Service Details</CCardTitle>
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
              <div>
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
              <FormLabel required>API Key & Pass</FormLabel>
              <CFormTextarea
                rows={4}
                placeholder="Enter API Key & Pass"
                {...register("api_key_pass", {
                  required: {
                    value: true,
                    message: "Please enter the API key and pass",
                  },
                })}
                invalid={errors?.api_key_pass as any}
                feedbackInvalid={errors?.api_key_pass?.message as any}
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
