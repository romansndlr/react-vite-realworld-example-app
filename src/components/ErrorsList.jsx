import React from 'react'
import { isEmpty } from 'lodash-es'
import { useFormikContext } from 'formik'

function ErrorsList() {
  const { errors } = useFormikContext()

  return (
    <ul className='error-messages'>
      {!isEmpty(errors) &&
      Object.entries(errors).flatMap(([key, values]) =>
        values.map((value) => (
            <li key={key}>
              {key} {value}
            </li>
          )
        ))
      }
    </ul>
  )
}

export default ErrorsList