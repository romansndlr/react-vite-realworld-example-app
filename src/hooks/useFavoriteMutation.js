import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

function useFavoriteMutation({ slug, filters }) {
  const queryClient = useQueryClient()
  const queryKey = ['/articles', filters]

  return useMutation(() => axios.post(`/articles/${slug}/favorite`), {
    // When mutate is called:
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryKey)

      // Snapshot the previous value
      const previousArticles = queryClient.getQueryData(queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, ({ articles, articlesCount }) => ({
        articlesCount,
        articles: articles.map((article) => {
          if (slug !== article.slug) return article

          return {
            ...article,
            favorited: !article.favorited,
            favoritesCount: !article.favorited ? article.favoritesCount + 1 : article.favoritesCount - 1,
          }
        }),
      }))

      // Return a context object with the snapshotted value
      return { previousArticles }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticles)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

export default useFavoriteMutation
