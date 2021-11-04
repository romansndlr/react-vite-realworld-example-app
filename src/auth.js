import { isEmpty } from 'lodash-es'
import { proxyWithComputed } from 'valtio/utils'

export const LOCAL_STORAGE_KEY = 'jwt'

function getAuthUser() {
  const user = window.localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!user) return {}

  return JSON.parse(user)
}

const state = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isEmpty(snap.authUser),
  }
)

export default state
