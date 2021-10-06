import axios from 'axios'
import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useArticle(article) {
  const { data, ...query } = useQuery(
    ['articles', article.slug],
    async () => {
      const { data } = await axios.get(`/articles/${article.slug}`)

      return data
    },
    {
      initialData: {
        article,
      },
    }
  )
  
  return {
    data: new ArticleModel(data?.article),
    ...query,
  }
}

export default useArticle
