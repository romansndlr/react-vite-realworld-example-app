import { useQuery } from 'react-query'
import { Article } from '../models'

function useArticle(slug) {
  const { data, ...query } = useQuery(`/articles/${slug}`, {
    placeholderData: {
      article: {}
    }
  })

  return {
    data: {
      article: new Article(data.article)
    },
    ...query
  }
}

export default useArticle

