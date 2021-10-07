import React from 'react'
import { useQueryClient } from 'react-query'
import { useAuth } from '../hooks'
import ArticleHeadline from './ArticleHeadline'
import FavoriteArticleButton from './FavoriteArticleButton'
import FollowAuthorButton from './FollowAuthorButton'

function ArticleMeta({ article }) {
  const queryClient = useQueryClient()
  const queryKey = ['articles', article.slug]

  const mutationConfig = {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ article }) => ({
        article: {
          ...article,
          author: {
            ...article.author,
            following: !article.author.following
          }
        }
      }))

      return { previousArticle }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },
    onSettled: () => {
      queryClient.invalidateQueries('articles')
    }
  }


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
            <FollowAuthorButton author={article.author} mutationConfig={mutationConfig}/>
            &nbsp;&nbsp;
            <FavoriteArticleButton article={article}>Favorite Article</FavoriteArticleButton>
          </>
        )}
      </span>
    </div>
  )
}

export default ArticleMeta
