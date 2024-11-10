import { CButton, CCard, CCardBody, CCol, CCollapse, CForm, CFormInput, CFormLabel, CFormSelect } from "@coreui/react"
import { useForm } from "react-hook-form"

type TransactionFilterFormProps = {
  show: boolean
  filter: any
  setFilter: (value: any) => void
}

export const TransactionFilterForm = ({ show, filter, setFilter }: TransactionFilterFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (data: any) => setFilter(data)

  return (
    <CCollapse visible={show}>
      <CCard className="bg-anti-flash-white bg-opacity-50 border-0 mb-3">
        <CCardBody>
          <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={3}>
              <CFormLabel>Order ID</CFormLabel>
              <CFormInput className="custom-input" type="text" {...register("orderNumber")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel>Transaction ID</CFormLabel>
              <CFormInput className="custom-input" type="text" {...register("txnId")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Period from</CFormLabel>
              <CFormInput className="custom-input" type="date" {...register("periodFrom")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Period To</CFormLabel>
              <CFormInput className="custom-input" type="date" {...register("periodTo")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Status</CFormLabel>
              <CFormSelect className="custom-input" {...register("status")}>
                <option value={""}>Select One</option>
                <option>APPROVED</option>
                <option>DISPUTED</option>
                <option>REVERSED</option>
                <option>REFUNDED</option>
                <option>DECLINED</option>
                <option>CANCELLED</option>
                <option>INITIATED</option>
                <option>INCOMPLETE</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Amount from</CFormLabel>
              <CFormInput className="custom-input" type="text" {...register("amountFrom")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Amount To</CFormLabel>
              <CFormInput className="custom-input" type="text" {...register("amountTo")} />
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton className="mt-2" color="primary" type="submit">
                Search
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCollapse>
  )
}
