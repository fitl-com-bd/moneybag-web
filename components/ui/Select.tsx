// import classNames from "classnames"
import { OptionType } from "@/types"
import { cn } from "@/utils"
import isObject from "lodash/isObject"
import { Control, Controller, FieldValues } from "react-hook-form"
import RSelect, { Props as RSelectProps } from "react-select"

const ReactSelect = (props: RSelectProps) => (
  <RSelect {...props} className={cn("react-select", props.className)} classNamePrefix="react-select" />
)

type SelectProps = RSelectProps & {
  control?: Control<FieldValues>
  name?: string
  className?: string
  valueObject?: boolean
  rules?: any
  invalid?: boolean
  feedbackInvalid?: string
  options?: OptionType[]
}

export const Select = ({
  control,
  name = "select",
  className,
  valueObject = false,
  rules,
  invalid = false,
  feedbackInvalid,
  ...otherProps
}: SelectProps) => {
  const getValue = (value: any) =>
    isObject(value) ? value : otherProps.options?.find((item: any) => item.value === value)

  return control ? (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <>
          <ReactSelect
            {...otherProps}
            {...field}
            defaultValue={getValue(field.value)}
            value={getValue(field.value)}
            onChange={(value: any) => field.onChange(valueObject ? value : value?.value)}
            // menuIsOpen
            className={cn(
              {
                "is-invalid": invalid,
              },
              className
            )}
          />
          {invalid && feedbackInvalid && <div className="invalid-feedback">{feedbackInvalid}</div>}
        </>
      )}
    />
  ) : (
    <ReactSelect name={name} className={className} {...otherProps} />
  )
}
