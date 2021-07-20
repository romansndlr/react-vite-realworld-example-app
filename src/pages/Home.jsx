// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import React from 'react'
import {useQueryClient, useQuery} from 'react-query'
import axios from 'axios'

function Home() {
  const queryClient = useQueryClient()
  const articlesQuery  = useQuery('get-articles-list', ()=>axios.get("https://conduit.productionready.io/api/articles"), {placeholderData:{
    data:{
      articles:[],
      articlesCount:0
    }
    }})
  const articles = articlesQuery?.data?.data?.articles

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
                    className="nav-link" // Add active if not feed and not tag
                  >
                    Global Feed
                  </button>
                </li>
                <li className="nav-item">
                  <a className="nav-link active"># {faker.lorem.word()}</a>
                </li>
              </ul>
            </div>
            {articles.map((article)=>{
              return <React.Fragment>
                <div className="article-preview">
                  <div className="article-meta">
                    <a>
                      <img src={article.author.image} />
                    </a>
                    <div className="info">
                      <a className="author">{article.author.username}</a>
                      <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
                      disabled={false}
                    >
                      <i className="ion-heart" />
                      &nbsp; {article.favoritesCount}
                    </button>
                  </div>
                  <a className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.body}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      <li className="tag-default tag-pill tag-outline">{faker.lorem.word()}</li>
                    </ul>
                  </a>
                </div>
              </React.Fragment>
            })}

            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button type="button" className="page-link">
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button type="button" className="page-link">
                    2
                  </button>
                </li>
                <li className="page-item active">
                  <button type="button" className="page-link">
                    3
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-3">
            <a href="#" className="tag-pill tag-default">
              {faker.lorem.word()}
            </a>
            <a href="#" className="tag-pill tag-default">
              {faker.lorem.word()}
            </a>
            <a href="#" className="tag-pill tag-default">
              {faker.lorem.word()}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
