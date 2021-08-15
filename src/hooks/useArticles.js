import { useQuery } from 'react-query'
import { Article } from '../models'

function useArticles({ offset, tag, limit }) {
  const { data, ...query } = useQuery(['/articles', { offset, tag, limit }], {
    placeholderData: {
      articles: [],
      articlesCount: 0,
    },
    keepPreviousData: true,
  })

  return {
    data: {
      articles: data.articles.map((article) => new Article(article)),
      articlesCount: data.articlesCount,
    },
    ...query,
  }
}

export default useArticles
