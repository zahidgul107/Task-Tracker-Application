import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/auth'
//const API_URL = 'http://localhost:9099/api/auth'

export const register = (name, username, email, password) => {
  return axios.post(API_URL + '/register', {
    name,
    username,
    email,
    password,
  })
}

export const login = (user) => {
  return axios.post(API_URL + '/login', user)
}
