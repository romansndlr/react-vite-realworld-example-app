import axios from 'axios'
import { useSnapshot } from 'valtio'
import auth from '../auth'

function login(user) {
  auth.authUser = user

  window.localStorage.setItem('jwt', JSON.stringify(user))

  axios.defaults.headers.common.Authorization = `Token ${user.token}`
}

function useAuth() {
  const snap = useSnapshot(auth)

  return {
    ...snap,
    login,
  }
}

export default useAuth
