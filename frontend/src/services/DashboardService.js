import axios from 'axios'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/dashboard'
const API_URL = 'http://localhost:3000/api/dashboard'

export const getCount = () => {
  return axios.get(API_URL + '/getDashboardCount')
}
