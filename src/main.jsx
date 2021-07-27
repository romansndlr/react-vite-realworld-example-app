import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} containerElement="div" />}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
