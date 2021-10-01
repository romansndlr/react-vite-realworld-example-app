import axios from 'axios'
import classNames from 'classnames'
import React from 'react'
import { useMutation } from 'react-query'

function FollowUserButton({ user, followMutationConfiguration, className }) {

  const followFunc = useMutation(
    () => axios[user.following ? 'delete' : 'post'](`/profiles/${user.username}/follow`),
    followMutationConfiguration
  )

  return (
    <button
      disabled={followFunc.isLoading}
      type='button'
      onClick={()=>followFunc.mutate()}
      className={classNames('btn btn-sm action-btn', {
        'btn-outline-secondary': !user.following,
        'btn-secondary': user.following
      })}
    >
      <i className='ion-plus-round' />
      &nbsp; {user.following ? 'UnFollow': 'Follow'} {user?.username} {/* Change to Unfollow if following */}
    </button>
  )
}

export default FollowUserButton
