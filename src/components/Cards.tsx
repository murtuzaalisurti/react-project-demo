import Grid2 from '@mui/material/Unstable_Grid2'
import CustomCard from './Card'
import { useEffect, useState } from 'react'

const Cards = () => {
    const [imgUrl, setImgUrl] = useState<string | undefined>();

    useEffect(() => {
        let fetchingImg;
        (function (): PromiseLike<string> {
            return new Promise((resolve, reject) => {
                fetchingImg = setTimeout(() => {
                    resolve("https://source.unsplash.com/random/1920x1080/?skyscrapers")
                }, 2000)
            })
        })().then((data) => {
            console.log(data);
            setImgUrl(data)
        })
    }, [])

    return (
        <Grid2 container spacing={5}>
            {/* https://stackoverflow.com/a/47287319 */}
            {Array.from(Array(6)).map((_, index) => {
                return <CustomCard imgUrl={imgUrl} color='primary' key={index} />
            })}
        </Grid2>
    )
}

export default Cards