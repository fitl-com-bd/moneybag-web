import { LayoutProps } from "@/types"
import { cn } from "@/utils"
import { CCard, CCardBody, CCardHeader } from "@coreui/react"
import { FC, ReactNode } from "react"

type CardProps = LayoutProps & {
  className?: string
  cardClassName?: string
  header?: ReactNode
}

export const Card: FC<CardProps> = ({ children, className, cardClassName, header }) => (
  <CCard className={cn("card-theme", cardClassName)}>
    {header && <CCardHeader>{header}</CCardHeader>}
    <CCardBody className={className}>{children}</CCardBody>
  </CCard>
)
