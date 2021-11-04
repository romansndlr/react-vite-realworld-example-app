import axios from 'axios'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ArticleModel } from '../models'

function useArticle(article) {
  const params = useParams()

  const slug = article?.slug || params.slug

  const { data, ...query } = useQuery(
    [`articles`, slug],
    async () => {
      const { data } = await axios.get(`/articles/${slug}`)
      return data
    },
    {
      initialData: !isEmpty(article)
        ? {
            article,
          }
        : undefined,
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
