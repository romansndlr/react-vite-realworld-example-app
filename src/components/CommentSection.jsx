import React from 'react'

import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth, useComments } from '../hooks'
import { Comment } from '../components'

function CommentSection({ article }) {
  const authUser = useAuth()
  const comments = useComments(article)

  const queryClient = useQueryClient()
  const commentMutation = useMutation((body) =>
    axios.post(`/articles/${article.slug}/comments`, { comment: { body: body } })
  )

  const createComment = async (event) => {
    event.preventDefault()
    const commentText = event.target.body.value

    await commentMutation.mutateAsync(commentText)

    queryClient.invalidateQueries(['articles', article.slug, 'comments'])

    event.target.body.value = ''
  }

  console.log(comments)
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {authUser && (
        <form className="card comment-form" onSubmit={createComment}>
          <div className="card-block">
            <textarea name="body" required className="form-control" placeholder="Write a comment..." rows={3} />
          </div>
          <div className="card-footer">
            <img
              src={
                // @ts-ignore
                authUser.image
              }
              className="comment-author-img"
            />
            <button disabled={false} type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      )}
      {comments?.comments?.map((comment) => (
        <Comment comment={comment} slug={article.slug} key={comment.id} />
      ))}
    </div>
  )
}

export default CommentSection
