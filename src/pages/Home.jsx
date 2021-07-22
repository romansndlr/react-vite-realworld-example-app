// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import classNames from 'classnames'
import React from 'react'
import { useQuery } from 'react-query'
import { Article, PopularTags } from '../components'
import { useArticles } from '../hooks'

const DEFAULT_LIMIT = 10

function Home() {
  const [filters, setFilters] = React.useState({offset:0, limit:DEFAULT_LIMIT, tag: null})  
  const {data, isFetching} = useArticles({ filters })
  const articles = data?.articles
  const articlesCount = data?.articlesCount

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    onClick={() => setFilters((prevFilters) => ({...prevFilters, tag:null}))}
                    type="button"
                    className={classNames('nav-link', { active: !filters?.tag })}
                  >
                    Global Feed
                  </button>
                </li>
                {filters.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters.tag}</a>
                  </li>
                )}
              </ul>
            </div>

            {articles?.map((article) => (
              <Article key={article.slug} article={article} filters={filters} />
            ))}
            {isFetching && <div className="article-preview">Loading articles...</div>}
            <nav>
              <ul className="pagination">
                {Array.from({ length: articlesCount / DEFAULT_LIMIT }, (_, index) => (
                  <li  key={index} className={classNames('page-item', { active: index === filters.offset / DEFAULT_LIMIT })}>
                    <button type="button" className="page-link" onClick={() => setFilters((prevFilters) => ({...prevFilters, offset: index * DEFAULT_LIMIT}))}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-md-3">
            <PopularTags onClick={setFilters}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
