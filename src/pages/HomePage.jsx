import React from 'react'
import classNames from 'classnames'
import { ArticlePreview, PopularTags } from '../components'
import { useArticles, useAuth } from '../hooks'

const DEFAULT_LIMIT = 10

function HomePage() {
  const [offset, setOffset] = React.useState(0)
  const [activeTag, setActiveTag] = React.useState(null)
  const { isAuth } = useAuth()
  const [isFeed, setIsFeed] = React.useState(isAuth)
  const resolvedIsFeed = isFeed && !activeTag
  const filters = { limit: DEFAULT_LIMIT, offset, tag: activeTag, feed: resolvedIsFeed }

  const { data, isFetching } = useArticles(filters)

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">Shagsters</h1>
          <p>A place to share your Fleem.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle" data-testid="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/* Should be set to active by default if user is auth */}
                {isAuth && (
                  <li className="nav-item">
                    <button
                      type="button"
                      onClick={() => setIsFeed(true)}
                      className={classNames('nav-link', { active: resolvedIsFeed })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    onClick={() => {
                      setActiveTag(null)
                      setIsFeed(false)
                    }}
                    type="button"
                    className={classNames('nav-link', { active: !activeTag && !isFeed })}
                  >
                    Global Feed
                  </button>
                </li>
                {activeTag && (
                  <li className="nav-item">
                    <button type="button" className="nav-link active">
                      # {activeTag}
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {data.articles?.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
            {isFetching && <div className="article-preview">Loading articles...</div>}
            <nav>
              <ul className="pagination">
                {Array.from({ length: data.articlesCount / DEFAULT_LIMIT }, (_, index) => (
                  <li key={index} className={classNames('page-item', { active: index === offset / DEFAULT_LIMIT })}>
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

export default HomePage
