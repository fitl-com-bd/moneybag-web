"use client"
import { Button, Card, FormFooter, FormLabel, SectionHeader } from "@/components/ui"
import { useCreatePermissionMutation, useFeaturesQuery } from "@/store"
import { getOptions, Swal } from "@/utils"
import { CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const CreatePermission = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm()

  const { data: features, isLoading } = useFeaturesQuery({})
  const [createPermission] = useCreatePermissionMutation() // Use the mutation hook
  const router = useRouter()

  const onSubmit = async (data: any) => {
    try {
      const response = await createPermission(data).unwrap()
      Swal.fire({
        title: "Success",
        text: "Permission Created Successfully",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        router.push("/admin/dashboard/permissions")
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: "Error",
        text: "Failed to create permission",
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }

  return (
    <>
      <SectionHeader title="Permission Create" subtitle="Create a new permission for the users" />
      <CForm className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <CRow>
            <CCol>
              <FormLabel required>App Feature</FormLabel>
              <CFormSelect
                placeholder="App Feature"
                {...register("feature_id", {
                  required: {
                    value: true,
                    message: "Please select an app feature",
                  },
                })}>
                <option value="" selected disabled>
                  Select App Feature
                </option>
                {getOptions(features, "title", "id").map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              {errors?.feature_id && (
                <div className="invalid-feedback d-block">{errors?.feature_id?.message as any}</div>
              )}
            </CCol>
            <CCol>
              <FormLabel required>Title</FormLabel>
              <CFormInput
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please enter a title",
                  },
                })}
                invalid={errors?.title as any}
                feedbackInvalid={errors?.title?.message as any}
              />
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

export default CreatePermission
