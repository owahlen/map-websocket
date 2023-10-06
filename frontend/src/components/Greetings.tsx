import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material"
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import {useSubscription} from "../hooks/useSubscription";

interface Greeting {
    content: string
}

export const Greetings = () => {
    const [greetings, setGreetings] = useState<Array<Greeting>>([{content: "Hello Joe!"}])
    useSubscription("/topic/greetings", (greetingMessage) => {
        const greeting = JSON.parse(greetingMessage.body) as Greeting
        setGreetings(currentGreetings => [...currentGreetings, greeting])
    })

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

    return (
        <Box sx={{display: "grid", gap: 1}}>
            <Typography variant={"h6"} component="span">
                Received Greetings
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Typography>Messages</Typography>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            setGreetings([])
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </Box>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {greetings.map((greeting) => (
                            <StyledTableRow key={greeting.content}>
                                <StyledTableCell component="th" scope="row">
                                    {greeting.content}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}