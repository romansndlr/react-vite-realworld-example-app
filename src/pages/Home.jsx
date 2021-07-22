// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import TagsComp from '../component/TagsComp'

function Home() {
  
  const [headTag, setHeadTag] = useState("")
  const [page, setPage] = useState(0)
  const LIMIT_SIZE= 20;
  const offset= page* LIMIT_SIZE;

  const articleRes= useQuery (['articles', {tag: headTag, offset:offset, limit:LIMIT_SIZE }]);
  
  
  const articles = articleRes?.data?.articles;
  const articleCount = articleRes?.data?.articlesCount
  const pages = articleCount/ LIMIT_SIZE;
  
  

  if (articleRes.isLoading) return 'Loading...'
  if (articleRes.error) return 'An error has occurred: ' + articleRes.error?.message
  
  return (

    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    type="button"
                    onClick= {()=> setHeadTag(null)}
                    className={classNames("nav-link", {"active":!headTag})} // Add active if not feed and not tag
                  >
                    Global Feed
                  </button>
                </li>
                {headTag && 
                  <li className="nav-item">
                    <a className={classNames("nav-link",{ "active":headTag })}> # {headTag}</a>
                  </li> }
                
              </ul>
            </div>
            {articles?.map((article,index)=>( 
               <div className="article-preview">
                <div className="article-meta">
                  <a>
                    <img src={article.author.image} />
                  </a>
                  <div className="info">
                    <a className="author">{article.author.username}</a>
                    <span className="date">{new Date(article.createdAt).toDateString()}</span>
                  </div>
                  <button
                    type="button"
                    className={article.favorited? "btn-primary" : "btn btn-sm btn-outline-primary"} // Change to btn-primary if favorited
                    disabled={false}
                  >
                    <i className="ion-heart" />
                    &nbsp; {article.favoritesCount}
                  </button>
                </div>
                <a className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  {article.tagList.map((tag,index)=> (
                    <ul className="tag-list">
                      <li className="tag-default tag-pill tag-outline">{tag}</li>
                    </ul>))}
                </a>
              </div>))}
            <nav>
            <ul className="pagination">
            { Array(pages).fill(0).map((_, i) => i + 1).map( (page)=>{
              
              return <li className="page-item">
                      <button 
                      onClick= {()=>setPage(page-1)} 
                      type="button" className="page-link">
                        {page}
                      </button>
                    </li>
             } )  }
             </ul>
            </nav>
          </div>
         
          <div className="col-md-3">
            <TagsComp handleClick={(tag)=>setHeadTag(tag)} />
          {/* {tagsToShow?.map((tag, key)=>(
            tag.match(/^[0-9A-Za-z]+$/)? 
            <a onClick={()=>setHeadTag(tag)} key={key} href="#" className="tag-pill tag-default">{tag}</a> 
            : null
          ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
