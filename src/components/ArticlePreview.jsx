import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

function ArticlePreview({article, filters}) {
  const queryClient = useQueryClient()
  const queryKey = ['/articles', filters]
  const {slug, favorited} = article

  const favorite = useMutation(() => axios[favorited ? 'delete' : 'post'](`/articles/${article.slug}/favorite`), {
    onMutate: async() => {
      await queryClient.cancelQueries(queryKey)
      const previousArticles = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, ({ articles, articlesCount }) => ({
          articlesCount,
          articles: articles.map(tempArticle => {
            if (slug !== tempArticle.slug) return tempArticle

          return {
            ...tempArticle,
            favorited: !tempArticle.favorited,
            favoritesCount: favorited? tempArticle.favoritesCount - 1 : tempArticle.favoritesCount + 1
          }
        })
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
    <div className='article-preview'>
      <div className='article-meta'>
        <a>
          <img src={article.author.image} />
        </a>
        <div className='info'>
          <a className='author'>{article.author.username}</a>
          <span className='date'>{article.updatedAt}</span>
        </div>
        <button
          type='button'
          className={classNames('btn btn-sm', {'btn-outline-primary': !article.favorited, 'btn-info': article.favorited})}
          disabled={false}
          onClick={() => favorite.mutate()}
        >
          <i className='ion-heart' />
          &nbsp; {article.favoritesCount}
        </button>
      </div>
      <Link className='preview-link' to={`/article/${article.slug}`}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {article.tagList.map(tag =>
            <li className='tag-default tag-pill tag-outline' key={tag}>{tag}</li>
          )}

        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview