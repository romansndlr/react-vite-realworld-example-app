// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import React from 'react'
import { useState } from 'react'
import { useQueryClient, useQuery } from 'react-query'
import axios from 'axios'
import classNames from 'classnames'

function Home() {
  const PAGE_LIMIT = 5
  const [offset, setOffset] = useState(0)
  const [selectedTag, setSelectedTag] = useState(null)
  const queryClient = useQueryClient()
  let params = {
    offset: offset * PAGE_LIMIT,
    limit: PAGE_LIMIT
  }

  if (selectedTag) {
    params = Object.assign(params, { tag: selectedTag })
  }
  if (selectedTag) {
    Object.assign(params, {})
  }
  const articlesQuery = useQuery(`get-articles-list-${offset}-${selectedTag}`, () => axios.get('https://conduit.productionready.io/api/articles', {
    params
  }), {
    placeholderData: {
      data: {
        articles: [],
        articlesCount: 0
      }
    }
  })

  const tagsQuery = useQuery('get-tags-list', () => axios.get('https://conduit.productionready.io/api/tags'), {
    placeholderData: {
      data: {
        tags: []
      }
    }
  })
  const pages = articlesQuery?.data?.data?.articlesCount / PAGE_LIMIT
  const articles = articlesQuery?.data?.data?.articles
  const tags = tagsQuery?.data?.data?.tags

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <button
                    onClick={()=>{setSelectedTag(null)}}
                    type='button'
                    className={classNames('nav-link',{'active':!selectedTag})} // Add active if not feed and not tag
                  >
                    Global Feed
                  </button>
                </li>
                <li className='nav-item'>
                  {selectedTag && <a className='nav-link active'># {selectedTag}</a>}
                </li>
              </ul>
            </div>
            {articles.map((article, idx) => {
              return <React.Fragment key={idx}>
                <div className='article-preview'>
                  <div className='article-meta'>
                    <a>
                      <img src={article.author.image} />
                    </a>
                    <div className='info'>
                      <a className='author'>{article.author.username}</a>
                      <span className='date'>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      type='button'
                      className={classNames('btn btn-sm ',{'btn-outline-primary':!article.favorited, 'btn-primary':article.favorited})} // Change to btn-primary if favorited
                      disabled={false}
                    >
                      <i className='ion-heart' />
                      &nbsp; {article.favoritesCount}
                    </button>
                  </div>
                  <a className='preview-link'>
                    <h1>{article.title}</h1>
                    <p>{article.body}</p>
                    <span>Read more...</span>
                    <ul className='tag-list'>
                      {article.tagList.map((tag, idx) => {
                        return <li key={idx} className='tag-default tag-pill tag-outline'>{tag}</li>
                      })}

                    </ul>
                  </a>
                </div>
              </React.Fragment>
            })}

            <nav>

              <ul className='pagination'>
                {Array(pages).fill(0).map((_, i) => i + 1)
                  .map((page) => {
                    return <li onClick={() => {
                      setOffset(page - 1)
                    }} className='page-item'>
                      <button type='button' className='page-link'>
                        {page}
                      </button>
                    </li>
                  })}


              </ul>
            </nav>
          </div>
          <div className='col-md-3'>
            {tags.map((tag, idx) => {
              return <React.Fragment key={idx}>
                <a href='#' onClick={() => {
                  setSelectedTag(tag)
                }} className='tag-pill tag-default'>
                  {tag}
                </a>
              </React.Fragment>
            })}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
