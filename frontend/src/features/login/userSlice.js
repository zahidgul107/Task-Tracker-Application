import { createSlice } from '@reduxjs/toolkit'
import { loginn } from '../../services/auth.service'

const initialState = {
  loggedInUser: '',
  unauthorizedMessage: '',
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true
    },
    signInSuccess: (state, action) => {
      state.isLoading = false
      state.loggedInUser = action.payload
    },
    signInFailure: (state, action) => {
      state.unauthorizedMessage = action.payload
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginn.fulfilled, (state, action) => {
        state.isLoading = false
        state.loggedInUser = action.payload
      })
      .addCase(loginn.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
      })
  },
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
