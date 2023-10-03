import {Button, FormControl, TextField, Typography} from "@mui/material"
import Box from '@mui/material/Box'

export const NameInput = () => {

    const sendName = () => {
        alert("send name")
    }

    return (
        <Box sx={{display: "flex", justifyContent: "flex-start", gap: 2}}>
            <TextField fullWidth label="Name" variant="outlined" helperText="Please enter your name"></TextField>
            <Button color="primary" variant="contained" onClick={sendName}>
                Send
            </Button>
        </Box>
    )
}