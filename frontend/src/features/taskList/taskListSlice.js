import { createSlice } from '@reduxjs/toolkit'
import {
  deleteTask,
  getAllTasks,
  getPagTasks,
  searchTask,
} from '../../services/TaskService'

const initialState = {
  tasks: [],
  isLoading: true,
}

const taskListSlice = createSlice({
  name: 'task',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        console.log(action)
        console.log(action.payload.message)
        console.log(action.payload.response.data.message)
        state.isLoading = false
      })
  },
})

export default taskListSlice.reducer
