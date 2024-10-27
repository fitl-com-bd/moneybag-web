import { isUrl } from "@/utils"
import { CAvatar } from "@coreui/react"
import { FC } from "react"

type AvatarProps = {
  src: string
  size?: "sm" | "md" | "lg" | "xl"
  alt?: string
}

export const Avatar: FC<AvatarProps> = ({ src, size, alt }) => {
  if (isUrl(src)) return <CAvatar src={src} size={size} />
  return (
    <CAvatar size={size} color="secondary" textColor="white">
      {alt ? alt.charAt(0).toUpperCase() : "?"}
    </CAvatar>
  )
}
