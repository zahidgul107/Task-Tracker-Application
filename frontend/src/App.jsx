import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './components/pages/auth/Login/Login'
import Dashboard from './components/pages/tasks/Dashboard'
import ListTasks from './components/pages/tasks/ListTask'
import AddTask from './components/pages/tasks/AddTask'
import Register from './components/pages/auth/Register/Register'
import Footer from './components/Footer/Footer'
import AuthService from './services/auth.service'
import EventBus from '../src/utils/EventBus'

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = AuthService.getCurrentUser()

    if (isAuth) {
      return children
    } else {
      return <Navigate to="/" />
    }
  }

  useEffect(() => {
    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <AuthenticatedRoute>
                <ListTasks />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/addTask"
            element={
              <AuthenticatedRoute>
                <AddTask />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/updateTask/:id"
            element={
              <AuthenticatedRoute>
                <AddTask />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
