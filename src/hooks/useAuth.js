import axios from 'axios'
import { useSnapshot } from 'valtio'
import auth, { LOCAL_STORAGE_KEY } from '../auth'

function setAuthUser(user) {
  auth.authUser = user

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
}

function login(user) {
  setAuthUser(user)

  axios.defaults.headers.common.Authorization = `Token ${user.token}`
}

function logout() {
  setAuthUser({})

  delete axios.defaults.headers.common.Authorization

  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function useAuth() {
  const snap = useSnapshot(auth)

  return {
    ...snap,
    login,
    logout,
    setAuthUser,
  }
}

export default useAuth
