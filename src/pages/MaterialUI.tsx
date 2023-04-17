import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { Box, Button, Container } from '@mui/material'
import Cards from '../components/Cards'

const MaterialUI = () => {
    const { themeMode, setThemeMode } = useContext(ThemeContext)
    return (
        <>
            <Container sx={{
                p: 10
            }}>
                <Box sx={{
                    mb: 2
                }}>
                    <Button variant="contained" onClick={() => {
                        setThemeMode()
                    }}>Change Theme {themeMode}
                    </Button>
                    {/* <StyledButton variant="contained">Styled Button</StyledButton> */}
                </Box>
                <Cards />
            </Container>
            {/* <div>{themeMode}</div>
            <Button variant='contained' onClick={() => setThemeMode()}>Change</Button> */}
        </>
    )
}

export default MaterialUI