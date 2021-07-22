import React from "react";
import { useQuery } from "react-query";

function ArticleComp(props){
    const { headTag, offset , limit }= props;

    const articleRes= useQuery (['articles', {tag: headTag, offset:offset, limit:limit }]);
    const articles = articleRes?.data?.articles;
    const articleCount = articleRes?.data?.articlesCount

    return(
        <div>
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
        </div>
    )

}

export default ArticleComp