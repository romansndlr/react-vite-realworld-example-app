import React from 'react'
import faker from 'faker'
import { useParams } from 'react-router-dom'
import { useArticle, useAuth } from '../hooks'
import { ArticleMeta } from '../components'
import useComments from '../hooks/useComments'

function ArticlePage() {
  const { slug } = useParams()
  const { data: article } = useArticle({ slug })
  const { authUser } = useAuth()
  const { data }= useComments(article.slug)
  console.log(data)

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{article.description}</p>
            <p>{article.body}</p>
          </div>
        </div>
        <hr />
        <div className='article-actions'>
          <ArticleMeta article={article} />
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <form className='card comment-form'>
              <div className='card-block'>
                <textarea required className='form-control' placeholder='Write a comment...' rows={3} />
              </div>
              <div className='card-footer'>
                <img src={authUser.image} className='comment-author-img' />
                <button disabled={false} type='submit' className='btn btn-sm btn-primary'>
                  Post Comment
                </button>
              </div>
            </form>
            {data.comments?.map((comment)=>{
              <div className='card'>
              <div className='card-block'>
                <p className='card-text'>{comment.body}</p>
              </div>
              <div className='card-footer'>
                <a className='comment-author'>
                  <img src={comment.author.image} className='comment-author-img' />
                </a>
                &nbsp;
                <a className='comment-author'>{comment.author.username}</a>
                <span className='date-posted'>{comment.createdAt}</span>
                <span className='mod-options'>
                  <i className='ion-trash-a' />
                </span>
              </div>
            </div>
            })}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
