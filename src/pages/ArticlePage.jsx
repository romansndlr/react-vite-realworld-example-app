import React from 'react'
import faker from 'faker'
import { useParams } from 'react-router-dom'
import { useArticle, useAuth } from '../hooks'
import { ArticleMeta } from '../components'

function ArticlePage() {
  const { slug } = useParams()
  const { data: article } = useArticle({ slug })
  const { authUser } = useAuth()

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <p>{article.body}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea required className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src={authUser.image} className="comment-author-img" />
                <button disabled={false} type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
            <div className="card">
              <div className="card-block">
                <p className="card-text">{faker.lorem.paragraph()}</p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img src={faker.image.avatar()} className="comment-author-img" />
                </a>
                &nbsp;
                <a className="comment-author">{faker.internet.userName()}</a>
                <span className="date-posted">{new Date(faker.date.past()).toDateString()}</span>
                <span className="mod-options">
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
