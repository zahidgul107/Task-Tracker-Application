import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/login/userSlice'
import taskReducer from './features/taskList/taskListSlice'
import dashboardReducer from './features/dashboard/dashboardSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    dashboard: dashboardReducer,
  },
})
