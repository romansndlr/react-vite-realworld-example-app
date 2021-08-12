import React from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../hooks'

const Article = ({ article, filters }) => {
  const queryClient = useQueryClient()
  const queryKey = ['/articles', filters]
  const { slug, favorited } = article
  const { isAuth } = useAuth()

  const favorite = useMutation(() => axios[favorited ? 'delete' : 'post'](`/articles/${article.slug}/favorite`), {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticles = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ articles, articlesCount }) => ({
        articlesCount,
        articles: articles.map((article) => {
          if (slug !== article.slug) return article
          return {
            ...article,
            favorited: !article.favorited,
            favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
          }
        }),
      }))

      return { previousArticles }
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticles)
    },

    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  return (
    <div className="article-preview" key={article.slug}>
      <div className="article-meta">
        <a>
          <img src={article.author?.image} />
        </a>
        <div className="info">
          <a className="author">{article.author.username}</a>
          <span className="date">{article.createdAt}</span>
        </div>
        {isAuth && (
          <button
            onClick={() => favorite.mutate()}
            type="button"
            className={classNames('btn btn-sm pull-xs-right', {
              'btn-outline-primary': !article.favorited,
              'btn-primary': article.favorited,
            })}
            disabled={false}
          >
            <i className="ion-heart" />
            &nbsp; {article.favoritesCount}
          </button>
        )}
      </div>
      <a className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  )
}

export default Article
