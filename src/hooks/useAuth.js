import { useSnapshot } from 'valtio'
import axios from 'axios'
import auth from '../auth'

function login(user) {
  auth.authUser = user

  axios.defaults.headers.common.Authorization = `Token ${user.token}`

  window.localStorage.setItem('jwt', JSON.stringify(user))
}

function useAuth() {
  const snap = useSnapshot(auth)

  return {
    ...snap,
    login
  }
}

export default useAuth