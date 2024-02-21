import axios from 'axios'
import AuthService from '../services/auth.service'

//const API_URL = 'https://2e08-203-129-216-146.ngrok-free.app/api/dashboard'
const API_URL = 'http://localhost:9099/api/dashboard'

const loggedInUser = AuthService.getCurrentUser()
export const getCount = () => {
  const config = {
    headers: {
      Authorization: `${loggedInUser.tokenType} ${loggedInUser.accessToken}`,
    },
  }
  return axios.get(API_URL + '/getDashboardCount', config)
}
