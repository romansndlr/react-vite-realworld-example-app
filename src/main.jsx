import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient= new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client= {queryClient}>
      <App />
      {process.env.NODE_ENV=== "development"&& <ReactQueryDevtools initialIsOpen={false}/>}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
