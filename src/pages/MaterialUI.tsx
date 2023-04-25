import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { Box, Button, Container } from '@mui/material'
import Cards from '../components/Cards'
import StyledButton from '../components/custom/StyledButton'
import MediaQuery from '../components/MediaQuery'
import CustomTable from '../components/Table'

const MaterialUI = () => {
    const { themeMode, setThemeMode } = useContext(ThemeContext)
    throw new Error("boom 2");
    return (
        <>
            <Container sx={{
                p: 8 // 8 * 12
            }}>
                <Box sx={{
                    mb: 2
                }}>
                    <Button variant="contained" onClick={() => {
                        setThemeMode()
                    }}>Change Theme {themeMode}
                    </Button>
                    <StyledButton variant="contained">Styled Button</StyledButton>
                    <MediaQuery />
                </Box>
                {/* <Cards /> */}
                <CustomTable />
            </Container>
        </>
    )
}

export default MaterialUI