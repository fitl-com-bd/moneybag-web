import { LayoutProps } from "@/types"
import { cn } from "@/utils"
import { CCard, CCardBody } from "@coreui/react"
import { FC } from "react"

type CardProps = LayoutProps & {
  className?: string
  cardClassName?: string
}

export const Card: FC<CardProps> = ({ children, className, cardClassName }) => (
  <CCard className={cn("card-theme", cardClassName)}>
    <CCardBody className={className}>{children}</CCardBody>
  </CCard>
)
