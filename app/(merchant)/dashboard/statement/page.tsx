"use client"
import { Icon } from "@/components/ui"
import { CButton, CTooltip } from "@coreui/react"

import { CBadge } from "@coreui/react"
// import { DateTime } from "luxon"

const setTextColor = (e: any) => {
  if (e == "INCOMPLETE") {
    return "dark"
  } else if (e == "DECLINED") {
    return "danger"
  } else if (e == "APPROVED") {
    return "primary"
  } else if (e == "REVERSED") {
    return "light"
  } else if (e == "REFUNDED") {
    return "info"
  } else if (e == "CANCELLED") {
    return "danger"
  } else {
    return "warning"
  }
}

export const column = ({ openDetails }: any) => [
  {
    name: "SL",
    selector: (row: any, index: number) => index + 1,
    width: "55px",
  },
  {
    name: "Order ID",
    selector: (row: any) => row.merchant_tran_id,
    minWidth: "135px;",
  },
  // {
  //   name: "Transection ID",
  //   selector: (row) => row.txn_id,
  //   minWidth: "200px;",
  // },
  // {
  //   name: "Merchant Short Name",
  //   sortable: true,
  //   selector: (row) => row.short_name,
  //   minWidth: "70px;",
  // },

  // {
  //   name: "Creation date",
  //   selector: row =>
  //     DateTime.fromISO(row.gw_txn_timestamp, {
  //       zone: "Asia/Dhaka",
  //     }).toLocaleString(DateTime.DATETIME_MED),
  //   minWidth: "70px;",
  // },
  {
    name: "Order Amount",
    selector: (row: any) => row.merchant_order_amount.toFixed(2),
  },
  {
    name: "Refund Amount",
    selector: (row: any) => (row.refund_amount ? row.refund_amount : 0).toFixed(2),
  },
  {
    name: "MSF Fee",
    selector: (row: any) => (row.pgw_charge + row.bank_charge).toFixed(2),
  },
  {
    name: "Payment Mode",
    selector: (row: any) => row.paymode || "--",
  },
  {
    name: "Settlement Amount",
    selector: (row: any) => row.settlement_amount.toFixed(2),
  },

  {
    name: "Settlement Status",
    selector: (row: any) => "--",
  },

  {
    name: "Order Status",
    selector: (row: any) => (
      <h6>
        <CBadge
          color={row.dispute_status == "P" ? "warning" : setTextColor(row.gw_order_status)}
          className={`bg-opacity-16 text-${row.dispute_status == "P" ? "warning" : setTextColor(row.gw_order_status)}`}>
          {row.dispute_status == "P" ? "DISPUTED" : row.gw_order_status}
        </CBadge>
      </h6>
    ),
  },
  // {
  //   name: "Description",
  //   selector: (row) => row.merchant_description,
  // },
  {
    name: "Action",
    width: "94px",
    selector: (row: any) => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Details">
          <CButton
            color="light"
            size="sm"
            className="btn-icon"
            onClick={() => {
              openDetails(row)
            }}>
            <Icon name="details" size={24} />
          </CButton>
        </CTooltip>
      </div>
    ),
  },
]

const TransactionList = () => {
  return (
    <div>
      <div className="data-table-wrapper shadow-sm bg-white border-0 rounded overflow-hidden p-3">
        {/* <DataTable
          title="Transaction List"
          columns={column({ openDetails })}
          data={statement}
          pagination={50}
          progressPending={isLoading}
          progressComponent={<LoadingTable className="w-100" />}
          actions={
            <div>
              <CTooltip content="Filter">
                <CButton
                  color={filter ? "dark" : "light"}
                  onClick={event => {
                    event.preventDefault()
                    setFilter(!filter)
                  }}>
                  <Icon name="filter" size={16} />
                </CButton>
              </CTooltip>
              <CTooltip content="Download PDF">
                <CButton color="light" className="mx-1" onClick={dawonloadReport}>
                  <CIcon icon={cilPrint} />
                </CButton>
              </CTooltip>
              <CTooltip content="Download CSV">
                <CSVLink
                  data={setDateForEcecl(statement)}
                  className="btn btn-light"
                  filename={`transation-list${Date()}`}>
                  <CIcon icon={cilDescription} />
                </CSVLink>
              </CTooltip>
            </div>
          }
          subHeader
          subHeaderWrap={false}
          subHeaderComponent={
            <CCollapse visible={filter}>
              <CCard className="bg-anti-flash-white bg-opacity-50 border-0 mb-3">
                <CCardBody>
                  <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2">
                    <CCol md={3}>
                      <CFormLabel>Order ID</CFormLabel>
                      <CFormInput className="custom-input" type="text" onChange={handleOrderNumber} />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Transaction ID</CFormLabel>
                      <CFormInput className="custom-input" type="text" onChange={handleTxnId} />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="mt-2">Period from</CFormLabel>
                      <CFormInput className="custom-input" type="date" onChange={handlePeriodFrom} />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="mt-2">Period To</CFormLabel>
                      <CFormInput className="custom-input" type="date" onChange={handlePeriodTo} />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="mt-2">Status</CFormLabel>
                      <CFormSelect className="custom-input" onChange={handleStatus}>
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
                      <CFormInput className="custom-input" type="text" onChange={handleAmountFrom} />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="mt-2">Amount To</CFormLabel>
                      <CFormInput className="custom-input" type="text" onChange={handleAmountTo} />
                    </CCol>

                    <CCol className="d-flex justify-content-end">
                      <CButton className="mt-2" color="primary" onClick={searchStatemet}>
                        Search
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCollapse>
          }
        /> */}
      </div>

      {/* <div>
        <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle className="text-danger">Transection Details</CModalTitle>
          </CModalHeader>
          <CModalBody className="px-0">
            <MerStatementDetail data={statementdetails} />
          </CModalBody>
        </CModal>
      </div> */}
    </div>
  )
}

export default TransactionList
