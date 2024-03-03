import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/task'
const API_URL = 'http://localhost:9099/api/task'

//const loggedInUser = AuthService.getCurrentUser()
const loggedInUser = 'abc'

export const getTask = (id) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.get(API_URL + '/getTask/' + id, config)
}

export const searchTask = (search) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.post(API_URL + '/search', search, config)
}

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      //   const loggedInUser = thunkAPI.getState().auth.loggedInUser

      const config = {
        headers: {
          Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
        },
      }
      // console.log('thunk api==========   ', thunkAPI)
      // console.log('thunk state==========  ', thunkAPI.getState())
      // console.log('thunk dispatch==========  ', thunkAPI.dispatch)
      const dispatch = thunkAPI.dispatch

      const { tasks } = thunkAPI.getState()
      //  console.log('taskList:', tasks.taskList)
      dispatch(getAllTasks())
      const resp = await axios.delete(API_URL + '/deleteTask/' + id, config)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getPagTasks = (page = 0) => {
  const params = {
    page: page,
    size: 10,
  }

  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
      params: params,
    },
  }

  return axios.get(API_URL + '/getPagTasks', config)
}

export const inCompleteTask = (id) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.patch(API_URL + 'user', config)
}

export const completeTask = (id) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.patch(API_URL + 'admin', config)
}
