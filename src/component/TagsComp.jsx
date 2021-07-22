import React from "react"
import { useQuery } from "react-query";

function TagsComp(props){
    const {handleClick }= props;
    
    const tagsRes  = useQuery ('tags', { 
        placeholderData : {
          data: { 
            tags : [] 
          }
        }
      });

    const tagsToShow= tagsRes?.data?.tags

    return(
    <div> playing with components
        {tagsToShow?.map((tag, key)=>(
            tag.match(/^[0-9A-Za-z]+$/)&& 
            <a
               
              onClick={(tag)=>{
                handleClick(tag)
              }} 
              key={key} href="#" 
              className="tag-pill tag-default">
                {tag}
            </a> 
          ))}
    </div>
    )
}
export default TagsComp