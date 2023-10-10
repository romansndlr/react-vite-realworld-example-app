import React, { useEffect, useMemo } from 'react'
import { Drawer } from 'antd'
import { useGenerateTokenMutation, useLazyGetLatestArticleQuery  } from '../store/featureApiSlice'
import { isValidToken } from '../token/tokenManager'
import { getToken } from '../token/tokenStore'

function LatestArticleDrawer({ isOpen, toggleDrawer }) {
  const [generateToken] = useGenerateTokenMutation()
  const [ getLatestArticle, { data : article } ] = useLazyGetLatestArticleQuery()

  const articleSummary = useMemo(()=>`${article?.body?.slice(0, 197)}...`,[article])

  useEffect(() => {
    const getTokenAndLoadArticle = async () => {
      const isTokenValid = isValidToken(getToken())
      if (!isTokenValid) {
        await generateToken()
        getLatestArticle()
      } else if (!article) {
        getLatestArticle()
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

