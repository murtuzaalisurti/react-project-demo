import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface IPlanets {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
}

const StyledRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': { 
        border: 0 
    }
}))

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const CustomTable = () => {

    const [planets, setPlanets] = useState<IPlanets[]>([])

    useEffect(() => {
        fetch("https://swapi.dev/api/planets")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPlanets(data.results)
            })
    }, [])
    return (
        <TableContainer component={Paper} sx={{ marginTop: '2rem', maxHeight: 450 }}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                    <StyledRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Diameter</StyledTableCell>
                        <StyledTableCell align="right">Climate</StyledTableCell>
                        <StyledTableCell align="right">Gravity</StyledTableCell>
                        <StyledTableCell align="right">Terrain</StyledTableCell>
                    </StyledRow>
                </TableHead>
                <TableBody>
                    {planets.map((planet, index) => (
                        <StyledRow
                        hover
                            key={`${planet.name}_${index}`}
                        >
                            <StyledTableCell component="th" scope="row">
                                {planet.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{planet.diameter}</StyledTableCell>
                            <StyledTableCell align="right">{planet.climate}</StyledTableCell>
                            <StyledTableCell align="right">{planet.gravity}</StyledTableCell>
                            <StyledTableCell align="right">{planet.terrain}</StyledTableCell>
                        </StyledRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTable