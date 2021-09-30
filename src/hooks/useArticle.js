import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useArticle(article) {
  const { data, ...query } = useQuery(`/articles/${article.slug}`, {
    initialData: {
      article,
    },
  })

  return {
    data: new ArticleModel(data.article),
    ...query,
  }
}

export default useArticle
