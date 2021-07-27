import React from 'react'
import { useQuery } from 'react-query'
import { Article } from '../models'

function useArticle({ limit, offset, tag }) {
  const { data, ...query } = useQuery(['/articles', { limit, offset, tag }], {
    placeholderData: {
      articles: [],
      articlesCount: 0,
    },
  })

  return {
    data: {
      articles: data?.articles.map((article) => new Article(article)),
      articlesCount: data?.articleCount,
    },
    ...query,
  }
}

export default useArticle