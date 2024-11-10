import { CopyToClipboard } from "@/components/ui"
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"

type CopyPaymentLinkProps = {
  show: boolean
  setShow: (show: boolean) => void
}

export const CopyPaymentLink = ({ show, setShow }: CopyPaymentLinkProps) => {
  if (!show) return null

  const textToCopy = `${process.env.REACT_APP_API_URL}payment?pid=kashfkasnfkjnsaefnsklfnlasnflasnflse&lmfjl=amsef&k=aesf&m=asmfenselfnalsengfasneffesl`
  return (
    <CModal visible={show} onClose={() => setShow(false)} aria-labelledby="createCustomer" alignment="center">
      <CModalHeader>
        <CModalTitle>Copy Payment Link</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p className="small text-secondary">Copy the link below and send it to your customer to receive payment</p>
        <div className="d-flex">
          <CopyToClipboard className="word-break w-100" textToCopy={textToCopy} hideCopyButton />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShow(false)}>
          Close
        </CButton>
        <CopyToClipboard
          className="word-break w-100"
          textToCopy={textToCopy}
          hideCopyText
          button={
            <CButton color="primary" onClick={() => setShow(false)}>
              Copy
            </CButton>
          }
        />
      </CModalFooter>
    </CModal>
  )
}
