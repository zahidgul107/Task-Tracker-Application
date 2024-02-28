import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: '',
  isLoading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
})

export default userSlice.reducer
