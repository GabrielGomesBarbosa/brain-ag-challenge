import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  isSideBarCollapsed: boolean
}

const INITIAL_STATE: AppState = {
  isSideBarCollapsed: false
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: INITIAL_STATE,
  reducers: {
    toggleCollapseSideBar: state => {
      state.isSideBarCollapsed = !state.isSideBarCollapsed
    }
  }
})

export const { toggleCollapseSideBar } = layoutSlice.actions

export default layoutSlice.reducer
