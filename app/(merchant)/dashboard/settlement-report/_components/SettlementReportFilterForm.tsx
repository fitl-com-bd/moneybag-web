import { CButton, CCard, CCardBody, CCol, CCollapse, CForm, CFormInput, CFormLabel } from "@coreui/react"
import moment from "moment"
import { useForm } from "react-hook-form"

type Props = {
  show: boolean
  filter: any
  setFilter: (value: any) => void
}

export const defaultSettlementReportValues = {
  period_from: moment().subtract(1, "months").format("YYYY-MM-DD"),
  period_to: moment().format("YYYY-MM-DD"),
}

const SettlementReportFilterForm = ({ show, filter, setFilter }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultSettlementReportValues,
  })

  const onSubmit = (data: any) => setFilter(data)

  return (
    <CCollapse visible={filter} className="w-100">
      <CCard className="bg-anti-flash-white bg-opacity-50 border-0 mb-3">
        <CCardBody>
          <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
            {/* <CFormLabel>Order Number</CFormLabel>
                <CFormInput
                  size="sm"
                  type="text"
                  onChange={handleOrderNumber}
                /> */}
            {/* <CFormLabel>Merchant Name</CFormLabel>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={getmerchantoptions(merchantList)}
                    onChange={handleMerchantID}
                  /> */}
            {/* <CFormInput
                  size="sm"
                  type="text"
                  onChange={handleMerchnatName}
                /> */}
            <CCol md={3}>
              <CFormLabel className="mt-2">Period from</CFormLabel>
              <CFormInput className="custom-input" type="date" {...register("period_from")} />
            </CCol>
            <CCol md={3}>
              <CFormLabel className="mt-2">Period To</CFormLabel>
              <CFormInput className="custom-input" type="date" {...register("period_to")} />
            </CCol>
            {/* <CFormLabel className="mt-2">Status</CFormLabel>
                <CFormSelect size="sm" onChange={handleStatus}>
                  <option>APPROVED</option>
                  <option>PENDING</option>
                  <option>REJECTED</option>
                  <option>CANCELED</option>
                </CFormSelect> */}
            {/* <CFormLabel className="mt-2">Currency</CFormLabel>
                <CFormSelect size="sm" onChange={handleCurrency}>
                  <option>ALL</option>
                  <option>BDT</option>
                </CFormSelect> */}
            {/* <CFormLabel className="mt-2">Amount from</CFormLabel>
                <CFormInput size="sm" type="text" onChange={handleAmountFrom} />
                <CFormLabel className="mt-2">Amount To</CFormLabel>
                <CFormInput size="sm" type="text" onChange={handleAmountTo} />
                <CFormLabel className="mt-2">Order by</CFormLabel>
                <CFormSelect size="sm" onChange={handleOrderBy}>
                  <option>ASC</option>
                  <option>DESC</option>
                </CFormSelect> */}
            <CCol className="d-flex">
              <CButton
                type="submit"
                className="mt-3 mx-0 border-0 bg-primary text-light"
                // disabled={!periodFrom || !periodTo ? true : false}
              >
                Search
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCollapse>
  )
}

export default SettlementReportFilterForm
