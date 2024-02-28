import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/login/userSlice'
import taskReducer from './features/taskList/taskListSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
})
