"use client"
import { Icon, Select } from "@/components/ui"
import { useCreateInvoiceMutation, useCustomersQuery, useEditInvoiceMutation } from "@/store"
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreateCustomer } from "./CreateCustomer"

type StoreInvoice = {
  edit?: boolean
  invoice?: any
}

// const DATE_FORMAT = "MM-DD-YYYY"

export const StoreInvoice = ({ edit = false, invoice }: StoreInvoice) => {
  const router = useRouter()
  // const { state } = useLocation()
  // const terms_and_conditions = state?.terms_and_conditions
  const [showCreateCustomer, setShowCreateCustomer] = useState(false)
  const [isCreateCustomerLoading, setIsCreateCustomerLoading] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      invoice_date: invoice ? moment(invoice?.invoice_date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      due_date: invoice ? moment(invoice?.due_date).format("YYYY-MM-DD") : undefined,
      customer_id: invoice ? invoice?.customer.id : undefined,
      reference_no: invoice ? invoice?.reference_no : undefined,
      invoice_items: invoice
        ? invoice?.invoice_items?.map((item: any) => ({
            ...item,
            quantity: item.qty,
            vat_percentage: item.vat_value,
          }))
        : [
            {
              product_service_type: "",
              description: "",
              unit_price: "",
              quantity: "",
              discount: "",
              discount_type: "fixed",
              vat_percentage: "",
              sub_total: "",
            },
          ],
      sub_total: invoice ? undefined : 0,
      gross_discount: invoice ? invoice?.gross_discount : 0,
      all_total: invoice ? undefined : 0,
      // terms_and_conditions: invoice ? invoice?.terms_and_conditions : terms_and_conditions,
    },
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "invoice_items",
  })
  const { data: customer, isLoading: isCustomerLoading } = useCustomersQuery({})
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation()
  const [editInvoice, { isLoading: isEditLoading }] = useEditInvoiceMutation()

  const validateDiscount = (discount: number, unitPrice: string, isDiscountPercentage: boolean) => {
    if (isDiscountPercentage) {
      if (discount > 100) return "Discount percentage cannot be greater than 100%"
      if (discount < 0) return "Discount percentage cannot be less than 0%"
    } else if (discount > parseInt(unitPrice)) {
      return "Discount cannot be greater than price"
    }

    return null
  }

  const validateInvoiceItems = (data: any, setError: any, validateDiscount: any) => {
    const isNotValid = data.invoice_items.some((item: any, index: number) => {
      const discount = item.discount || 0
      const discountType = item.discount_type
      const isDiscountPercentage = discountType === "percentage"
      const unitPrice = item.unit_price || 0
      const isNotValid = validateDiscount(discount, unitPrice, isDiscountPercentage)
      if (isNotValid) {
        setError(`invoice_items.${index}.discount`, {
          type: "manual",
          message: isNotValid,
        })
      }
      return isNotValid
    })

    if (isNotValid) return false

    const isGrossDiscountNotValid = validateDiscount(data.gross_discount, data.sub_total)

    if (isGrossDiscountNotValid) {
      setError("gross_discount", {
        type: "manual",
        message: isGrossDiscountNotValid,
      })
      return false
    }

    return true
  }

  const onSubmit = async (data: any) => {
    const formatedData = {
      ...data,
      sub_total: getSubTotal(),
      all_total: getAllTotal(),
    }

    if (!validateInvoiceItems(formatedData, setError, validateDiscount)) return

    const payload = {
      ...formatedData,
      invoice_date: moment(formatedData.invoice_date).format(),
      due_date: moment(formatedData.due_date).format(),
    }

    if (edit && invoice) payload.uuid = invoice.uuid

    const response: any = await (edit ? editInvoice(payload) : createInvoice(payload))
    if (response && response?.data && response.data?.status_code === 200) {
      toast.success(edit ? "Invoice updated successfully" : "Invoice created successfully")
      reset()
      router.push("/dashboard/invoice")
    } else {
      toast.error("Something went wrong")
    }
  }

  const handleAddProduct = () =>
    append({
      product_service_type: "",
      description: "",
      unit_price: "",
      quantity: "",
      discount: "",
      vat_percentage: "",
      sub_total: "",
    })

  const handleRemoveProduct = (index: number) => remove(index)

  const handleSubTotal = (value: number, quantity: number, discount: number, vat: number, index: number) => {
    const totalPrice = value * quantity
    const discountType = watch(`invoice_items.${index}.discount_type`)
    const isDiscountPercentage = discountType === "percentage"
    const discountAmount = isDiscountPercentage ? (totalPrice * discount) / 100 : discount * quantity
    const price = totalPrice - discountAmount
    const vatAmount = (price * vat) / 100
    const subTotal = price + vatAmount
    setValue(`invoice_items.${index}.sub_total`, subTotal as never)
  }

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target
    const index = name.split(".")[1]
    let quantity = watch(`invoice_items.${index}.quantity`)
    let discount = watch(`invoice_items.${index}.discount`)
    let vat = watch(`invoice_items.${index}.vat_percentage`)
    if (!quantity) setValue(`invoice_items.${index}.quantity`, 1 as never)
    if (!discount) setValue(`invoice_items.${index}.discount`, 0 as never)
    if (!vat) setValue(`invoice_items.${index}.vat_percentage`, 0 as never)
    quantity = quantity || 1
    discount = discount || 0
    vat = vat || 0
    handleSubTotal(value, quantity, discount, vat, index)
  }

  const handleQuantityChange = (e: any) => {
    const { name, value } = e.target
    const index = name.split(".")[1]
    const price = watch(`invoice_items.${index}.unit_price`)
    const discount = watch(`invoice_items.${index}.discount`) || 0
    const vat = watch(`invoice_items.${index}.vat_percentage`) || 0
    handleSubTotal(price, value, discount, vat, index)
  }

  const handleDiscountChange = (e: any) => {
    const { name, value } = e.target
    const index = name.split(".")[1]
    const price = watch(`invoice_items.${index}.unit_price`)
    const quantity = watch(`invoice_items.${index}.quantity`)
    const vat = watch(`invoice_items.${index}.vat_percentage`) || 0
    handleSubTotal(price, quantity, value, vat, index)
  }

  const handleVatChange = (e: any) => {
    const { name, value } = e.target
    const index = name.split(".")[1]
    const price = watch(`invoice_items.${index}.unit_price`)
    const quantity = watch(`invoice_items.${index}.quantity`)
    const discount = watch(`invoice_items.${index}.discount`) || 0
    handleSubTotal(price, quantity, discount, value, index)
  }

  const getSubTotal = () => {
    const invoiceItems: any[] = watch("invoice_items")
    return invoiceItems.reduce((acc, cur) => acc + cur.sub_total, 0) || 0
  }

  const getAllTotal = () => {
    const netTotal = getSubTotal()
    const grossDiscount = watch("gross_discount") || 0
    return netTotal - grossDiscount
  }

  const handleAddCustomer = (customer: any) => {
    setValue("customer_id", customer.id as never)
    setIsCreateCustomerLoading(false)
  }

  const handleAddCustomerError = () => {
    setIsCreateCustomerLoading(false)
  }

  const handleAddCustomerClose = () => {
    setIsCreateCustomerLoading(false)
  }

  return (
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden p-3">
      <CreateCustomer
        show={showCreateCustomer}
        setShow={setShowCreateCustomer}
        onConfirm={handleAddCustomer}
        onError={handleAddCustomerError}
        onClose={handleAddCustomerClose}
      />
      <div className="d-flex align-items-center justify-content-between grid-cols-3 gap-3 mb-3">
        <h5 className="text-center my-0">{edit ? "Edit" : "Create"} Invoice</h5>
        <Link className="d-inline-flex align-items-center gap-1" href="/dashboard/invoice">
          <Icon name="back" size={18} />
          Back to Invoice List
        </Link>
      </div>
      <CForm className="row m-0 gy-2 gx-3 align-items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
        <CCol md={3}>
          <CFormLabel className="mt-2">Invoice Date</CFormLabel>
          <CFormInput
            className="custom-input"
            type="date"
            {...register("invoice_date", {
              required: {
                value: true,
                message: "Please enter a date",
              },
            })}
            invalid={errors?.invoice_date as any}
            feedbackInvalid={errors?.invoice_date?.message}
          />
        </CCol>
        <CCol
          md={{
            offset: 6,
            span: 3,
          }}>
          <CFormLabel className="mt-2">Reference No</CFormLabel>
          <CFormInput
            className="custom-input"
            type="text"
            {...register("reference_no")}
            invalid={errors?.reference_no as any}
            feedbackInvalid={errors?.reference_no?.message as any}
          />
        </CCol>
        <CCol xs={9} md={3}>
          <CFormLabel>Customer</CFormLabel>
          <Select
            control={control as any}
            name="customer_id"
            placeholder="Select Customer"
            isLoading={isCustomerLoading || isCreateCustomerLoading}
            className="customer-select"
            options={
              customer?.map((customer: any) => ({
                ...customer,
                label: `${customer.name}-${customer.email}-${customer.phone_no}`,
                value: customer.id,
              })) || []
            }
            rules={{
              required: {
                value: true,
                message: "Please select a customer",
              },
            }}
            invalid={errors?.customer_id as any}
            feedbackInvalid={errors?.customer_id?.message as any}
            formatOptionLabel={(data: any) => {
              return (
                <div className="player-option">
                  <div className="player-option__name">{data.name}</div>
                  <div className="player-option__email small hint-text">{data.email}</div>
                  <div className="player-option__phone small hint-text">{data.phone_no}</div>
                </div>
              )
            }}
          />
        </CCol>
        <CCol xs="auto" md={1}>
          <CButton
            type="button"
            onClick={() => {
              setShowCreateCustomer(true)
              setIsCreateCustomerLoading(true)
            }}
            className="flex-center py-2.75"
            color="primary">
            <Icon name="add" size={18} />
          </CButton>
        </CCol>
        <CCol
          md={{
            offset: 5,
            span: 3,
          }}>
          <CFormLabel>Due Date</CFormLabel>
          <CFormInput
            className="custom-input"
            type="date"
            {...register("due_date", {
              required: {
                value: true,
                message: "Please enter a date",
              },
            })}
            invalid={errors?.due_date as any}
            feedbackInvalid={errors?.due_date?.message}
          />
        </CCol>

        <CCol className="mt-lg-5 mb-3" xs={12}>
          <CRow className="g-2 mb-1 d-none d-lg-flex">
            <CCol xs="auto">SL</CCol>
            <CCol xs={3}>Product/Service Type</CCol>
            <CCol xs={3}>Description</CCol>
            <CCol xs={1}>Unit Price</CCol>
            <CCol xs={1}>Quantity</CCol>
            <CCol xs={1}>Unit Discount</CCol>
            <CCol xs={1}>Vat</CCol>
            <CCol xs={1}>Sub Total</CCol>
            <CCol
              xs="auto"
              style={{
                width: "52px",
              }}></CCol>
          </CRow>
          {fields.map((field, index) => {
            const discountType = watch(`invoice_items.${index}.discount_type`)
            const isDiscountPercentage = discountType === "percentage"
            return (
              <CRow className="g-2 mb-1" key={index}>
                <CCol md="auto" className="d-none d-lg-flex justify-content-center align-items-center">
                  {index + 1}
                </CCol>
                <CCol lg={3} className="mt-5 mt-lg-2">
                  <CFormInput
                    type="text"
                    placeholder="Product/Service Type"
                    className="custom-input"
                    {...register(`invoice_items.${index}.product_service_type`, {
                      required: {
                        value: true,
                        message: "Please enter a product/service type",
                      },
                    })}
                    invalid={(errors?.invoice_items as any)?.[index]?.product_service_type}
                    feedbackInvalid={(errors?.invoice_items as any)?.[index]?.product_service_type?.message}
                  />
                </CCol>
                <CCol lg={3}>
                  <CFormTextarea
                    rows={1}
                    placeholder="Description"
                    className="custom-input"
                    {...register(`invoice_items.${index}.description`, {
                      required: {
                        value: true,
                        message: "Please enter a description",
                      },
                    })}
                    invalid={(errors?.invoice_items as any)?.[index]?.description}
                    feedbackInvalid={(errors?.invoice_items as any)?.[index]?.description?.message}></CFormTextarea>
                </CCol>
                <CCol lg={1}>
                  <CFormInput
                    type="text"
                    placeholder="Unit Price"
                    className="custom-input"
                    {...register(`invoice_items.${index}.unit_price`, {
                      required: {
                        value: true,
                        message: "Please enter a unit price",
                      },
                      min: {
                        value: 0,
                        message: "Unit price must be greater than or equal to 0",
                      },
                    })}
                    invalid={(errors?.invoice_items as any)?.[index]?.unit_price}
                    feedbackInvalid={(errors?.invoice_items as any)?.[index]?.unit_price?.message}
                    onChange={handlePriceChange}
                  />
                </CCol>
                <CCol lg={1}>
                  <CFormInput
                    placeholder="Quantity"
                    className="custom-input"
                    type="text"
                    {...register(`invoice_items.${index}.quantity`, {
                      required: {
                        value: true,
                        message: "Please enter a quantity",
                      },
                      min: {
                        value: 0,
                        message: "Quantity must be greater than or equal to 0",
                      },
                    })}
                    invalid={(errors?.invoice_items as any)?.[index]?.quantity}
                    feedbackInvalid={(errors?.invoice_items as any)?.[index]?.quantity?.message}
                    onChange={handleQuantityChange}
                  />
                </CCol>
                <CCol lg={1}>
                  <CInputGroup>
                    <CFormInput
                      placeholder="***"
                      className="custom-input"
                      type="text"
                      {...register(`invoice_items.${index}.discount`, {
                        required: {
                          value: true,
                          message: "Please enter a discount",
                        },
                        min: {
                          value: 0,
                          message: "Discount must be greater than or equal to 0",
                        },
                      })}
                      invalid={(errors?.invoice_items as any)?.[index]?.discount}
                      // feedbackInvalid={(errors?.invoice_items as any)?.[index]?.discount?.message}
                      onChange={handleDiscountChange}
                    />
                    <CInputGroupText
                      id={`discount${index}`}
                      className="px-2 user-select-none"
                      onClick={async () => {
                        await setValue(
                          `invoice_items.${index}.discount_type`,
                          (isDiscountPercentage ? "fixed" : "percentage") as never
                        )
                        const discount = watch(`invoice_items.${index}.discount`)
                        if (discount)
                          await handleSubTotal(
                            watch(`invoice_items.${index}.unit_price`),
                            watch(`invoice_items.${index}.quantity`),
                            discount,
                            watch(`invoice_items.${index}.vat_percentage`),
                            index
                          )
                      }}
                      role="button">
                      <small className="me-1">{isDiscountPercentage ? "%" : "BDT"}</small>
                      <Icon name="chevronDown" size={12} />
                    </CInputGroupText>
                    {(errors?.invoice_items as any)?.[index]?.discount && (
                      <div className="invalid-feedback">
                        {(errors?.invoice_items as any)?.[index]?.discount?.message}
                      </div>
                    )}
                  </CInputGroup>
                </CCol>
                <CCol lg={1}>
                  <CInputGroup>
                    <CFormInput
                      placeholder="**"
                      className="custom-input"
                      type="text"
                      aria-describedby={`vat${index}`}
                      {...register(`invoice_items.${index}.vat_percentage`, {
                        required: {
                          value: true,
                          message: "Please enter a vat",
                        },
                        min: {
                          value: 0,
                          message: "Vat must be greater than or equal to 0",
                        },
                        max: {
                          value: 100,
                          message: "Vat must be less than or equal to 100",
                        },
                      })}
                      onChange={handleVatChange}
                    />
                    <CInputGroupText id={`vat${index}`} className="px-2">
                      %
                    </CInputGroupText>
                  </CInputGroup>
                </CCol>
                <CCol lg={1}>
                  <CFormInput
                    placeholder="Sub Total"
                    className="custom-input"
                    type="text"
                    readOnly
                    {...register(`invoice_items.${index}.sub_total`)}
                  />
                </CCol>
                <CCol lg="auto">
                  {index === 0 ? (
                    <CButton onClick={handleAddProduct} className="flex-center h-100 py-2" color="primary">
                      <Icon name="add" size={18} />
                      <span className="d-lg-none">Add Item</span>
                    </CButton>
                  ) : (
                    <CButton
                      onClick={() => handleRemoveProduct(index)}
                      className="flex-center h-100 py-2"
                      color="danger">
                      <Icon name="delete" size={18} />
                      <span className="d-lg-none">Remove Item</span>
                    </CButton>
                  )}
                </CCol>
              </CRow>
            )
          })}
        </CCol>

        <CCol
          lg={{
            offset: 9,
            span: 3,
          }}
          className="mt-4 mt-lg-0 d-flex flex-column flex-lg-row justify-content-start align-items-start justify-content-lg-end align-items-lg-center gap-2">
          <CFormLabel className="whitespace-nowrap">All Total</CFormLabel>
          <div className="me-lg-12 w-lg-unset" style={{ width: "100%" }}>
            <CInputGroup className="w-lg-55">
              <CFormInput
                className="custom-input"
                type="text"
                readOnly
                value={getSubTotal()}
                {...register("sub_total")}
              />
              <CInputGroupText id="all-total">
                <small>BDT</small>
              </CInputGroupText>
            </CInputGroup>
          </div>
        </CCol>

        <CCol
          lg={{
            offset: 9,
            span: 3,
          }}
          className="d-flex flex-column flex-lg-row justify-content-start align-items-start justify-content-lg-end align-items-lg-center gap-2">
          <CFormLabel className="whitespace-nowrap">Gross Discount</CFormLabel>
          <div className="me-lg-12 w-lg-unset" style={{ width: "100%" }}>
            <CInputGroup className="w-lg-55">
              <CFormInput
                className="custom-input"
                type="text"
                {...register("gross_discount", {
                  required: {
                    value: true,
                    message: "Please enter a gross discount",
                  },
                })}
                invalid={errors?.gross_discount as any}
                feedbackInvalid={errors?.gross_discount?.message as any}
              />
              <CInputGroupText id="discount">
                <small>BDT</small>
              </CInputGroupText>
            </CInputGroup>
          </div>
        </CCol>

        <CCol
          lg={{
            offset: 9,
            span: 3,
          }}
          className="d-flex flex-column flex-lg-row justify-content-start align-items-start justify-content-lg-end align-items-lg-center gap-2">
          <CFormLabel className="whitespace-nowrap">Payable Amount</CFormLabel>
          <div className="me-lg-12 w-lg-unset" style={{ width: "100%" }}>
            <CInputGroup className="w-lg-55">
              <CFormInput
                className="custom-input"
                type="text"
                readOnly
                value={getAllTotal()}
                {...register("all_total")}
              />
              <CInputGroupText id="payable-amount">
                <small>BDT</small>
              </CInputGroupText>
            </CInputGroup>
          </div>
        </CCol>

        <CCol xs={12}>
          <h6>Terms and Conditions</h6>
          <CFormTextarea className="custom-input" rows={2} {...register("terms_and_conditions")} />
        </CCol>
        <CCol className="d-flex justify-content-end">
          <CButton type="submit" className="mt-2" color="primary" disabled={isLoading || isEditLoading}>
            {(isLoading || isEditLoading) && <CSpinner color="light" size="sm" className="me-2" />}
            {edit ? "Update" : "Create"} Invoice
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}
