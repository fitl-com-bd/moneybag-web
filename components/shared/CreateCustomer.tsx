import { FormLabel } from "@/components/ui"
import { useCreateCustomerMutation } from "@/store"
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type CreateCustomerProps = {
  show: boolean
  setShow: (show: boolean) => void
  onConfirm?: (customer: any) => void
  onError?: (error: any) => void
  onClose?: () => void
}

export const CreateCustomer = ({ show, setShow, onConfirm, onError, onClose }: CreateCustomerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [createCustomer, { isLoading }] = useCreateCustomerMutation()

  const onSubmit = async (data: any) => {
    const response: any = await createCustomer(data)

    if (response?.error) {
      if (onError) onError(response.error)
      return toast.error(response.error?.data?.detail?.message)
    }
    if (onConfirm) onConfirm(response?.data?.data?.customer)
    toast.success("Customer created successfully")
    reset()
    setShow(false)
  }

  if (!show || isLoading) return null

  const handleClose = () => {
    setShow(false)
    if (onClose) onClose()
  }

  return (
    <CModal visible={show} onClose={handleClose} aria-labelledby="createCustomer" alignment="center" backdrop="static">
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader onClose={handleClose}>
          <CModalTitle id="createCustomer">Create Customer</CModalTitle>
        </CModalHeader>
        <CModalBody className="row">
          <CCol xs={12}>
            <FormLabel required>Customer Name</FormLabel>
            <CFormInput
              className="custom-input"
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter a name",
                },
              })}
              invalid={errors?.name as any}
              feedbackInvalid={errors?.name?.message as any}
            />
          </CCol>
          <CCol xs={12}>
            <FormLabel required className="mt-2">
              Email
            </FormLabel>
            <CFormInput
              className="custom-input"
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter an email",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              invalid={errors?.email as any}
              feedbackInvalid={errors?.email?.message as any}
            />
          </CCol>
          <CCol xs={12}>
            <FormLabel required className="mt-2">
              Phone
            </FormLabel>
            <CFormInput
              className="custom-input"
              type="text"
              maxLength={14}
              {...register("phone_no", {
                required: {
                  value: true,
                  message: "Please enter a phone number",
                },
                pattern: {
                  value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                  message: "Please enter a valid Bangladeshi phone number",
                },
              })}
              invalid={errors?.phone_no as any}
              feedbackInvalid={errors?.phone_no?.message as any}
            />
          </CCol>
          <CCol xs={12}>
            <FormLabel className="mt-2">Address</FormLabel>
            <CFormInput
              className="custom-input"
              type="text"
              {...register("address")}
              invalid={errors?.address as any}
              feedbackInvalid={errors?.address?.message as any}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton type="button" color="secondary" onClick={() => setShow(false)}>
            Close
          </CButton>
          <CButton type="submit" color="primary">
            Create Customer
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}
