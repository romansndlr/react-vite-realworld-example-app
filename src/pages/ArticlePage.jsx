import React from 'react'
// import faker from 'faker'
import { useParams } from 'react-router-dom'
import { useArticle } from '../hooks'
import { ArticleMeta, Comments } from '../components'

function ArticlePage() {
  const { slug } = useParams()
  const { data: article } = useArticle({ slug })

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

        <Comments article={article} />
      </div>
    </div>
  )
}

export default ArticlePage
