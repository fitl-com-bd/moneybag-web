"use client"
import { useMerchantPaymentServiceDetailsQuery } from "@/store"
import { PaymentService } from "../../../store/_components/PaymentService"

const getDefaultValues = (data: any) => {
  let defaultValues = {}
  let api_key = ""

  try {
    api_key = JSON.stringify(data?.api_key)
  } catch (error) {}

  if (data) {
    defaultValues = {
      id: data.id,
      payment_provider_id: data?.payment_provider?.id ? data?.payment_provider?.id : "",
      is_custom_rate: data.is_custom_rate || false,
      financial_organization_id: data?.financial_organization?.id || "",
      rate_type: data?.rate_type || "",
      moneybag_rate: parseFloat(data?.moneybag_rate) || 0,
      bank_rate: parseFloat(data?.bank_rate) || 0,
      total_rate: parseFloat(data?.total_rate) || 0,
      api_key,
      note: data?.note || "",
      is_active: data?.is_active ? "true" : "false",
      merchant_service_fee: (parseFloat(data?.bank_rate) || 0) + (parseFloat(data?.moneybag_rate) || 0),
    }
  }

  return defaultValues
}

const UpdatePaymentService = ({ params }: any) => {
  const serviceId = parseInt(params.serviceId)
  const { data, isFetching, isLoading } = useMerchantPaymentServiceDetailsQuery(serviceId)
  console.log(`🔥 | data:`, data)

  const tabProps = {
    id: parseInt(params.id),
    defaultValues: getDefaultValues(data),
  }

  if (isLoading || isFetching) return null
  return <PaymentService {...tabProps} />
}

export default UpdatePaymentService
