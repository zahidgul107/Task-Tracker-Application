import { createSlice } from '@reduxjs/toolkit'
import {
  deleteTask,
  getAllTasks,
  getPagTasks,
  searchTask,
} from '../../services/TaskService'

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
      console.log('remove action======    ', action)
      console.log(taskId, '  ========taskId')
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
  },
})

export const { removeTask } = taskListSlice.actions

export default taskListSlice.reducer
