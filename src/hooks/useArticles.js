import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useArticles({ offset, tag, limit, feed }) {
  const { data, ...query } = useQuery([`/articles${feed ? '/feed' : ''}`, { offset, tag, limit }], {
    placeholderData: {
      articles: [],
      articlesCount: 0,
    },
    keepPreviousData: true,
  })

  return {
    data: {
      articles: data.articles.map((article) => new ArticleModel(article)),
      articlesCount: data.articlesCount,
    },
    ...query,
  }
}

export default useArticles
