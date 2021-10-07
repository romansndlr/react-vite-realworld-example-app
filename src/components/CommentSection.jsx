import React from 'react'
import faker from 'faker'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth, useComments } from '../hooks'

function CommentSection({ article }) {
  const authUser = useAuth()
  const comments = useComments(article)

  function createComment(event) {
    event.preventDefault()
    const commentText = event.target
  }

  const queryClient = useQueryClient()

  const queryKey = `/articles/${article.slug}/comments`

  const comment = useMutation(() => axios.post(`/articles/${article.slug}/comments`), {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ comment }) => ({
        comment: {
          body: '',
        },
      }))

      return { previousArticle }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

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
      <div className="card">
        <div className="card-block">
          <p className="card-text">{faker.lorem.paragraph()}</p>
        </div>
        <div className="card-footer">
          <a className="comment-author">
            <img src={faker.image.avatar()} className="comment-author-img" />
          </a>
          &nbsp;
          <a className="comment-author">{faker.internet.userName()}</a>
          <span className="date-posted">{new Date(faker.date.past()).toDateString()}</span>
          <span className="mod-options">
            <i className="ion-trash-a" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
