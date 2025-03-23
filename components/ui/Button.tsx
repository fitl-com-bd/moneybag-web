"use client"
import { CButton } from "@coreui/react"
import { CButtonProps } from "@coreui/react/dist/components/button/CButton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, Fragment } from "react"

type ButtonProps = CButtonProps & {
  submit?: boolean
  reset?: boolean
  secondary?: boolean
  href?: string
  back?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  submit = false,
  reset = false,
  secondary = false,
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
        {children}
      </CButton>
    </Component>
  )
}
