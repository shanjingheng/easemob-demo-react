import { useContext } from 'react'
import { RootContext } from 'easemob-chat-uikit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppTheme = () => {
  const context = useContext(RootContext)
  return context?.theme
}
