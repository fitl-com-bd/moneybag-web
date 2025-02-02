import { CButton } from "@coreui/react"
import { CButtonProps } from "@coreui/react/dist/components/button/CButton"
import { FC } from "react"

type ButtonProps = CButtonProps & {
  submit?: boolean
  reset?: boolean
  secondary?: boolean
}

export const Button: FC<ButtonProps> = ({ children, submit = false, reset = false, secondary = false, ...props }) => {
  return (
    <CButton color={secondary ? "secondary" : "dark"} type={reset ? "reset" : submit ? "submit" : "button"} {...props}>
      {children}
    </CButton>
  )
}
