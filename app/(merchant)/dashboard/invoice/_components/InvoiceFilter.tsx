import { Select } from "@/components/ui"
import { PAYMENT_STATUS_OPTIONS } from "@/constants"
import { useCustomersQuery } from "@/store"
import { getRandomNumber } from "@/utils"
import { CButton, CCard, CCardBody, CCol, CCollapse, CForm, CFormInput, CFormLabel, CFormSelect } from "@coreui/react"
import { useForm } from "react-hook-form"

type InvoiceFilterProps = {
  filter: boolean
  setParams: (params: any) => void
}

export const InvoiceFilter = ({ filter, setParams }: InvoiceFilterProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm()
  const { data: customer, isLoading: isCustomerLoading } = useCustomersQuery({})

  const onSubmit = (data: any) => {
    setParams({ ...data, key: getRandomNumber() })
  }

  const handleReset = () => {
    reset() // Assuming you are using react-hook-form's reset method
    setParams({ key: getRandomNumber() })
  }

  const customerValue = watch("customer")
  const selectedCustomer = customer?.find((c: any) => c.id === customerValue)
  console.log(`🔥 | selectedCustomer:`, selectedCustomer)

  return (
    <CCollapse visible={filter} className="w-100">
      <CCard className="bg-anti-flash-white bg-opacity-50 border-0 mb-3">
        <CCardBody>
          <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={3}>
              <CFormLabel className="mt-2">Invoice No</CFormLabel>
              <CFormInput type="text" {...register("invoiceNo")} />
            </CCol>

            <CCol md={3}>
              <CFormLabel>Customer</CFormLabel>
              <Select
                control={control}
                name="customer"
                placeholder="Select Customer"
                isLoading={isCustomerLoading}
                className="customer-select"
                key={customerValue}
                value={selectedCustomer || ""}
                options={
                  customer?.map((customer: any) => ({
                    ...customer,
                    label: `${customer.name}-${customer.email}-${customer.phone_no}`,
                    value: customer.id,
                  })) || []
                }
                formatOptionLabel={(data: any) => {
                  return (
                    <div className="player-option">
                      <div className="player-option__name">{data.name}</div>
                      <div className="player-option__email small hint-text">{data.email}</div>
                      <div className="player-option__phone small hint-text">{data.phone_no}</div>
                    </div>
                  )
                }}
              />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Payment Status</CFormLabel>
              <CFormSelect {...register("payment_status")}>
                <option value="" selected key="">
                  Select Payment Status
                </option>
                {PAYMENT_STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            {/* <CCol md={3}>
              <CFormLabel className="mt-2">Link Status</CFormLabel>
              <CFormSelect {...register("payment_status")}>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </CFormSelect>
            </CCol> */}

            <CCol md={3} className="d-flex align-items-center gap-2">
              <CButton type="button" color="secondary" onClick={handleReset}>
                Reset
              </CButton>
              <CButton type="submit" className="border-0 text-light">
                Filter
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCollapse>
  )
}
