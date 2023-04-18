import { Box, Theme, Typography, useMediaQuery } from "@mui/material"
const MediaQuery = () => {

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    return (
        <Box>
            <Typography>
                {matches.toString()}
            </Typography>
        </Box>
    )
}

export default MediaQuery