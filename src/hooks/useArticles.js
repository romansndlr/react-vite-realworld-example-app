
import { useQuery } from "react-query";
import ArticleModel from "../models/Article";


function useArticles(props){
    const {tag, offset, limit}= props;
    const {data , ...queries}= useQuery (['articles', {tag, offset, limit }]);


    return {
        data: {
            articles: data?.articles?.map(article=> new ArticleModel(article)),
            articlesCount: data?.articlesCount
        },
        ...queries
    }
}

export default useArticles