import { CButton } from "@coreui/react"
import { ReactNode } from "react"
import toast from "react-hot-toast"
import { Icon } from "./Icon"

type CopyToClipboardProps = {
  textToCopy: string
  hideCopyText?: boolean
  hideCopyButton?: boolean
  button?: ReactNode
  className?: string
}

export const CopyToClipboard = ({
  textToCopy,
  hideCopyText = false,
  hideCopyButton = false,
  button,
  className,
}: CopyToClipboardProps) => {
  const handleCopy = () => {
    toast.success("Text copied successfully")
    navigator.clipboard.writeText(textToCopy)
  }

  return (
    <>
      {!hideCopyText && <span className={className}>{textToCopy}</span>}
      {!hideCopyButton && (
        <>
          {button ? (
            <div onClick={handleCopy}>{button}</div>
          ) : (
            <CButton
              size="sm"
              onClick={handleCopy}
              className="d-d-inline-flex p-1 lh-1 bg-ice-blue bg-opacity-50 border-0 text-dark ms-2">
              <Icon name="copy" size={14} />
            </CButton>
          )}
        </>
      )}
    </>
  )
}
