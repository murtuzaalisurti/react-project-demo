import { Button, styled } from "@mui/material"
import { yellow } from "@mui/material/colors"

const StyledButton = styled(Button)(({theme}) => ({
    color: theme.palette.secondary.main,
    backgroundColor: yellow[300],
}))

export default StyledButton