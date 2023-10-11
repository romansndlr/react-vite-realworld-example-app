import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Article, Token'],
  endpoints: (builder) => ({
    getLatestArticle: builder.query({
      query: ({ token }) => ({
        method: 'GET',
        url: '/article/',
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Article'],
    }),
    getToken: builder.query({
      query: () => '/auth/',
      transformResponse: (response) => response.access,
      providesTags: ['Article'],
    }),
  }),
})

export const { useLazyGetLatestArticleQuery, useLazyGetTokenQuery } = apiSlice
