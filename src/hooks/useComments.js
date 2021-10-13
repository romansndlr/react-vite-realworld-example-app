import axios from 'axios'
import { useQuery } from 'react-query'
import { ArticleModel } from '../models'
import CommentModel from '../models/CommentModel'

function useComments(articleSlug) {
  const { data, ...query } = useQuery(`/comments/${articleSlug}`,
    async () => {
      const { data } = await axios.get(`/articles/${articleSlug}/comments`)
      return data
    },
    {
      placeholderData: {
        comments: [],
        
      },
  })

  return {
    data: {
      comments: data.comments.map((comment) => new CommentModel(comment)), 
    },
    ...query
  }
}

export default useComments
