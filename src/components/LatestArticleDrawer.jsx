import React, { useEffect, useMemo } from 'react'
import { Drawer } from 'antd'
import { useGenerateTokenMutation, useGetLatestArticleQuery } from '../store/featureApiSlice'
import { getToken, isValidToken } from '../util'

function LatestArticleDrawer({ isOpen, toggleDrawer }) {
  const [generateToken] = useGenerateTokenMutation()
  const { data, refetch } = useGetLatestArticleQuery({refetchOnMountOrArgChange:  false})

  const article = useMemo(() => data?.data, [data])

  useEffect(() => {
    if (!isValidToken(getToken())) {
      generateToken()
    } else if(!data){ refetch() } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      <Drawer title="Latest Article" placement="left" onClose={toggleDrawer} open={isOpen}>
        {article && (
          <>
            {' '}
            <p>{article.title} written by <small>{article.author}</small></p>
            <p>published by <small>{article.published}</small></p>
            <p>{article.body}</p>
          </>
        )}
      </Drawer>
    </>
  )
}
export default LatestArticleDrawer
