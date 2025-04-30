import { LayoutProps } from "@/types"
import { cn } from "@/utils"
import { FC } from "react"

type FormFooterProps = LayoutProps & {
  className?: string
}

export const FormFooter: FC<FormFooterProps> = ({ children, className }) => {
  return <div className={cn("form-footer space-x-3 justify-content-end", className)}>{children}</div>
}
