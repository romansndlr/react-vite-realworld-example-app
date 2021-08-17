import { useQuery } from 'react-query'
import { Article } from '../models'

function useArticle(article) {
  const { data, ...query } = useQuery(`/articles/${article.slug}`, {
    initialData: {
      article,
    },
  })

  return {
    data: new Article(data.article),
    ...query,
  }
}

export default useArticle
