import axios from 'axios'
import { Field, Form, Formik } from 'formik'

import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { ErrorsList } from '../components'
import { useAuth } from '../hooks'

function Auth() {
  const isRegister = useMatch('/register') !== null
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handelSubmit({ username, email, password }, { setErrors }) {
    const payload = {
      email,
      password,
    }

    if (isRegister) {
      payload.username = username
    }

    try {
      const { data } = await axios.post(`/users${!isRegister ? '/login' : ''} `, { user: payload })

      login(data.user)

      navigate('/')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign {isRegister ? 'Up' : 'In'}</h1>
            <p className="text-xs-center">
              <a href="#">{!isRegister ? 'Need' : 'Have'} an account?</a>
            </p>
            <Formik initialValues={{ username: '', email: '', password: '' }} onSubmit={handelSubmit}>
              {({ isSubmitting }) => (
                <React.Fragment>
                  <ErrorsList />
                  <Form>
                    {isRegister && (
                      <fieldset className="form-group" disabled={isSubmitting}>
                        <Field
                          type="text"
                          name="username"
                          className="form-control form-control-lg"
                          placeholder="Your Name"
                        />
                      </fieldset>
                    )}

                    <fieldset className="form-group" disabled={isSubmitting}>
                      <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                    </fieldset>
                    <fieldset className="form-group" disabled={isSubmitting}>
                      <Field
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                    </fieldset>

                    <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary pull-xs-right">
                      Sign {isRegister ? 'Up' : 'In'}
                    </button>
                  </Form>
                </React.Fragment>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
