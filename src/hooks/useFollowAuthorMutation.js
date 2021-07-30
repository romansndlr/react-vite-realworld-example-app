import axios from 'axios'
import { useMutation } from 'react-query'

function useFollowAuthorMutation(config) {
  return useMutation(
    (/** @type {{following: boolean, username: string}} */ { following, username }) =>
      axios[following ? 'delete' : 'post'](`/profiles/${username}/follow`),
    config
  )
}

export default useFollowAuthorMutation
