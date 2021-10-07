import axios from 'axios'
import { useQuery } from 'react-query'

function useComments(article) {
  const { data } = useQuery(['articles', article.slug, 'comments'], async () => {
    const { data } = await axios.get(`/articles/${article.slug}/comments`)
    return data
  })

  return data
}

export default useComments
