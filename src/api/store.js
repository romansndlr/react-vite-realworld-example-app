import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
