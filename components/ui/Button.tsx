"use client"
import { CButton, CSpinner } from "@coreui/react"
import { CButtonProps } from "@coreui/react/dist/components/button/CButton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, Fragment } from "react"

type ButtonProps = CButtonProps & {
  submit?: boolean
  reset?: boolean
  secondary?: boolean
  isLoading?: boolean
  href?: string
  back?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  submit = false,
  reset = false,
  secondary = false,
  isLoading = false,
  href,
  back,
  ...props
}) => {
  const router = useRouter()
  const Component = href ? Link : Fragment
  const componentProps = href ? { href: href as string } : {}

  const onClick = back ? () => router.back() : props.onClick

  return (
    <Component {...(componentProps as any)}>
      <CButton
        color={secondary ? "secondary" : "dark"}
        type={reset ? "reset" : submit ? "submit" : "button"}
        onClick={onClick}
        {...props}>
        {isLoading && <CSpinner size="sm" className="me-2" />}
        {children}
      </CButton>
    </Component>
  )
}
