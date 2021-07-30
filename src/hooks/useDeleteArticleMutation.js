import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

function useDeleteArticleMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { slug } = useParams()

  return useMutation(() => axios.delete(`/articles/${slug}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('/articles')

      navigate('/')
    },
  })
}

export default useDeleteArticleMutation
