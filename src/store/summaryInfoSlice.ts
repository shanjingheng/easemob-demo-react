import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Summary } from '../models/index'

interface GenerateParams {
  groupId: string
  userId: string
  hour: number
}

export const summaryInfoSlice = createSlice({
  name: 'appConfig',
  initialState: {
    showPanel: false,
    showOptions: false,
    summaryList: [] as Summary[],
    generateParams: {} as GenerateParams
  },
  reducers: {
    openPanel: (state) => {
      state.showPanel = true
    },
    closePanel: (state) => {
      state.showPanel = false
    },
    openOptions: (state) => {
      state.showOptions = true
    },
    closeOptions: (state) => {
      state.showOptions = false
    },
    setGenerateParams: (state, action: PayloadAction<GenerateParams>) => {
      state.generateParams = action.payload
    },
    appendSummaryList: (state, action: PayloadAction<Summary>) => {
      state.summaryList.push(action.payload)
    },
    setSummaryList: (state, action: PayloadAction<Summary[]>) => {
      state.summaryList = action.payload
    }
  }
})

export const {
  openPanel,
  closePanel,
  openOptions,
  closeOptions,
  setGenerateParams,
  appendSummaryList,
  setSummaryList
} = summaryInfoSlice.actions

export default summaryInfoSlice.reducer

export const selectState = (state: RootState) => state.summaryInfo
