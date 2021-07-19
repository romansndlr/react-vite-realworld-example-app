// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const DEFAULT_LIMIT = 10
function Home() {
  const [offset, setOffset] = React.useState(0)
  const [activeTag, setActiveTag] = React.useState(null)
  const tagsQuery = useQuery("get-tags", ()=> axios.get("https://conduit.productionready.io/api/tags"),
  {

    placeholderData: {
      data: {
        tags: []
      }
    },

  }
  )

  const articlesQuery = useQuery(['get-articles', { offset, activeTag }], () => axios.get('https://conduit.productionready.io/api/articles', {
    params: {
      limit: DEFAULT_LIMIT,
      offset,
      tag: activeTag
    }
  }),
  {

    placeholderData: {
      data: {
        articles: [],
        articlesCount: 0
      }
    },

  })
  const articles = articlesQuery?.data?.data?.articles
  const articlesCount = articlesQuery?.data?.data?.articlesCount
  const tags = tagsQuery?.data?.data?.tags


  
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
                    type="button"
                    onClick={()=> setActiveTag(null)}
                    className={classNames("nav-link", {active: !activeTag})}
                  >
                    Global Feed
                  </button>
                </li>
                <li className="nav-item">
                 {activeTag && <a className="nav-link active"># {activeTag}</a>}
                </li>
              </ul>
            </div>
            {articlesQuery.isFetching && <div className="article-preview">Loading articles..</div>}
            {(articles?.length === 0 && articlesQuery.isFetched) && <div className="article-preview">No articles to show... Wanna be the first to post?</div>}
            {articles?.map((article) => { return (
              
            <div className="article-preview">
              
              <div className="article-meta">
                <a>
                  <img src={article?.author?.image} />
                </a>
                <div className="info">
                  <a className="author">{article?.author?.username}</a>
                  <span className="date">{new Date(article?.createdAt).toDateString()}</span>
                </div>
                <button
                  type="button"
                  className={classNames("btn btn-sm", {"btn-outline-primary": !article.favorited })} 
                  
                  disabled={false}
                >
                  <i className="ion-heart" />
                  &nbsp; {article?.favoritesCount}
                </button>
              </div>
              <a className="preview-link">
                <h1>{article?.title}</h1>
                <p>{article?.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  {article?.tagList?.map((tag) => { 
                    return <li className="tag-default tag-pill tag-outline">{tag}</li>})}
                </ul>
              </a>
            </div>
            )})}
            <nav>
              <ul className="pagination">
                {Array.from({ length: articlesCount / DEFAULT_LIMIT}, (_, index) => { return ( 
                <li className={classNames("page-item", {active: index === offset / DEFAULT_LIMIT})}>
                  <button onClick={()=> setOffset(index * DEFAULT_LIMIT)} type="button" className="page-link">
                    {index+1}
                  </button>
                </li>
                ) })}
               
              </ul>
            </nav>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
      
            {tags?.map((tag) => { return (
              <a onClick={()=> setActiveTag(tag)} href="#" className="tag-pill tag-default">
              {tag}
            </a>
            )})}
            </div>
            {tagsQuery.isFetching && <div>Loading Tags...</div>}
            {(tags?.length === 0 && tagsQuery.isFetched) && <div>No tags are here... yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
