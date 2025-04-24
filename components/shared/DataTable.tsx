import { Icon, ICONS, LoadingTable, Search } from "@/components/ui"
import { DataTableColumn, OptionType } from "@/types"
import { formatSearch, getRandomNumber } from "@/utils"
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CTooltip,
} from "@coreui/react"
import isBoolean from "lodash/isBoolean"
import isString from "lodash/isString"
import Link from "next/link"
import { ReactNode, useState } from "react"
import DataTableComponent, { TableProps } from "react-data-table-component"
import { useForm } from "react-hook-form"

type ActionsBaseProps = {
  name?: string
  icon?: keyof typeof ICONS
  children?: ReactNode
}

type ActionsWithHrefProps = ActionsBaseProps & {
  href: string
  onClick?: never
}

type ActionsWithOnClickProps = ActionsBaseProps & {
  href?: never
  onClick: () => void
}

type ActionsButtonProps = ActionsWithHrefProps | ActionsWithOnClickProps

type ActionsWithSearchProps = {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
}

type ActionsWithoutSearchProps = {
  search?: undefined
  onSearchChange?: never
  searchPlaceholder?: never
}

type ActionsSearchProps = ActionsWithSearchProps | ActionsWithoutSearchProps

type ActionsWithFilterProps = {
  filter: boolean
  setFilter: (value: boolean) => void
}

type ActionsWithoutFilterProps = {
  filter?: false
  setFilter?: never
}

type ActionsFilterProps = ActionsWithFilterProps | ActionsWithoutFilterProps

type ActionsWithStatusProps = {
  statusOptions: OptionType[]
  selectedStatus: string
  onStatusChange: (value: string) => void
}

type ActionsWithoutStatusProps = {
  statusOptions?: undefined
  selectedStatus?: undefined
  onStatusChange?: never
}

type ActionsStatusProps = ActionsWithStatusProps | ActionsWithoutStatusProps

type DataTableActionsProps = ActionsButtonProps & ActionsSearchProps & ActionsFilterProps & ActionsStatusProps

export const DataTableActions = ({
  href,
  onClick,
  search,
  onSearchChange,
  searchPlaceholder = "Search",
  name = "Add New",
  icon = "add",
  filter,
  setFilter,
  statusOptions,
  selectedStatus,
  onStatusChange,
  children,
}: DataTableActionsProps) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {children}
      {isString(search) && (
        <Search value={search} onChange={onSearchChange!} placeholder={searchPlaceholder} className="w-72" />
      )}
      {statusOptions && (
        <CFormSelect
          value={selectedStatus}
          onChange={e => onStatusChange(e.target.value)}
          className="rounded-pill ps-4c py-1.5 w-40">
          <option value="" selected>
            All Status
          </option>
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CFormSelect>
      )}
      {isBoolean(filter) && (
        <CTooltip content="Filter">
          <CButton
            type="button"
            color={filter ? "dark" : "light"}
            onClick={() => setFilter && setFilter(!filter)}
            className="rounded-pill px-2.5">
            <Icon name="filter" size={16} />
          </CButton>
        </CTooltip>
      )}
      <CTooltip content={name}>
        {href ? (
          <Link href={href}>
            <CButton color="dark" className="rounded-pill d-inline-flex align-items-center px-3">
              <Icon name={icon} size={16} className="me-1" />
              {name}
            </CButton>
          </Link>
        ) : (
          <CButton color="dark" className="rounded-pill d-inline-flex align-items-center px-3" onClick={onClick}>
            <Icon name={icon} size={16} className="me-1" />
            {name}
          </CButton>
        )}
      </CTooltip>
    </div>
  )
}

export type FilterField = {
  name: string
  label: string
  type: "text" | "select"
  options?: OptionType[]
  isLoading?: boolean
  placeholder?: string
}

type DataTableFilterProps = {
  filter: boolean
  setParams: (params: any) => void
  fields?: FilterField[]
}

export const DataTableFilter = ({ filter, setParams, fields = [] }: DataTableFilterProps) => {
  const { register, handleSubmit, control, watch, reset } = useForm()

  const onSubmit = (data: any) => {
    setParams({ ...data, key: getRandomNumber() })
  }

  const handleReset = () => {
    reset() // Assuming you are using react-hook-form's reset method
    setParams({ key: getRandomNumber() })
  }

  return (
    <CCollapse visible={filter} className="w-100">
      <CCard className="bg-anti-flash-white bg-opacity-50 border-0 mb-3">
        <CCardBody>
          <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <CCol md={3} key={index}>
                <CFormLabel className="mt-2">{field.label}</CFormLabel>
                {field.type === "text" && <CFormInput type="text" {...register(field.name)} />}
                {field.type === "select" && (
                  <CFormSelect {...register(field.name)}>
                    <option value="" selected key="">
                      {field.placeholder || `Select ${field.label}`}
                    </option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CFormSelect>
                )}
              </CCol>
            ))}
            <CCol md={3} className="d-flex align-items-center gap-2">
              <CButton type="button" color="dark" onClick={handleReset}>
                Reset
              </CButton>
              <CButton type="submit" className="border-0 text-light">
                Filter
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCollapse>
  )
}

type DataTableProps = Omit<TableProps<any>, "pagination"> & {
  pagination?: number | boolean
  isLoading?: boolean
}

export const DataTable = ({ pagination = 50, isLoading, ...props }: DataTableProps) => (
  <div className="data-table-wrapper">
    <DataTableComponent
      pagination={pagination as any}
      progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
      progressPending={isLoading}
      {...props}
    />
  </div>
)

type DataTablePageProps = {
  apiFunction: any
  columns?: DataTableColumn
  search?: boolean
  filter?: boolean
  fields?: FilterField[]
  statusOptions?: OptionType[]
  actionsProps: Omit<DataTableActionsProps, "search" | "onSearchChange">
  defaultParams?: any
} & Omit<DataTableProps, "data" | "columns">

export const DataTablePage = ({
  apiFunction,
  columns = [],
  search = false,
  filter = false,
  fields = [],
  statusOptions,
  actionsProps,
  defaultParams = {},
  ...props
}: DataTablePageProps) => {
  const [searchKey, setSearchKey] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showFilter, setFilter] = useState(false)
  const [params, setParams] = useState(defaultParams)
  const { data: apiData, isLoading } = apiFunction({
    ...params,
    search_key: !search ? null : formatSearch(searchKey),
    status: selectedStatus,
  })
  const data = apiData?.data || []

  const dataTableActionsProps: any = { ...actionsProps }
  if (search) {
    dataTableActionsProps.search = searchKey
    dataTableActionsProps.onSearchChange = setSearchKey
  }
  if (filter) {
    dataTableActionsProps.filter = showFilter
    dataTableActionsProps.setFilter = setFilter
  }
  if (statusOptions) {
    dataTableActionsProps.statusOptions = statusOptions
    dataTableActionsProps.selectedStatus = selectedStatus
    dataTableActionsProps.onStatusChange = setSelectedStatus
  }

  const dataTableProps: Omit<DataTableProps, "data" | "columns"> = {}
  if (filter) {
    dataTableProps.subHeader = true
    dataTableProps.subHeaderWrap = false
    dataTableProps.subHeaderComponent = <DataTableFilter filter={showFilter} setParams={setParams} fields={fields} />
  }

  return (
    <DataTable
      {...props}
      columns={columns}
      actions={<DataTableActions {...dataTableActionsProps} />}
      data={data}
      isLoading={isLoading}
      {...dataTableProps}
    />
  )
}
