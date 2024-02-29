import { createSlice } from '@reduxjs/toolkit'
import { getCount } from '../../services/DashboardService'

const initialState = {
  tasksCount: null,
  unauthorizedMessage: '',
  isLoading: false,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCount.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        state.tasksCount = action.payload
      })
      .addCase(getCount.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
      })
  },
})

export default dashboardSlice.reducer
