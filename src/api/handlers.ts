import { axiosInstance } from "./config";

// get posts
export const getAllPosts = (params: string) => axiosInstance.get('/posts', { params: JSON.parse(params) })

// addPosts
export const addPost = (data: { body: string }) => {
    return axiosInstance.post('/posts', data)
}