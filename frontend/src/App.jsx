import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './components/pages/auth/Login/Login'
import Dashboard from './components/pages/tasks/Dashboard'
import ListTasks from './components/pages/tasks/ListTask'
import AddTask from './components/pages/tasks/AddTask'
import Register from './components/pages/auth/Register/Register'
import Footer from './components/Footer/Footer'

function App() {
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
