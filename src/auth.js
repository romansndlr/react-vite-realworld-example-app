import { isEmpty } from 'lodash-es'
import { proxyWithComputed } from 'valtio/utils'

function getAuthUser() {
  const user = window.localStorage.getItem('jwt')

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
