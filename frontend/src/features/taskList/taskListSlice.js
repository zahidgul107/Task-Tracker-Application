import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  deleteTask,
  getAllTasks,
  getPagTasks,
  searchTask,
} from '../../services/TaskService'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/task'
const API_URL = 'http://localhost:9099/api/task'

export const createTask = createAsyncThunk(
  'task/createTask',
  async (task, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState()
      const loggedInUser = user.loggedInUser
      const config = {
        headers: {
          Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
        },
      }

      const resp = await axios.post(API_URL + '/add', task, config)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  taskList: [],
  unauthorizedMessage: '',
  successMessage: '',
  failMessage: '',
  isLoading: true,
}

const taskListSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action) => {
      const taskId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.taskList = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.successMessage = action.payload
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
        if (action.payload.response.status === 400)
          state.failMessage = action.payload.response.data
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.successMessage = action.payload
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload.response.status === 401)
          state.unauthorizedMessage = action.payload.response.data.message
        if (action.payload.response.status === 400)
          state.failMessage = action.payload.response.data
      })
  },
})

export const { removeTask } = taskListSlice.actions

export default taskListSlice.reducer
