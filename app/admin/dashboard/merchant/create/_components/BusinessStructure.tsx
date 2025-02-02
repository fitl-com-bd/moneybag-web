import { Button, Card, FormFooter, FormLabel } from "@/components/ui"
import { CButton, CCol, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"

const businessOption = [
  "Educational Institute",
  "Public Limited",
  "Partnership",
  "Proprietorship",
  "Non Profit",
  "Private Limited",
]

const BusinessStructure = () => {
  return (
    <>
      <Card className="space-y-6">
        <div className="form-group">
          <FormLabel required>Legal Identity of Company</FormLabel>
          <CFormSelect>
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
        <Button>Update</Button>
      </FormFooter>
    </>
  )
}

export default BusinessStructure
