import React from 'react'
import faker from 'faker'
import { useParams } from 'react-router-dom'
import { useArticle, useAuth } from '../hooks'
import { ArticleMeta, CommentSection } from '../components'

function ArticlePage() {
  const { slug } = useParams()
  const { data: article } = useArticle({ slug })
  const { authUser } = useAuth()

  console.log(article)
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
          <CommentSection article={article}></CommentSection>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
