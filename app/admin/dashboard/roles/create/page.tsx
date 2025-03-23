"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreateRoleMutation, usePermissionsQuery, useRolesQuery } from "@/store"
import { getErrorMessage, getOptions } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CRow } from "@coreui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { title } from "process"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const CreateRole = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
    setValue,
  } = useForm()
  const { data: roles, isLoading } = useRolesQuery({})
  const { data: permissions, isLoading: isPermissionsLoading } = usePermissionsQuery({})
  const [createRole] = useCreateRoleMutation()

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      title: data.title,
      description: data.description,
      permission_ids: data.permissions.filter((permission: any) => permission),
    }

    const response = await createRole(payload)

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
              <CFormSelect
                placeholder="Parent Role"
                {...register("parentRole")}
                onChange={e => {
                  const value = e.target.value
                  if (value === "") return
                  const parentRole = roles?.data.find((role: any) => role.id === parseInt(value))
                  if (!parentRole) return
                  const parentRolePermissions = parentRole.permissions.map((permission: any) => permission.id)
                  //clear all permissions
                  permissions?.data?.forEach((permission: any) => {
                    setValue(`permissions.${permission.id}`, false)
                  })
                  // set parent role permissions
                  parentRolePermissions.forEach((permission: any) => {
                    setValue(`permissions.${permission}`, true)
                  })
                }}>
                <option value="" selected disabled>
                  Select Parent Role
                </option>
                {getOptions(roles, "title", "id").map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
        <h6 className="mb-2">Permission</h6>
        <Card className="space-y-6">
          <CRow>
            {isPermissionsLoading ? (
              <CCol>
                <p className="text-muted mb-0">Loading...</p>
              </CCol>
            ) : !permissions?.data?.length ? (
              <CCol>
                <p className="text-muted mb-0">No permissions found</p>
              </CCol>
            ) : (
              permissions?.data.map((permission: any) => (
                <CCol key={permission.id}>
                  <CFormSwitch
                    {...register(`permissions.${permission.id}`)}
                    label={permission.title}
                    id={`permission-${permission.id}`}
                    value={permission.id}
                  />
                </CCol>
              ))
            )}
          </CRow>
        </Card>
        <FormFooter>
          <Button secondary back>
            Cancel
          </Button>
          <Button submit>Save</Button>
        </FormFooter>
      </CForm>
    </>
  )
}

export default CreateRole
