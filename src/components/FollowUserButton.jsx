import classNames from 'classnames'
import axios from 'axios'
import React from 'react'
import { useMutation } from 'react-query'

function FollowUserButton({ user = {}, mutationConfig = {} }) {
  const followMutation = useMutation(
    () => axios[user.following ? 'delete' : 'post'](`/profiles/${user.username}/follow`),
    mutationConfig
  )

  return (
    <button
      disabled={followMutation.isLoading}
      type="button"
      className={classNames('btn btn-sm action-btn', {
        'btn-outline-secondary': !user.following,
        'btn-secondary': user.following,
      })}
      onClick={() => followMutation.mutate()}
    >
      <i className="ion-plus-round" />
      &nbsp; {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  )
}

export default FollowUserButton