import axios from 'axios'
import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useArticles({ offset, tag, limit, feed }) {
  const { data, ...query } = useQuery(
    [`articles`, { offset, tag, limit, feed }],
    async () => {
      const { data } = await axios.get(`/articles${feed ? '/feed' : ''}`, { params: { offset, tag, limit } })
      return data
    },
    {
      placeholderData: {
        articles: [],
        articlesCount: 0
      },
      keepPreviousData: true
    })

  return {
    data: {
      articles: data.articles.map((article) => new ArticleModel(article)),
      articlesCount: data.articlesCount
    },
    ...query
  }
}

export default useArticles
