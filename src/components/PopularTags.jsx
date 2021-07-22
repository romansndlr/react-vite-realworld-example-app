import React from 'react'
import { useTags } from '../hooks'

function PopularTags({ onClick }) {
  const { data, isFetching } = useTags()

  const tags = data?.tags

  return (
    <>
      <div className="sidebar">
        <p>Popular Tags</p>
        {isFetching && <div>Loading tags...</div>}
        {tags?.map((tag) => (
          <a
            key={tag}
            onClick={() =>
              onClick((prevFilters) => {
                return { ...prevFilters, tag: tag }
              })
            }
            href="#"
            className="tag-pill tag-default"
          >
            {tag}
          </a>
        ))}
      </div>
    </>
  )
}

export default PopularTags
