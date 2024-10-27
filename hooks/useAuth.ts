import { useCheckLoginQuery } from "@/store"

export const useAuth = () => {
  const { data, isFetching: isLoading, error } = useCheckLoginQuery({})

  const user = data as any

  return { user, isLoading, error }
}
