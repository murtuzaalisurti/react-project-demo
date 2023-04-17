import Grid2 from '@mui/material/Unstable_Grid2'
import CustomCard from './Card'

const Cards = () => {
    return (
        <Grid2 container spacing={5}>
            {/* https://stackoverflow.com/a/47287319 */}
            {Array.from(Array(6)).map((_, index) => {
                return <CustomCard imgUrl='https://source.unsplash.com/random/1920x1080/?skyscrapers' color='primary' key={index} />
            })}
        </Grid2>
    )
}

export default Cards