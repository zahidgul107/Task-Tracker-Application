import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/auth'
const API_URL = 'http://localhost:9099/api/auth'

const register = (name, username, email, password) => {
  return axios.post(API_URL + '/register', {
    name,
    username,
    email,
    password,
  })
}

export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (page = 0, thunkAPI) => {
    try {
      //   const loggedInUser = thunkAPI.getState().auth.loggedInUser
      const params = {
        page: page,
        size: 10,
      }

      const config = {
        headers: {
          Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
        },
        params: params,
      }

      const resp = await axios.get(API_URL + '/getAllTasks', config)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
  try {
    const resp = await axios.post(API_URL + '/login', user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const login = (user) => {
  return axios.post(API_URL + '/login', user)
}

const logout = () => {
  localStorage.removeItem('user')
  return axios.post(API_URL + '/logout').then((response) => {
    return response.data
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService
