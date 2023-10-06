import {Button, TextField} from "@mui/material"
import Box from '@mui/material/Box'
import {useState} from "react";
import {useStompClient} from "../hooks/useStompClient";

export const NameInput = () => {
    const {client, connected} = useStompClient()
    const [name, setName] = useState("")

    const sendName = (name: string) => {
        console.log(`Sending name: ${name}`)
        client?.publish({
            destination: "/app/hello",
            body: JSON.stringify({'name': name})
        });
    }

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
                disabled={name === "" || !connected}>
                Send
            </Button>
        </Box>
    )
}