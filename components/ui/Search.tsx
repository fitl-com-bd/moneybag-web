"use client"
import { cn } from "@/utils"
import { CFormInput } from "@coreui/react"
import debounce from "lodash/debounce"
import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from "react"
import { Icon } from "./Icon"

type SearchProps = {
  value: string
  onChange: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange">

export const Search = ({ className, value, onChange, ...props }: SearchProps) => {
  const [localValue, setLocalValue] = useState(value)

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value)
    }, 500),
    [onChange]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    debouncedOnChange(newValue)
  }

  return (
    <div className="position-relative">
      <Icon
        name="search"
        size={16}
        className="position-absolute top-50 translate-middle-y text-dark"
        style={{
          left: 8,
        }}
      />
      <CFormInput
        type="text"
        size="sm"
        placeholder="Search"
        className={cn("h-9.5 px-7", className)}
        value={localValue}
        onChange={handleChange}
        {...props}
      />
      {value?.length > 0 && (
        <Icon
          name="x"
          size={16}
          className="position-absolute top-50 translate-middle-y text-dark"
          role="button"
          style={{
            right: 8,
          }}
          onClick={() => {
            setLocalValue("")
            onChange("")
          }}
        />
      )}
    </div>
  )
}
