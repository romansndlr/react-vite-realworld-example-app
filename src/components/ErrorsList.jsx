import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash-es'
import React from 'react'

function ErrorsList() {
  const { errors } = useFormikContext()

  return (
    <ul className="error-messages">
      {!isEmpty(errors) &&
        Object.entries(errors).flatMap(([key, values]) =>
          // @ts-ignore
          values.map((value) => (
            <li>
              {key} {value}
            </li>
          ))
        )}
    </ul>
  )
}

export default ErrorsList
