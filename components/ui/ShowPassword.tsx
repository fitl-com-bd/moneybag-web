import { LayoutProps } from "@/types"
import { useRef, useState } from "react"
import { Icon } from "./Icon"

export const ShowPassword = ({ children }: LayoutProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handelShowPassword = () => {
    if (!wrapperRef.current) return
    const input = wrapperRef.current.querySelector("input")
    if (!input) return
    input.type = showPassword ? "password" : "text"
    setShowPassword(!showPassword)
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {children}
      <Icon
        name={showPassword ? "eyeOff" : "eye"}
        onClick={handelShowPassword}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          userSelect: "none",
        }}
      />
    </div>
  )
}
