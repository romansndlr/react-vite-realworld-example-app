import { omit } from 'lodash-es'
import { useQuery } from 'react-query'

function useArticlesQuery({ filters }) {
  return useQuery([`/articles${filters.feed ? '/feed' : ''}`, { limit: 10, ...omit(filters, ['feed']) }], {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
    keepPreviousData: true,
  })
}

export default useArticlesQuery
