import axios from 'axios'
import { isEmpty } from 'lodash-es'
import { proxyWithComputed } from 'valtio/utils'

export const LOCAL_STORAGE_KEY = 'jwt'

function getAuthUser() {
  const user = window.localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!user) return {}

  return JSON.parse(user)
}

export const auth = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isEmpty(snap.authUser),
  }
)

export function setAuthUser(user) {
  auth.authUser = user

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
}

export function login(user) {
  setAuthUser(user)

  axios.defaults.headers.common.Authorization = `Token ${user.token}`
}

export function logout() {
  auth.authUser = {}

  delete axios.defaults.headers.common.Authorization

  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
}
