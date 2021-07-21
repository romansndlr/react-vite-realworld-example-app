// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ConduitAPI from '../services/conduit_api'

const PAGE_SIZE = 4

function Home() {
  const [offset, setOffset] = useState()
  const { data: articlesQueryData } = useQuery(
    ['articles', {
      offset, PAGE_SIZE
    }],
    () => ConduitAPI.get_articles(offset, PAGE_SIZE),
    {
      placeholderData: {
        data: {
          articles: [],
          articlesCount: 0
        }
      }
    }
  )
  const { data: tagsQueryData } = useQuery('tags', ConduitAPI.get_tags);
  const articlesCount = articlesQueryData?.data.articlesCount;
  const pagesLength = Math.round((articlesCount / PAGE_SIZE) - 1)
  const pages = articlesCount && articlesCount > 0 ? Array.from({length: pagesLength}, (element, index) => index + 1 ) : [];

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <button
                    type='button'
                    className='nav-link' // Add active if not feed and not tag
                  >
                    Global Feed
                  </button>
                </li>
                <li className='nav-item'>
                  <a className='nav-link active'># {faker.lorem.word()}</a>
                </li>
              </ul>
            </div>

            {articlesQueryData && articlesQueryData.data.articles.map((article) => (
              <div className='article-preview' key={article.slug}>
                <div className='article-meta'>
                  <a>
                    <img src={article.author.image} />
                  </a>
                  <div className='info'>
                    <a className='author'>{article.author.userName}</a>
                    <span className='date'>{new Date(article.updatedAt).toDateString()}</span>
                  </div>
                  <button
                    type='button'
                    className='btn btn-sm btn-outline-primary' // Change to btn-primary if favorited
                    disabled={false}
                  >
                    <i className='ion-heart' />
                    &nbsp; {article.favoritesCount}
                  </button>
                </div>
                <Link className='preview-link' to={`/article/${article.slug}`}>
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <ul className='tag-list'>
                    <li className='tag-default tag-pill tag-outline'>{faker.lorem.word()}</li>
                  </ul>
                </Link>
              </div>
            ))}


            <nav>
              <ul className='pagination'>
                // use class active
                <li className='page-item'>
                  {pages && pages.map((item, index) => (
                    <button type='button' className='page-link'>
                      {item}
                    </button>
                  ))}
                </li>
              </ul>
            </nav>

          </div>
          <div className='col-md-3'>
            {tagsQueryData && tagsQueryData.data.tags.map((tag, index) => (
                <a href='#' className='tag-pill tag-default' key={index}>
                  {tag}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
