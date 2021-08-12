import { useQuery } from 'react-query'
import { Article } from '../models'

function useArticles({ offset, tag, limit, feed }) {
  const { data, ...query } = useQuery([`/articles${feed ? '/feed' : ''}`, { offset, tag, limit }], {
    placeholderData: {
      articles: [],
      articlesCount: 0,
    },
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
