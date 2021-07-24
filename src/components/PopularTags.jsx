import React from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'

function PopularTags({ onClick, activeTag }) {
  const { data, isFetching } = useQuery('/tags', {
    placeholderData: {
      tags: []
    }
  })
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>
      {isFetching && <div>Loading Tags..</div>}
      { data?.tags.map((tag) => (
            <a href="#" onClick={() => onClick(tag)} className={classNames('tag-pill tag-default', { 'tag-primary': tag === activeTag })} key={tag}>
              {tag}
            </a>
          )
        )
      }
    </div>
  )
}

export default PopularTags