import {Button, TextField} from "@mui/material"
import Box from '@mui/material/Box'
import {useState} from "react";

export const NameInput = () => {

    const [name, setName] = useState("")

    const sendName = () => {
        // todo: actually send the name to the websocket
        alert(`send name: ${name}`)
    }

    return (
        <Box sx={{display: "flex", justifyContent: "flex-start", gap: 2}}>
            <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                label="Name"
                variant="outlined"
                helperText="Please enter your name">
            </TextField>
            <Button
                color="primary"
                variant="contained"
                onClick={sendName}
                disabled={name === ""}>
                Send
            </Button>
        </Box>
    )
}