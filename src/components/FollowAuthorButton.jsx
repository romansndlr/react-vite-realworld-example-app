import React from 'react'
import classNames from 'classnames'
import { useMutation } from 'react-query'
import axios from 'axios'

function FollowAuthorButton({ author, mutationConfig }) {
  const follow = useMutation(
    () => axios[author.following ? 'delete' : 'post'](`/profiles/${author.username}/follow`),
    mutationConfig
  )

  return (
    <button
      disabled={follow.isLoading}
      aria-label='Follow Author'
      onClick={() => follow.mutate()}
      type='button'
      className={classNames('btn btn-sm action-btn', {
          'btn-secondary': author.following,
          'btn-outline-secondary': !author.following
        }
      )}
    >
      <i className={classNames({
        'ion-plus-round': !author.following,
        'ion-minus-round': author.following
      })} />
      &nbsp; {!author.following ? 'Follow' : 'Unfollow'} {author?.username}
    </button>
  )
}

export default FollowAuthorButton
