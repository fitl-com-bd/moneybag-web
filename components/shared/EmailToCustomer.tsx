import { useSendEmailMutation } from "@/store"
import { CButton, CModal, CModalBody, CModalFooter } from "@coreui/react"
import toast from "react-hot-toast"

type EmailToCustomerProps = {
  show: any
  setShow: (show: any) => void
}

export const EmailToCustomer = ({ show, setShow }: EmailToCustomerProps) => {
  const [sendEmail, { isLoading }] = useSendEmailMutation()
  if (!show) return null

  const handleEmailToCustomer = async () => {
    const { uuid } = show

    const response: any = await sendEmail(uuid)

    if (response?.data?.status === "success") {
      toast.success("Email sent successfully")
    } else {
      toast.error("Email sending failed")
    }
    setShow(false)
  }

  return (
    <CModal
      visible={show}
      onClose={() => setShow(false)}
      aria-labelledby="createCustomer"
      alignment="center"
      className="no-border">
      {/* <CModalHeader>
      </CModalHeader> */}
      <CModalBody className="pt-8 pb-4 text-center">
        <h4 className="fw-semibold">Email To Customer</h4>
        <p className="text-secondary mb-0">
          An email will be sent to <span className="text-dark fw-semibold">{show?.customer?.name}</span> (
          <span className="text-dark fw-semibold">{show?.customer?.email}</span>,{" "}
          <span className="text-dark fw-semibold">{show?.customer?.phone_no}</span>) with the payment link.
        </p>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton disabled={isLoading} color="secondary" onClick={() => setShow(false)}>
          Close
        </CButton>
        <CButton disabled={isLoading} color="primary" onClick={handleEmailToCustomer}>
          {isLoading ? "Sending..." : "Send"}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
