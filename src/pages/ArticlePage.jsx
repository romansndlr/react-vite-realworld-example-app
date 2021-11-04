import React from 'react'
import { useArticle } from '../hooks'
import { ArticleMeta, CommentForm, CommentsList } from '../components'

function ArticlePage() {
  const { data: article } = useArticle()

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
            <CommentForm slug={article.slug} />
            {article.slug && <CommentsList slug={article.slug} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
