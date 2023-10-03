import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material"
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {useState} from "react";

// todo: this interface should come from a custom hook
interface Greeting {
    message: string
}

export const Greetings = () => {

    // todo: this state should come from a custom hook
    const [greetings, setGreetings] = useState<Array<Greeting>>([])

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // todo: remove this mock data for development
    if (greetings.length == 0) {
        setGreetings([
            {message: "Hello Jim!"},
            {message: "Hello John!"},
            {message: "Hello Bob!"}
        ])
    }

    return (
        <Box sx={{display: "grid", gap: 1}}>
            <Typography variant={"h6"} component="span">
                Received Greetings
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Message</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {greetings.map((greeting) => (
                            <StyledTableRow key={greeting.message}>
                                <StyledTableCell component="th" scope="row">
                                    {greeting.message}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}