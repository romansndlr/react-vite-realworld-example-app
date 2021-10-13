import axios from 'axios'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../hooks'

function Comment({ comment, slug }) {
  const authUser = useAuth()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation((id) => axios.delete(`/articles/${slug}/comments/${id}`))

  const deleteComment = async (commentId) => {
    await deleteMutation.mutateAsync(commentId)
    queryClient.invalidateQueries(['articles', slug, 'comments'])
  }

  return (
    <div className="card">
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
        <span className="mod-options">
          {authUser.authUser.id === parseInt(comment.author.id) && (
            <i className="ion-trash-a" onClick={() => deleteComment(comment.id)} />
          )}
        </span>
      </div>
    </div>
  )
}

export default Comment
