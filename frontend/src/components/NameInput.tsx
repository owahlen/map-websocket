import {Button, TextField} from "@mui/material"
import Box from '@mui/material/Box'
import {useState} from "react";
import {useStomp} from "../hooks/useStomp";

export const NameInput = () => {
    const {sendName} = useStomp()
    const [name, setName] = useState("")

    return (
        <Box sx={{display: "flex", justifyContent: "start", gap: 2}}>
            <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                size="small"
                label="Name"
                variant="outlined"
                helperText="Please enter your name">
            </TextField>
            <Button
                sx={{alignSelf: "start"}}
                color="primary"
                variant="contained"
                onClick={() => {
                    sendName(name)
                }}
                disabled={name === ""}>
                Send
            </Button>
        </Box>
    )
}