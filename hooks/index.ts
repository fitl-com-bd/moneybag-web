import { StoreDispatch, StoreState } from "@/types"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => StoreDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export * from "./useAuth"
export * from "./useParams"
