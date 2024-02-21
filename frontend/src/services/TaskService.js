import axios from 'axios'
import AuthService from '../services/auth.service'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/task'
const API_URL = 'http://localhost:9099/api/task'

const loggedInUser = AuthService.getCurrentUser()

export const createTask = (task) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.post(API_URL + '/add', task, config)
}

export const updateTask = (id, task) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.put(API_URL + '/updateTask/' + id, task, config)
}

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

export const getAllTasks = (page = 0) => {
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

  return axios.get(API_URL + '/getAllTasks', config)
}

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

  console.log('config======    ', config)

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

export const deleteTask = (id) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.delete(API_URL + '/deleteTask/' + id, config)
}

export const completeTask = (id) => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.patch(API_URL + 'admin', config)
}
