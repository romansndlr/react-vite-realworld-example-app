import classNames from 'classnames'
import React from 'react'
import { useFavoriteMutation } from '../hooks'

function Article({ article, filters }) {
    const {slug} = article
    const favorited = useFavoriteMutation({slug, filters})

  return (
    <div className="article-preview" key={article?.slug}>
      <div className="article-meta">
        <a>
          <img src={article?.author?.image} />
        </a>
        <div className="info">
          <a className="author">{article?.author?.username}</a>
          <span className="date">{article?.createdAt}</span>
        </div>
        <button
          type="button"
          onClick = {() => {favorited.mutate()}}
          className={classNames('btn btn-sm pull-xs-right', {
            'btn-outline-primary': !article?.favorited,
            'btn-primary': article?.favorited,
          })}
          disabled={false}
        >
          <i className="ion-heart" />
          &nbsp; {article?.favoritesCount}
        </button>
      </div>
      <a className="preview-link">
        <h1>{article?.title}</h1>
        <p>{article?.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article?.tagList.map((tag) => {
            return <li key={tag} className="tag-default tag-pill tag-outline">{tag}</li>
          })}
        </ul>
      </a>
    </div>
  )
}

export default Article
