import React from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function Article({ article, filters }) {
  const [activeTag, setActiveTag] = React.useState(null)
  const queryClient = useQueryClient()
  const queryKey = ['/articles', filters]
  const { slug, favorited } = article

  const favorite = useMutation(() => axios[favorited ? 'delete' : 'post'](`/articles/${article.slug}/favorite`), {
    // When mutate is called:
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryKey)

      // Snapshot the previous value
      const previousArticles = queryClient.getQueryData(queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, ({ articles, articlesCount }) => ({
        articlesCount,
        articles: articles.map((/** @type {{ slug: any; favorited: any; favoritesCount: number; }} */ article) => {
          if (article.slug !== slug) return article

          return {
            ...article,
            favorited: !article.favorited,
            favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
          }
        }),
      }))

      // Return a context object with the snapshotted value
      return { previousArticles }
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticles)
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

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
          onClick={() => favorite.mutate()}
          type="button"
          className={classNames('btn btn-sm', {
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
            return (
              <li onClick={() => setActiveTag(tag)} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            )
          })}
        </ul>
      </a>
    </div>
  )
}
