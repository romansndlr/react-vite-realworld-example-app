import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import App from './App'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
