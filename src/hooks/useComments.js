import axios from 'axios'
import {useQuery} from 'react-query'
import {ArticleModel} from '../models'
import CommentModel from "../models/CommentModel";

function useComments(article) {
    const {data, ...query} = useQuery([`comments`, article.slug],
        async () => {
            const {data} = await axios.get(`/articles/${article.slug}/comments`)
            return data
        }, {
            placeholderData: {
                comments: []
            }
        }
    )

    return {
        data: {
            comments: data.comments.map((comment) =>

                new CommentModel(comment))
        },
        ...query,

    }
}

export default useComments
