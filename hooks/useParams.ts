import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useParams = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const params: any = Object.fromEntries(searchParams.entries())

  const setParams = useCallback(
    (newParams: any) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })
      router.push(`?${params.toString()}`)
    },
    [searchParams, router]
  )

  return [params, setParams]
}
