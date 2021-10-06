import React from 'react'
import { useAuth } from '../hooks'
import ArticleHeadline from './ArticleHeadline'
import FavoriteArticleButton from './FavoriteArticleButton'
import FollowingBtn from './FollowingBtn'

function ArticleMeta({ article }) {
  const { authUser } = useAuth()
  return (
    <div className="article-meta">
      <ArticleHeadline article={article} />
      <span>
        {authUser.username === article.author?.username ? (
          <>
            <a className="btn btn-outline-secondary btn-sm">
              <i className="ion-edit" /> Edit Article
            </a>
            &nbsp;&nbsp;
            <button disabled={false} type="button" className="btn btn-outline-danger btn-sm">
              <i className="ion-trash-a" /> Delete Article
            </button>
          </>
        ) : (
          <>
            <FollowingBtn article={article} />
            <FavoriteArticleButton article={article}>Favorite Article</FavoriteArticleButton>
          </>
        )}
      </span>
    </div>
  )
}

export default ArticleMeta
