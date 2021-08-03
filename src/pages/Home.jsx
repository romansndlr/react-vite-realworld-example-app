import React from 'react'
import classNames from 'classnames'
import { Article, PopularTags } from '../components'
import { useArticles } from '../hooks'

const DEFAULT_LIMIT = 10

function Home({ userLoggedIn }) {
  const [offset, setOffset] = React.useState(0)
  const [activeTag, setActiveTag] = React.useState(null)
  const filters = { limit: DEFAULT_LIMIT, offset, tag: activeTag }

  const { data, isFetching } = useArticles(filters)

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
                {/* Should be set to active by default if user is auth */}
                <li className="nav-item">
                  <button type="button" className="nav-link">
                    Your Feed
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setActiveTag(null)}
                    type="button"
                    className={classNames('nav-link', { active: !activeTag })}
                  >
                    Global Feed
                  </button>
                </li>
                {activeTag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {activeTag}</a>
                  </li>
                )}
              </ul>
            </div>
            {data.articles?.map((article) => (
              <Article article={article} filters={filters} />
            ))}
            {isFetching && <div className="article-preview">Loading articles...</div>}
            <nav>
              <ul className="pagination">
                {Array.from({ length: data.articlesCount / DEFAULT_LIMIT }, (_, index) => (
                  <li className={classNames('page-item', { active: index === offset / DEFAULT_LIMIT })}>
                    <button type="button" className="page-link" onClick={() => setOffset(index * DEFAULT_LIMIT)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-md-3">
            <PopularTags onClick={(tag) => setActiveTag(tag)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
