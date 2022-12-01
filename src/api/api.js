import axios from "axios"
export const getPost = async () => {
    const post = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _limit: 20
        }
    })
    return post?.data;
}

export const getAuthor = async () => {
    const author = await axios.get('https://jsonplaceholder.typicode.com/users');
    return author?.data;
}
export const getComment = async () => {
    const comment = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return comment?.data;
}