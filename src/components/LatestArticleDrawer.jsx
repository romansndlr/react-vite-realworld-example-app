import React, { useEffect, useMemo } from 'react'
import { Drawer } from 'antd'
import { useGenerateTokenMutation, useGetLatestArticleQuery } from '../store/featureApiSlice'
import { isValidToken } from '../token/tokenManager'
import { getToken } from '../token/tokenStore'

function LatestArticleDrawer({ isOpen, toggleDrawer }) {
  const [generateToken] = useGenerateTokenMutation()
  const { data: article, refetch } = useGetLatestArticleQuery(undefined, { skip: false })

  const articleSummary = useMemo(()=>`${article?.body?.slice(0, 197)}...`,[article])

  useEffect(() => {
    const getTokenAndLoadArticle = async () => {
      const isTokenValid = isValidToken(getToken())
      if (!isTokenValid) {
        await generateToken()
        refetch()
      } else if (!article) {
        refetch()
      }
    }
    getTokenAndLoadArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, article])

  return (
    <Drawer title="Latest Article" placement="left" onClose={toggleDrawer} open={isOpen}>
      {article && (
        <>
          <p>
            {article.title} written by <small>{article.author}</small>
          </p>
          <p>
            published by <small>{article.published}</small>
          </p>
          <p>{articleSummary}</p>
        </>
      )}
    </Drawer>
  )
}
export default LatestArticleDrawer

// 1. Remove redundant tags from Drawer component done
// 2. limit number of chars in article body
// 3. make generate token async. done
// 4. move article data transformation into rtk done
// 5. variable naming
// 6. variable for storing expression results done
// Anthony Amponsah12:42 AM
// token management refactor
