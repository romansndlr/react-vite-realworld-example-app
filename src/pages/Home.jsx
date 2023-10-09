import classNames from 'classnames'
import React, {useState} from 'react'
import {Button} from 'antd';
import { ArticleList, LatestArticleDrawer, PopularTags } from '../components'
import { useAuth } from '../hooks'

const initialFilters = { tag: '', offset: null, feed: false }

function Home() {
  const [open, setLatestArticleDrawer] = useState(false);
  const { isAuth } = useAuth()
  const [filters, setFilters] = React.useState({ ...initialFilters, feed: isAuth })

  React.useEffect(() => {
    setFilters({ ...initialFilters, feed: isAuth })
  }, [isAuth])

  function onTagClick(tag) {
    setFilters({ ...initialFilters, tag })
  }

  function toggleDrawer(){
    setLatestArticleDrawer(!open)
  }

  function onGlobalFeedClick() {
    setFilters(initialFilters)
  }

  function onFeedClick() {
    setFilters({ ...initialFilters, feed: true })
  }

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
                {isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={onFeedClick}
                      type="button"
                      className={classNames('nav-link', {
                        active: filters.feed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', {
                      active: !filters?.tag && !filters.feed,
                    })}
                    onClick={onGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters?.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList filters={filters} />
          </div>
          <div className="col-md-3">
            <div>
            <PopularTags onTagClick={onTagClick} />
            </div>
            <div className="mt-3">
                <Button type="primary" onClick={toggleDrawer}>Latest Article</Button>
            </div>
          </div>
        </div>
      </div>
      <LatestArticleDrawer isOpen={open} toggleDrawer={toggleDrawer} />
    </div>
  )
}

export default Home
