import React from 'react'
import { useQuery } from 'react-query'

function PopularTags({ onClick }) {
  const { data, isFetching } = useQuery('/tags', {
    placeholderData: {
      tags: [],
    },
  })

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      {isFetching && <div>Loading tags...</div>}
      {data?.tags.map((tag) => (
        <a key={tag} onClick={() => onClick(tag)} href="#" className="tag-pill tag-default">
          {tag}
        </a>
      ))}
    </div>
  )
}

export default PopularTags
