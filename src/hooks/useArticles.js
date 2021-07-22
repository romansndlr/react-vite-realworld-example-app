import React from 'react'
import { useQuery } from 'react-query'
import Article from '../models/Article';

function useArticles({filters}) {
    const {data, ...query} = useQuery(
        ['/articles', filters ],
        {
          placeholderData: {
            data: {
              articles: [],
              articlesCount: 0,
            },
          },
          keepPreviousData: true,
          staleTime: 10000
        }
    )

    return {
        data: {
            articles: data?.articles?.map((article) => new Article(article)),
            articlesCount: data?.articlesCount
        }, ...query  
    }
}

export default useArticles;
