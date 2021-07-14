import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'

function Article() {
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{faker.lorem.sentence()}</h1>
          <div className="article-meta">
            <a>
              <img src={faker.image.avatar()} />
            </a>
            <div className="info">
              <a className="author">{faker.internet.userName()}</a>
              <span className="date">{new Date(faker.date.past()).toDateString()}</span>
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
              &nbsp; Follow {faker.internet.userName()} {/* Change to Unfollow if following */}
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
              disabled={false}
            >
              <i className="ion-heart" />
              &nbsp; Favorite Article <span className="counter">({faker.datatype.number()})</span>{' '}
              {/* Change to Unfavorite if favorited */}
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{faker.lorem.sentence()}</p>
            <p>{faker.lorem.paragraph()}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a>
              <img src={faker.image.avatar()} />
            </a>
            <div className="info">
              <a className="author">{faker.internet.userName()}</a>
              <span className="date">{new Date(faker.date.past()).toDateString()}</span>
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
              &nbsp; Follow {faker.internet.userName()} {/* Change to Unfollow if following */}
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
              disabled={false}
            >
              <i className="ion-heart" />
              &nbsp; Favorite Article <span className="counter">({faker.datatype.number()})</span>{' '}
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
