import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled, tableCellClasses, Box, IconButton, useTheme, TableFooter, TablePagination, Collapse, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FirstPage, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, LastPage } from '@mui/icons-material'

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
}

const CustomRow = ({ planets, planet, index }: { planets: IPlanets[], planet: IPlanets, index: number }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    return (
        <>
            <StyledRow
                hover
            >
                <StyledTableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {!isCollapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {planet.name}
                </StyledTableCell>
                <StyledTableCell align="right">{planet.diameter}</StyledTableCell>
                <StyledTableCell align="right">{planet.climate}</StyledTableCell>
                <StyledTableCell align="right">{planet.gravity}</StyledTableCell>
                <StyledTableCell align="right">{planet.terrain}</StyledTableCell>
            </StyledRow>

            <StyledRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={!isCollapsed} timeout={"auto"} unmountOnExit>
                        <Typography>
                            Nested
                        </Typography>
                        <Table>
                            <TableHead>
                                <StyledRow>
                                    <TableCell>Films</TableCell>
                                    <TableCell>Residents</TableCell>
                                </StyledRow>
                            </TableHead>
                            <TableBody>
                                <StyledRow>
                                    <StyledTableCell component={"th"} scope='row'>{planet.films}</StyledTableCell>
                                    <StyledTableCell component={"th"} scope='row'>{planet.residents}</StyledTableCell>
                                </StyledRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </StyledTableCell>
            </StyledRow>
        </>
    )
}

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

    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(3);
    const [rowSize, setRowSize] = useState<"small" | "medium">("small");

    console.log(page);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - planets.length) : 0;


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: '2rem', maxHeight: 450 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} size={rowSize}>
                <TableHead>
                    <StyledRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Diameter</StyledTableCell>
                        <StyledTableCell align="right">Climate</StyledTableCell>
                        <StyledTableCell align="right">Gravity</StyledTableCell>
                        <StyledTableCell align="right">Terrain</StyledTableCell>
                    </StyledRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? planets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : planets
                    ).map((planet, index) => (
                        <CustomRow planets={planets} planet={planet} index={index} key={`${planet.name}_${index}`} />
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: (rowSize === "small" ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={10} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[3, 6, 9, {
                                label: 'All',
                                value: -1
                            }]}
                            colSpan={6}
                            count={planets.length}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows-per-page'
                                },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default CustomTable