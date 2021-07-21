import axios from 'axios'

const BASE_URL = 'https://conduit.productionready.io/api'

const ConduitAPI = {
  get_tags: () => axios.get(`${BASE_URL}/tags`),
  get_articles: (offset=0, limit=20) => axios.get(`${BASE_URL}/articles?offset=${offset}&limit=${limit}`),
  get_article: (slug) => axios.get(`${BASE_URL}/articles/${slug}`)
}

export default ConduitAPI