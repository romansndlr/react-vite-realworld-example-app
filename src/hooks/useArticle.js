import axios from 'axios'
import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useArticle(slug, initialArticle) {
  const { data, ...query } = useQuery(
    [`articles`, slug],
    async () => {
      const { data } = await axios.get(`/articles/${slug}`)
      return data
    },
    {
      initialData: initialArticle ? {
        article: initialArticle,
      } : undefined,
      placeholderData: {
        article: {},
      },
    }
  )

  return {
    data: new ArticleModel(data.article),
    ...query,
  }
}

export default useArticle
