import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'

axios.defaults.baseURL= "http://conduit.productionready.io/api/"

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params : queryKey[1] });
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client= {queryClient}>
      <App />
      {process.env.NODE_ENV=== "development"&& <ReactQueryDevtools initialIsOpen={false} 
      containerElement="div"/>}

    </QueryClientProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
)
