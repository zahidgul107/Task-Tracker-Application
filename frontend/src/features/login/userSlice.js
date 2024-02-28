import { createSlice } from '@reduxjs/toolkit'
import { login } from '../../services/auth.service'

const initialState = {
  loggedInUser: '',
  unauthorizedMessage: '',
  isLoading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.loggedInUser = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
      })
  },
})

export default userSlice.reducer
