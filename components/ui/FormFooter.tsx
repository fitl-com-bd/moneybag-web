import { LayoutProps } from "@/types"
import { FC } from "react"

export const FormFooter: FC<LayoutProps> = ({ children }) => {
  return <div className="form-footer space-x-3 justify-content-end">{children}</div>
}
