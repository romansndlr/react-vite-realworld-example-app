import React from 'react'
import { Link } from 'react-router-dom'

function ArticleHeadline({ article }) {
  return (
    <span>
      <Link to={`/profile/${article.author?.username}`}>
        <img src={article.author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author?.username}`} className="author">
          {article.author?.username}
        </Link>
        <span className="date">{article.createdAt}</span>
      </div>
    </span>
  )
}

export default ArticleHeadline
