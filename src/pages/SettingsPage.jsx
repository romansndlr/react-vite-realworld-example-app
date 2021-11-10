import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useAuth } from '../hooks'
import { pick } from 'lodash'
import * as Yup from 'yup'

function SettingsPage() {
  const { authUser } = useAuth()

  const SettingSchema = Yup.object().shape({
    image: Yup.string().url(),
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    bio: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .matches(/[A-Za-z0-9]/, 'Use english and numbers'),
  })

  const handleSubmit = (values) => {}

  const errorMsg = (errors, touched, key_para) =>
    errors[key_para] && touched[key_para] ? <div>{errors[key_para]}</div> : null

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <Formik
              initialValues={{ ...pick(authUser, ['image', 'username', 'email', 'bio']), password: '' }}
              validationSchema={SettingSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <fieldset>
                    <fieldset className="form-group">
                      <Field name="image" className="form-control" type="text" placeholder="URL of profile picture" />
                      {errorMsg(errors, touched, 'image')}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="username"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                      />
                      {errorMsg(errors, touched, 'username')}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        as="textarea"
                        name="bio"
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                      ></Field>
                    </fieldset>
                    <fieldset className="form-group">
                      <Field name="email" className="form-control form-control-lg" type="text" placeholder="Email" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="pass"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                  </fieldset>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
