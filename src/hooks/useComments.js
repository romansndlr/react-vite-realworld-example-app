import axios from 'axios'
import { useQuery } from 'react-query'
import { CommentModel } from '../models'

function useComments(article) {
  const { data, ...query } = useQuery(
    [`comments`, article.slug],
    async () => {
      const { data } = await axios.get(`/articles/${article.slug}/comments`)
      return data
    },
    {
      placeholderData: {
        comments: [],
      },
    }
  )
  console.log(data)
  return {
    data: {
      comments: data.comments.map((comment) => new CommentModel(comment)),
    },
    ...query,
  }
}

export default useComments

/* import axios from 'axios'
import { useQuery } from 'react-query'
import { ArticleModel } from '../models'

function useComments({ offset, tag, limit, feed }) {
  const { data, ...query } = useQuery(
    [`comments`, { offset, tag, limit, feed }],
    async () => {
      const { data } = await axios.post(`/articles${feed ? '/feed' : ''}`, { params: { offset, tag, limit } })
      return data
    },
    {
      placeholderData: {
        articles: [],
        articlesCount: 0,
      },
      keepPreviousData: true,
    }
  )

  return {
    data: {
      articles: data.articles.map((article) => new ArticleModel(article)),
      articlesCount: data.articlesCount,
    },
    ...query,
  }
}

export default useComments
 */
