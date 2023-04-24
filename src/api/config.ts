import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

axiosInstance.interceptors.request.use(config => {
    if (config.method?.toUpperCase() === "POST") {
        config.headers["Content-Type"] = "application/json"
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

export { axiosInstance }