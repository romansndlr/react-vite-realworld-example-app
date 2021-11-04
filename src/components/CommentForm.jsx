import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useAuth } from '../hooks'

function CommentForm({ slug }) {
  const queryClient = useQueryClient()
  const { authUser } = useAuth()

  async function handleSubmit({ body }, { resetForm }) {
    try {
      await axios.post(`/articles/${slug}/comments`, {
        comment: {
          body,
        },
      })

      queryClient.invalidateQueries(['articles', slug, 'comments'])

      resetForm()
    } catch (error) {
      window.alert('Something went wrong...')
    }
  }

  return (
    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="card comment-form">
          <div className="card-block">
            <Field
              as="textarea"
              name="body"
              disabled={isSubmitting}
              required
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="card-footer">
            <img src={authUser.image} className="comment-author-img" />
            <button disabled={isSubmitting} type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CommentForm
