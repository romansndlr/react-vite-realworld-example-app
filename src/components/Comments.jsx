import React from 'react'
import faker from 'faker'
import { useAuth, useComments } from '../hooks'
import { useMutation } from 'react-query'
import axios from 'axios'

function Comments(props) {
  const { article } = props
  const { authUser } = useAuth()
  const [newComment, setNewComment] = React.useState('')

  const addNewComment = useMutation(
    () =>
      axios.post(`/articles/${article.slug}/comments`, {
        comment: {
          body: newComment,
        },
      }) /*  {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ article }) => ({
        article: {
          ...article,
          favorited: !article.favorited,
          favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
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
  } */
  )

  const comments = useComments(article)

  const handleNewComment = (e) => {
    e.preventDefault()
    // get the new comment text
    const commentBody = newComment
    console.log(commentBody)

    // send it to the api
    addNewComment.mutate()
    // optimistik update
    // if success: get & show real data after reciving from the server
  }

  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <form className="card comment-form">
            <div className="card-block">
              <textarea
                required
                className="form-control"
                placeholder="Write a comment..."
                rows={3}
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value)
                }}
              />
            </div>
            <div className="card-footer">
              <img src={authUser.image} className="comment-author-img" />
              <button
                disabled={false}
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={(e) => handleNewComment(e)}
              >
                Post Comment
              </button>
            </div>
          </form>

          {comments.data.comments.map((comment) => (
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
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Comments
