import React from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useArticle, useAuth } from '../hooks'

const Article = ({ article }) => {
  const queryClient = useQueryClient()
  const queryKey = `/articles/${article.slug}`
  const { isAuth } = useAuth()
  const { data } = useArticle(article)

  const favorite = useMutation(() => axios[data.favorited ? 'delete' : 'post'](`/articles/${article.slug}/favorite`), {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ article }) => ({
        article: {
          ...article,
          favorited: !article.favorited,
          favoritesCount: data.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
        },
      }))

      return { previousArticle }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  return (
    <div className="article-preview" key={data.slug}>
      <div className="article-meta">
        <a>
          <img src={data.author?.image} />
        </a>
        <div className="info">
          <a className="author">{data.author.username}</a>
          <span className="date">{data.createdAt}</span>
        </div>
        {isAuth && (
          <button
            onClick={() => favorite.mutate()}
            type="button"
            className={classNames('btn btn-sm pull-xs-right', {
              'btn-outline-primary': !data.favorited,
              'btn-primary': data.favorited,
            })}
            disabled={false}
          >
            <i className="ion-heart" />
            &nbsp; {data.favoritesCount}
          </button>
        )}
      </div>
      <a className="preview-link">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {data.tagList.map((tag) => (
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
