import axios from 'axios'
import { isEmpty } from 'lodash-es'
import { useSnapshot } from 'valtio'
import { proxyWithComputed } from 'valtio/utils'

function getAuthUser() {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return {}

  return JSON.parse(atob(jwt))
}

const state = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isEmpty(snap.authUser),
  }
)

const actions = {
  login: (user) => {
    state.authUser = user

    window.localStorage.setItem('jwtToken', btoa(JSON.stringify(state.authUser)))

    axios.defaults.headers.Authorization = `Token ${state.authUser.token}`
  },
  logout: () => {
    state.authUser = {}

    window.localStorage.removeItem('jwtToken')
  },
  checkAuth: () => {
    const authUser = getAuthUser()

    if (!authUser || isEmpty(authUser)) {
      actions.logout()
    }
  },
}

function useAuth() {
  const snap = useSnapshot(state)

  return {
    ...snap,
    ...actions,
  }
}

export default useAuth
