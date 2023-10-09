import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, setToken } from '../util/index';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", token);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Token', 'Article'],
  endpoints: (builder) => ({
    generateToken: builder.mutation({
      query: () => 'generate-token',
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setToken(data.token);
        } catch (err) {
          console.log(err)
        }
      },
    }),
    getLatestArticle: builder.query({
      query: () => 'latest-article',
      providesTags: ['Article']
    }),
  }),
});

export const { useGenerateTokenMutation, useGetLatestArticleQuery } = appApi;
