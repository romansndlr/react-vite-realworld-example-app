import React from 'react'
import { Link } from 'react-router-dom'
import { useArticle, useAuth } from '../hooks'
import ArticleHeadline from './ArticleHeadline'
import FavoriteArticleButton from './FavoriteArticleButton'

const ArticlePreview = ({ article }) => {
  const { isAuth } = useAuth()
  const { data } = useArticle(article.slug, article)

  return (
    <div className="article-preview" key={data.slug} data-testid="article-preview">
      <div className="article-meta" data-testid="article-meta">
        <ArticleHeadline article={data} />
        {isAuth && <FavoriteArticleButton article={data} className="pull-xs-right" />}
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{data.title}</h1>
        <p>{data.body}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {[...new Set(data.tagList)].map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
