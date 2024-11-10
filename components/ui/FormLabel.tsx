import { CFormLabel } from "@coreui/react"
import { CFormLabelProps } from "@coreui/react/dist/components/form/CFormLabel"
import { ReactNode } from "react"

type FormLabelProps = CFormLabelProps & {
  children: ReactNode
  required?: boolean
}

export const FormLabel = ({ children, required = false, ...props }: FormLabelProps) => {
  return (
    <CFormLabel {...props}>
      {children}
      {required && <span className="text-danger ms-1">*</span>}
    </CFormLabel>
  )
}
