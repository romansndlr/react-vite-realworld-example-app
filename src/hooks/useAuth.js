import { useSnapshot } from 'valtio'
import { login, logout, setAuthUser, auth } from '../auth'

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
