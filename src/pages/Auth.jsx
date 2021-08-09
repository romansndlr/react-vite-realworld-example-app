import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'

import axios from 'axios'
import { ErrorsList } from '../components'
import { useAuth } from '../hooks'

function Auth() {
  // Get the token from the API
  // Store in localStorage
  // Set authUser as globally available state
  // Redirect to home page
  const isRegister = useMatch('/register') !== null
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleSubmit = async ({ username, email, password }, { setErrors }) => {
    const payload = {
      email,
      password
    }

    if(isRegister) {
      payload.username = username
    }
    try {
      const { data } = await axios.post(`/users${!isRegister ? '/login': ''}`, { user: payload })
      login(data.user)
      navigate('/')
    } catch (error) {
      setErrors(error.response.data.errors)

    }
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign {isRegister ? 'Up' : 'In'}</h1>
            <p className='text-xs-center'>
              <a href='#'>{isRegister ? 'Have' : 'Need'} an account?</a>
            </p>
            <Formik initialValues={{ username: '', email: '', password: '' }} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <>
                  <ErrorsList/>
                  <Form>
                    {isRegister && (
                      <fieldset className='form-group'>
                        <Field type='text' name='username' className='form-control form-control-lg'
                               placeholder='Your Name' />
                      </fieldset>
                    )}

                    <fieldset className='form-group'>
                      <Field type='text' name='email' className='form-control form-control-lg' placeholder='Email' />
                    </fieldset>
                    <fieldset className='form-group'>
                      <Field
                        type='password'
                        name='password'
                        className='form-control form-control-lg'
                        placeholder='Password'
                      />
                    </fieldset>
                    {/* Disable button while submitting */}
                    <button type='submit' disabled={isSubmitting} className='btn btn-lg btn-primary pull-xs-right'>
                      Sign {isRegister ? 'Up' : 'In'}
                    </button>
                  </Form>
                </>
              )}

            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
