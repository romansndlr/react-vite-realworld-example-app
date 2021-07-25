
import { useQuery } from "react-query";
import AuthorModel from "../models/Author";

function useArticles(props){
    const {tag, offset, limit}= props;
    const {data , ...queries}= useQuery (['articles', {tag, offset, limit }]);

    return {
        data: {
            articles: data?.articles?.map(article=> new AuthorModel(article)),
            articlesCount: data?.articlesCount
        },
        ...queries
    }
}

export default useArticles