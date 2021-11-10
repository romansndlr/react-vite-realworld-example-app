import axios from 'axios'
import { useSnapshot } from 'valtio'
import auth from '../auth'

function login(user) {
  auth.authUser = user

  window.localStorage.setItem('jwt', JSON.stringify(user))

  axios.defaults.headers.common.Authorization = `Token ${user.token}`
}

function updateUser(user) {
  auth.authUser = user

  window.localStorage.setItem('jwt', JSON.stringify(user))


}

function useAuth() {
  const snap = useSnapshot(auth)

  return {
    ...snap,
    login,
    updateUser
  }
}


export default useAuth
