import axios from 'axios'
import classNames from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useAuth } from '../hooks'

const UpdateUserSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  bio: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!'),
  image: Yup.string().url().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

function SettingsPage() {
  const { authUser, setAuthUser } = useAuth()

  async function handleSubmit(values) {
    const { data } = await axios.put('/user', {
      user: values,
    })

    setAuthUser(data.user)
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik
              validationSchema={UpdateUserSchema}
              onSubmit={handleSubmit}
              initialValues={{
                image: authUser.image,
                username: authUser.username,
                bio: authUser.bio,
                email: authUser.email,
                password: '',
              }}
              enableReinitialize
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <fieldset disabled={isSubmitting}>
                    <fieldset className={classNames('form-group', { warning: !!errors.image })}>
                      <Field name="image" className="form-control" type="text" placeholder="URL of profile picture" />
                      <ErrorMessage className="m-t-2 text-danger" name="image" />
                    </fieldset>
                    <fieldset className={classNames('form-group', { warning: !!errors.username })}>
                      <Field
                        className="form-control form-control-lg"
                        name="username"
                        type="text"
                        placeholder="Your Name"
                      />
                      <ErrorMessage className="m-t-2 text-danger" name="username" />
                    </fieldset>
                    <fieldset className={classNames('form-group', { warning: !!errors.bio })}>
                      <Field
                        as="textarea"
                        name="bio"
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                      />
                      <ErrorMessage className="m-t-2 text-danger" name="bio" />
                    </fieldset>
                    <fieldset className={classNames('form-group', { warning: !!errors.email })}>
                      <Field name="email" className="form-control form-control-lg" type="text" placeholder="Email" />
                      <ErrorMessage className="m-t-2 text-danger" name="email" />
                    </fieldset>
                    <fieldset className={classNames('form-group', { warning: !!errors.password })}>
                      <Field
                        name="password"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                      />
                      <ErrorMessage className="m-t-2 text-danger" name="password" />
                    </fieldset>
                    <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary pull-xs-right">
                      Update Settings
                    </button>
                  </fieldset>
                </Form>
              )}
            </Formik>
            <hr />
            <button type="button" className="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
