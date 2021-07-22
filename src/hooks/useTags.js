import { useQuery } from 'react-query'

function useTags() {
  return useQuery('/tags', {
    placeholderData: {
      data: {
        tags: [],
      },
    },
  })
}

export default useTags
