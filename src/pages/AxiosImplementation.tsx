import { Box, Button, Container, Paper, Typography } from "@mui/material";
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios"
import { useState } from "react";

interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}
const AxiosImplementation = () => {
    const [reqInterceptor, setReqInterceptor] = useState<string>();
    const [response, setResponse] = useState<AxiosResponse>();
    const [requestHeaders, setRequestHeaders] = useState<AxiosHeaders>();

    const axiosInstance = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com",
    })

    axiosInstance.interceptors.request.use(config => {
        setReqInterceptor(`/${config.method?.toUpperCase()} request sent to ${config.baseURL}${config.url}`)
        if (config.method?.toUpperCase() === "POST") {
            config.headers["Content-Length"] = "20000"
        }
        setRequestHeaders(config.headers)
        return config
    }, (err) => {
        return Promise.reject(err)
    })

    const getPosts = () => {
        axiosInstance.get('/posts').then((data) => {
            setResponse(data)
        })
    }

    const addPost = () => {
        axiosInstance.post('/posts', {
            body: JSON.stringify({
                title: 'foos',
                body: 'bars',
                userId: 10
            })
        }).then((data) => {
            setResponse(data)
        })
    }

    return (
        <Container>
            <Typography variant="h4">
                Axios Implementation
            </Typography>
            <Box>
                <Button onClick={getPosts} variant="contained">GET /posts</Button>
                <Button onClick={addPost} variant="contained">Add Post</Button>
            </Box>
            <Container sx={{
                padding: 0,
                overflowX: "scroll"
            }}>
                <Paper sx={{ p: 4, width: "fit-content" }}>
                    <Box>
                        <Typography sx={{
                            mb: 2
                        }} variant="h5">
                            Request Interceptor
                        </Typography>
                        <Typography component={"pre"} fontFamily={'monospace'}>
                            {JSON.stringify(reqInterceptor, undefined, 4)}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography sx={{
                            mb: 2
                        }} variant="h5">Request Headers</Typography>
                        <Typography component={"pre"} fontFamily={'monospace'}>
                            {JSON.stringify(requestHeaders, undefined, 4)}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography sx={{
                            mb: 2
                        }} variant="h5">Response Headers</Typography>
                        <Typography component={"pre"} fontFamily={'monospace'}>
                            {JSON.stringify(response?.headers, undefined, 4)}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography sx={{
                            mb: 2
                        }} variant="h5">Data</Typography>
                        <Typography component={"pre"} fontFamily={'monospace'}>
                            {JSON.stringify(response?.data, undefined, 4)}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Container>
    )
}

export default AxiosImplementation