import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useAuth } from '../hooks'
import axios from 'axios'

function SettingsPage() {
  const { authUser } = useAuth()
  console.log(authUser)
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <Formik
              initialValues={{
                image: authUser.image,
                username: authUser.username,
                bio: authUser.bio,
                email: authUser.email
              }}
              onSubmit={async (values) => {
                console.log(values)
                await axios.put('/user', { user: values })

              }}

            >
              <Form>
                <fieldset>
                  <fieldset className='form-group'>
                    <Field className='form-control' type='text' placeholder='URL of profile picture' name='image'
                           id='image' />
                  </fieldset>
                  <fieldset className='form-group'>
                    <Field className='form-control form-control-lg' type='text' placeholder='Your Name' name='username'
                           id='username' />
                  </fieldset>
                  <fieldset className='form-group'>
                    <Field
                      as='textarea'
                      className='form-control form-control-lg'
                      rows={8}
                      placeholder='Short bio about you'
                      name='bio'
                    ></Field>
                  </fieldset>
                  <fieldset className='form-group'>
                    <Field className='form-control form-control-lg' type='text' placeholder='Email' name='email' />
                  </fieldset>
                  <fieldset className='form-group'>
                    <input className='form-control form-control-lg' type='password' placeholder='Password'
                           name='password' />
                  </fieldset>
                  <button className='btn btn-lg btn-primary pull-xs-right'>Update Settings</button>
                </fieldset>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
