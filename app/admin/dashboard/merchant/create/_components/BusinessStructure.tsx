import { Button, Card, FormFooter, FormLabel } from "@/components/ui"
import { CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
const businessOption = [
  "Educational Institute",
  "Public Limited",
  "Partnership",
  "Proprietorship",
  "Non Profit",
  "Private Limited",
]

const BusinessStructure = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    Swal.fire({
      title: "Success",
      text: "Business Structure Updated Successfully",
      icon: "success",
      confirmButtonText: "Ok",
    })
  }
  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <Card className="space-y-6">
        <div className="form-group">
          <FormLabel required>Legal Identity of Company</FormLabel>
          <CFormSelect
            {...register("businessOption", {
              required: {
                value: true,
                message: "Please select an option",
              },
            })}
            invalid={errors?.businessOption as any}
            feedbackInvalid={errors?.businessOption?.message as any}>
            <option value="">Select</option>
            {businessOption.map((country, index) => (
              <option value={country} key={index}>
                {country}
              </option>
            ))}
          </CFormSelect>
        </div>
        <CRow>
          <CCol>
            <FormLabel required>Industry/Business Type</FormLabel>
            <CFormSelect>
              <option value="">Select Industry/Business</option>
              {businessOption.map((country, index) => (
                <option value={country} key={index}>
                  {country}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol>
            <FormLabel required>Merchant Category Code</FormLabel>
            <CFormInput type="text" placeholder="Enter Merchant Category Code" />
          </CCol>
        </CRow>
      </Card>
      <Card>
        <FormLabel required>Business Description</FormLabel>
        <CFormTextarea rows={4} text="" />
      </Card>
      <Card className="space-y-6">
        <div className="form-group">
          <FormLabel required>Max Ticket Size*</FormLabel>
          <CFormSelect>
            <option value="">Select</option>
            {businessOption.map((country, index) => (
              <option value={country} key={index}>
                {country}
              </option>
            ))}
          </CFormSelect>
        </div>
      </Card>
      <FormFooter>
        <Button secondary>Cancel</Button>
        <Button submit>Update</Button>
      </FormFooter>
    </CForm>
  )
}

export default BusinessStructure
