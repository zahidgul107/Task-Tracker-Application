import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/auth.service'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/dashboard'
const API_URL = 'http://localhost:9099/api/dashboard'

const loggedInUser = AuthService.getCurrentUser()
// export const getCount = () => {
//   //const { tasks } = thunkAPI.getState()
//   const loggedInUser = thunkAPI.getState().auth.loggedInUser
//   const config = {
//     headers: {
//       Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
//     },
//   }
//   return axios.get(API_URL + '/getDashboardCount', config)
// }

export const getCount = createAsyncThunk(
  'tasks/getCount',
  async (arg, thunkAPI) => {
    try {
      console.log(arg, thunkAPI)
      const { user } = thunkAPI.getState()
      const loggedInUser = user.loggedInUser
      const config = {
        headers: {
          Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
        },
      }

      const resp = await axios.get(API_URL + '/getDashboardCount', config)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
