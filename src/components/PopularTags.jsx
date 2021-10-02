import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

function PopularTags({ onClick }) {
  const { data, isFetching } = useQuery('tags',
    async () => {
      const { data } = await axios.get(`/tags`)
      return data
    },
    {
    placeholderData: {
      tags: []
    }
  })

  return (
    <div className='sidebar' data-testid='popular-tags'>
      <p>Popular Tags</p>
      {isFetching && <div>Loading tags...</div>}
      {data?.tags && [...new Set(data.tags)].map((tag) => (
          <a
            key={tag}
            onClick={(e) => {
              e.preventDefault()
              onClick(tag)
            }}
            href=''
            className='tag-pill tag-default'
          >
            {tag}
          </a>
        )
      )}
    </div>
  )
}

export default PopularTags
