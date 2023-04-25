import { Link, Typography } from '@mui/material';
import React from 'react'
import { FallbackProps } from 'react-error-boundary';
import { useRouteError } from 'react-router-dom'

const DisplayError = ({ error }: FallbackProps) => {
    console.log(JSON.stringify(error));
    return (
        <>
            <Typography>{error.message}</Typography>
            <Link href='/'>home</Link>
        </>
    )
}

export default DisplayError