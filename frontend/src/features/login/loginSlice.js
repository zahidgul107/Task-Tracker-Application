import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: [],
  isLoading: true,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
})

//console.log(loginSlice)

export default loginSlice.reducer
