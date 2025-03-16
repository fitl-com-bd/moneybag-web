import { FC } from "react"

interface SectionHeaderProps {
  title: string
  subtitle: string
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h5 className="text-lg mb-0">{title}</h5>
      <p className="text-secondary">{subtitle}</p>
    </div>
  )
}
