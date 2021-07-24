// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react'
import classNames from 'classnames'
import { ArticlePreview, PopularTags } from '../components'
import { useArticles } from '../hooks'

const DEFAULT_LIMIT = 10

function Home() {
  const [offset, setOffset] = useState()
  const [activeTag, setActiveTag] = useState()
  const filters = { offset, tag: activeTag, limit: DEFAULT_LIMIT }
  const { data, isFetching } = useArticles(filters)


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
                    type='button'
                    className={classNames('nav-link', { 'active': !activeTag })}
                    onClick={() => {
                      setActiveTag()
                    }}>
                    Global Feed
                  </button>
                </li>
                {activeTag && (
                  <li className='nav-item'>
                    <a className='nav-link active'># {activeTag}</a>
                  </li>
                )}
              </ul>
            </div>

            {isFetching && <div className='article-preview'>Loading Articles..</div>}
            {data.articles.map((article) =>
              <ArticlePreview article={article} filters={filters} key={article.slug} />
            )}

            <nav>
              <ul className='pagination'>
                {Array.from({ length: data.articlesCount / DEFAULT_LIMIT }, (element, i) => (
                  <li className={classNames('page-item', { 'active': offset === i })} key={i}>
                    <button type='button' className='page-link' onClick={() => setOffset(i)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
          <div className='col-md-3'>
            <PopularTags onClick={setActiveTag} activeTag={activeTag} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
