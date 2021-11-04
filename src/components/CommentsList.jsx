import axios from 'axios'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '../hooks'

function CommentsList({ slug }) {
  const { authUser } = useAuth()
  const queryClient = useQueryClient()

  const queryKey = ['articles', slug, 'comments']

  const deleteCommentMutation = useMutation(
    async (commentId) => {
      await axios.delete(`/articles/${slug}/comments/${commentId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey)
      },
    }
  )

  const { data: comments, isFetching } = useQuery(
    queryKey,
    async () => {
      const { data } = await axios.get(`/articles/${slug}/comments`)

      return data.comments
    },
    {
      enabled: Boolean(slug),
      placeholderData: [],
    }
  )

  return comments.map((comment) => (
    <div>
      <div className="card" key={comment.id}>
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a className="comment-author">
            <img src={comment.author.image} className="comment-author-img" />
          </a>
          &nbsp;
          <a className="comment-author">{comment.author.username}</a>
          <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
          {authUser.username === comment.author.username && (
            <span
              className="mod-options"
              onClick={() => {
                if (deleteCommentMutation.isLoading) {
                  return
                }

                deleteCommentMutation.mutate(comment.id)
              }}
            >
              <i className="ion-trash-a" />
            </span>
          )}
        </div>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  ))
}

export default CommentsList
