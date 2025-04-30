"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useAddressQuery, useAllBranchesQuery, useBanksQuery, useCreateBranchMutation } from "@/store"
import { getDistrictsByDivision, getDivisions, getErrorMessage, Swal } from "@/utils"
import {
  CCardBody,
  CCardLink,
  CCardTitle,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CRow,
} from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const Services = ({ id, changeTab }: any) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const [createBranch, { isLoading }] = useCreateBranchMutation()
  const { data: banks, isLoading: isBanksLoading } = useBanksQuery({})
  const { data: branches, isLoading: isBranchesLoading } = useAllBranchesQuery({})
  const router = useRouter()

  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery({})
  const selectedDivision = watch("division_id")

  const onSubmit = async (data: any) => {
    const arg = {
      ...data,
      bank_id: id, // Ensure bank_id is included in the payload
    }

    const response = await createBranch(arg)

    if (response?.error) {
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: getErrorMessage(response.error),
        confirmButtonText: "Ok",
      })
    }

    if (response?.data?.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: response?.data?.message,
        confirmButtonText: "Continue",
      }).then(() => {
        router.back()
      })
    }
  }

  return (
    <>
      <SectionHeader
        title="Provide Settlement Bank Details"
        subtitle="Enter the banking information required to process and settle transactions securely."
      />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Branch Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Branch Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter the branch name",
                  },
                })}
                invalid={errors?.name as any}
                feedbackInvalid={errors?.name?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Routing Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Routing Number"
                {...register("routing_number", {
                  required: {
                    value: true,
                    message: "Please enter the routing number",
                  },
                })}
                invalid={errors?.routing_number as any}
                feedbackInvalid={errors?.routing_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>

        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Primary Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Primary Phone Number"
                {...register("primary_phone", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.primary_phone as any}
                feedbackInvalid={errors?.primary_phone?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Secondary Phone Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Secondary Phone Number"
                {...register("secondary_phone", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.secondary_phone as any}
                feedbackInvalid={errors?.secondary_phone?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel>Email Address</FormLabel>
              <CFormInput
                type="email"
                placeholder="Enter Email Address"
                {...register("email")}
                invalid={errors?.email as any}
                feedbackInvalid={errors?.email?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel>Customer Support Number</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Customer Support Number"
                {...register("customer_support_number", {
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must be a number",
                  },
                })}
                invalid={errors?.customer_support_number as any}
                feedbackInvalid={errors?.customer_support_number?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Address</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Address"
                {...register("street", {
                  required: {
                    value: true,
                    message: "Please enter the address",
                  },
                })}
                invalid={errors?.street as any}
                feedbackInvalid={errors?.street?.message as any}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Division</FormLabel>
              <CFormSelect
                {...register("division_id", {
                  required: {
                    value: true,
                    message: "Please select a division",
                  },
                })}
                invalid={errors?.division_id as any}
                feedbackInvalid={errors?.division_id?.message as any}
                disabled={isAddressLoading}>
                <option value="">Select Division</option>
                {getDivisions(addressData).map((division: any) => (
                  <option value={division.id} key={division.id}>
                    {division.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <FormLabel required>District</FormLabel>
              <CFormSelect
                {...register("district_id", {
                  required: {
                    value: true,
                    message: "Please select a district",
                  },
                })}
                invalid={errors?.district_id as any}
                feedbackInvalid={errors?.district_id?.message as any}
                disabled={isAddressLoading || !selectedDivision}>
                <option value="">Select District</option>
                {getDistrictsByDivision(addressData, selectedDivision).map(district => (
                  <option value={district.id} key={district.id}>
                    {district.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <FormLabel required>Postal Code</FormLabel>
              <CFormInput
                type="text"
                placeholder="Enter Postal Code"
                {...register("postal_code", {
                  required: {
                    value: true,
                    message: "Please enter the postal code",
                  },
                })}
                invalid={errors?.postal_code as any}
                feedbackInvalid={errors?.postal_code?.message as any}
              />
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel>Remarks / Note</FormLabel>
              <CFormTextarea rows={4} placeholder="Enter Note" {...register("notes")} />
            </CCol>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-3">
                <CFormCheck
                  type="radio"
                  label="Active"
                  value="true"
                  {...register("is_active", {
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                />
                <CFormCheck type="radio" label="Inactive" value="false" {...register("is_active")} />
              </div>
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary onClick={() => changeTab("payment_service")} disabled={isLoading} isLoading={isLoading}>
            Previous
          </Button>
          <Button submit disabled={isLoading} isLoading={isLoading}>
            Submit
          </Button>
        </FormFooter>
      </CForm>
    </>
  )
}
