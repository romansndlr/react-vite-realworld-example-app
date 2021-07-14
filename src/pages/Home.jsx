// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import React from 'react'

function Home() {
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
                    className="nav-link" // Add active when feed
                  >
                    Your Feed
                  </button>
                </li>
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
            <div className="article-preview">
              <div className="article-meta">
                <a>
                  <img src={faker.image.avatar()} />
                </a>
                <div className="info">
                  <a className="author">{faker.internet.userName()}</a>
                  <span className="date">{new Date(faker.date.past()).toDateString()}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary" // Change to btn-primary if favorited
                  disabled={false}
                >
                  <i className="ion-heart" />
                  &nbsp; {faker.datatype.number()}
                </button>
              </div>
              <a className="preview-link">
                <h1>{faker.lorem.sentence()}</h1>
                <p>{faker.lorem.paragraph()}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">{faker.lorem.word()}</li>
                </ul>
              </a>
            </div>
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
