import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { Field, Form, Formik } from 'formik'
import { useAuth, useComments } from '../hooks'

function ArticleComments({ article }) {
  const { authUser, isAuth } = useAuth()
  const { data } = useComments(article)
  const queryClient = useQueryClient()
  const queryKey = ['comments', article.slug]

  const mutation = useMutation(
    (newComment) => axios.post(`/articles/${article.slug}/comments`, {
      'comment': {
        'body': newComment
      }
    }), {
      onSettled: () => {
        queryClient.invalidateQueries(queryKey)
      }

    })


  const handleSubmit = async ({ comment }) => {
    mutation.mutate(comment)
  }

  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {isAuth ? (
          <Formik onSubmit={handleSubmit} initialValues={{ comment: '' }}>
            {({ isSubmitting }) => (
              <Form className='card comment-form'>
                <div className='card-block'>
                  <Field as='textarea' name='comment' required className='form-control' placeholder='Write a comment...'
                         rows={3} />
                </div>
                <div className='card-footer'>
                  <img src={authUser.image} className='comment-author-img' alt={authUser.username}/>
                  <button disabled={isSubmitting} type='submit' className='btn btn-sm btn-primary'>
                    {isSubmitting ? 'Sending...' : 'Post Comment'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

        ) : (
          <p>You need to
            <NavLink to='/login' activeClassName='active' className='nav-link' end>
              &nbsp;Sign In&nbsp;
            </NavLink>
            or
            <NavLink to='/register' activeClassName='active' className='nav-link' end>
              &nbsp;Sign up&nbsp;
            </NavLink>
            to post a comment</p>

        )}

        {data?.comments && data.comments.slice(0).reverse().map((comment) => (
            <div className='card' key={comment.id}>
              <div className='card-block'>
                <p className='card-text'>{comment.body}</p>
              </div>
              <div className='card-footer'>
                <a className='comment-author'>
                  <img src={comment.author.image.avatar} className='comment-author-img' alt={comment.author.username}/>
                </a>
                &nbsp;
                <a className='comment-author'>{comment.author.username}</a>
                <span className='date-posted'>{comment.updatedAt}</span>
                <span className='mod-options'>
                  <i className='ion-trash-a' />
                </span>
              </div>
            </div>
          )
        )}


      </div>
    </div>
  )
}

export default ArticleComments