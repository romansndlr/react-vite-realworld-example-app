import classNames from 'classnames'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function FollowingBtn({ article }) {
  const queryClient = useQueryClient()
  const isFollowing = article.author.following
  const queryKey = `/articles/${article.slug}`
  const followHandler = useMutation(
    () => axios[isFollowing ? 'delete' : 'post'](`/profiles/${article.author.username}/follow`),
    {
      onMutate: async () => {
        // cancel other pending requests
        await queryClient.cancelQueries(queryKey)

        // take the CURRENT state, if we need to roll back the situation :I
        const rollbackState = queryClient.getQueryData(queryKey)

        // imitate the desired stated, as we gonna imlement optimistic update :O
        queryClient.setQueryData(queryKey, ({ article }) => ({
          article: {
            ...article,
            author: { ...article.author, following: !isFollowing },
          },
        }))

        return { rollbackState }
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(queryKey, context.rollbackState)
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey)
      },
    }
  )

  return (
    <button
      onClick={followHandler.mutate}
      disabled={false}
      type="button"
      className={classNames('btn', 'btn-sm', 'action-btn', 'btn-outline-secondary')} // Change to btn-secondary if following
    >
      <i className="ion-plus-round" />
      &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {article.author?.username}{' '}
    </button>
  )
}
