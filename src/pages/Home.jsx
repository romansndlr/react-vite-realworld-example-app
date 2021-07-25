// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import TagsComp from '../component/TagsComp'
import ArticleComp from '../component/ArticleComp'
import useArticles from '../hooks/useArticles'

function Home() {
  
  const [headTag, setHeadTag] = useState("")
  const [page, setPage] = useState(0)
  const LIMIT_SIZE= 20;
  const offset= page* LIMIT_SIZE;

  // const articleRes= useQuery (['articles', {tag: headTag, offset:offset, limit:LIMIT_SIZE }]);
  const articleRes= useArticles({tag: headTag, offset:offset, limit:LIMIT_SIZE })
  
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
            <ArticleComp headTag={headTag} offset={offset} limit={LIMIT_SIZE}/>
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
            <TagsComp handleClick={(e)=>setHeadTag(e.target.innerHTML )} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
