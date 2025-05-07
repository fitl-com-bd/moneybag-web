import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useParams = <T>(paramName: string, defaultValue: T): [T, (value: T) => void] => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paramValue = (searchParams.get(paramName) as T) || defaultValue

  const setParamValue = useCallback(
    (value: T) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null || value === undefined) {
        params.delete(paramName)
      } else {
        params.set(paramName, String(value))
      }
      router.push(`?${params.toString()}`)
    },
    [searchParams, router, paramName]
  )

  return [paramValue, setParamValue]
}
