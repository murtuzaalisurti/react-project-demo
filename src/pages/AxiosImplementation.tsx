import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { AxiosResponse } from "axios"
import { useState } from "react";
import { addPost, getAllPosts } from "../api/handlers";

const AxiosImplementation = () => {
    const [response, setResponse] = useState<AxiosResponse>();

    const handleGetPosts = () => {
        getAllPosts(JSON.stringify({
            _limit: 5
        })).then(data => {
            setResponse(data)
        })
    }

    const handleAddPost = () => {
        addPost({
            body: JSON.stringify({
                title: 'foos',
                body: 'bars',
                userId: 10
            })
        }).then(data => {
            console.log(data.request);
            setResponse(data)
        })
    }

    return (
        <Container>
            <Typography variant="h4">
                Axios Implementation
            </Typography>
            <Box>
                <Button onClick={handleGetPosts} variant="contained">GET /posts</Button>
                <Button onClick={handleAddPost} variant="contained">Add Post</Button>
            </Box>
            <Paper sx={{ p: 4, maxWidth: "50rem", overflowX: "scroll" }}>
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
    )
}

export default AxiosImplementation