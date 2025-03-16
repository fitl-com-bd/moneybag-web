"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useRolesQuery } from "@/store"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const MerchantDetails = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const { data: roles, isLoading } = useRolesQuery({})
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
    <>
      <SectionHeader title="Role Create" subtitle="Create a new role for the users" />
      <CForm className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Role Name</FormLabel>
              <CFormInput
                type="text"
                placeholder="Role Name"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please enter a role name",
                  },
                })}
                invalid={errors?.title as any}
                feedbackInvalid={errors?.title?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Parent Role</FormLabel>
              <CFormSelect placeholder="Parent Role" {...register("parentRole")}>
                <option value="" selected disabled>
                  Select Parent Role
                </option>
                {roles?.map((role: any) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </CFormSelect>
              {errors?.parentRole && (
                <div className="invalid-feedback d-block">{errors?.parentRole?.message as any}</div>
              )}
            </CCol>
          </CRow>
        </Card>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>Description</FormLabel>
              <CFormTextarea
                placeholder="Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please enter a description",
                  },
                })}
                invalid={errors?.description as any}
                feedbackInvalid={errors?.description?.message as any}
              />
            </CCol>
            <CCol>
              <FormLabel required>Status</FormLabel>
              <div className="d-flex gap-4">
                <CFormCheck
                  type="radio"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="active"
                  label="Active"
                  id="active"
                  invalid={errors?.status as any}
                />
                <CFormCheck
                  type="radio"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please select a status",
                    },
                  })}
                  value="inactive"
                  label="Inactive"
                  id="inactive"
                  invalid={errors?.status as any}
                />
              </div>
              {errors?.status && <div className="invalid-feedback d-block">{errors?.status?.message as any}</div>}
            </CCol>
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary>Cancel</Button>
          <Button submit>Save</Button>
        </FormFooter>
      </CForm>
    </>
  )
}

export default MerchantDetails
