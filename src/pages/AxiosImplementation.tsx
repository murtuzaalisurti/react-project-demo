import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
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
            const bodyObject = JSON.parse(data.data.body)
            setResponse({
                ...data,
                ...({
                    data: {
                        ...data.data,
                        body: bodyObject
                    }
                })
            })
        }).catch(err => console.log(err))
    }

    return (
        <Container>
            <Stack direction={"column"} spacing={3}>
                <Typography variant="h4">
                    Axios Implementation
                </Typography>
                <Stack spacing={2} direction={"row"}>
                    <Button onClick={handleGetPosts} variant="contained">GET /posts</Button>
                    <Button onClick={handleAddPost} variant="contained">Add Post</Button>
                </Stack>
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
                            {/* {typeof response?.data} */}
                            {JSON.stringify(response?.data, undefined, 4)}
                        </Typography>
                    </Box>
                </Paper>
            </Stack>
        </Container>
    )
}

export default AxiosImplementation