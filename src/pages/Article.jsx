import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import ConduitAPI from '../services/conduit_api'

function Article() {
  const { articleId } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    [`article-${articleId}`, articleId],
    () => ConduitAPI.get_article(articleId),
    {placeholderData: {
        data: {
          article: {
            author: "Author"
          }
        }
      }
    })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const {article} = data.data;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a>
              <img src={article.author.image} />
            </a>
            <div className="info">
              <a className="author">{article.author.username}</a>
              <span className="date">{new Date(article.updatedAt).toDateString()}</span>
            </div>
            <span>
              <a className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit" /> Edit Article
              </a>
              &nbsp;&nbsp;
              <button disabled={false} type="button" className="btn btn-outline-danger btn-sm">
                <i className="ion-trash-a" /> Delete Article
              </button>
            </span>
            <button
              disabled={false}
              type="button"
              className="btn btn-sm action-btn btn-outline-secondary " // Change to btn-secondary if following
            >
              <i className="ion-plus-round" />
              &nbsp; Follow {article.author.username} {/* Change to Unfollow if following */}
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
              disabled={false}
            >
              <i className="ion-heart" />
              &nbsp; Favorite Article <span className="counter">({article.favoritesCount})</span>{' '}
              {/* Change to Unfavorite if favorited */}
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a>
              <img src={article.author.image} />
            </a>
            <div className="info">
              <a className="author">{article.author.username}</a>
              <span className="date">{new Date(article.updatedAt).toDateString()}</span>
            </div>
            <span>
              <a className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit" /> Edit Article
              </a>
              &nbsp;&nbsp;
              <button disabled={false} type="button" className="btn btn-outline-danger btn-sm">
                <i className="ion-trash-a" /> Delete Article
              </button>
            </span>
            <button
              disabled={false}
              type="button"
              className="btn btn-sm action-btn btn-outline-secondary " // Change to btn-secondary if following
            >
              <i className="ion-plus-round" />
              &nbsp; Follow {article.author.username} {/* Change to Unfollow if following */}
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
              disabled={false}
            >
              <i className="ion-heart" />
              &nbsp; Favorite Article <span className="counter">({article.favoritesCount})</span>{' '}
              {/* Change to Unfavorite if favorited */}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea required className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src={faker.image.avatar()} className="comment-author-img" />
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

export default Article
