import {Button, FormControlLabel, Switch, Typography} from "@mui/material"
import Box from '@mui/material/Box'
import {useState} from "react";
import * as React from "react";

export const WebSocketConnector = () => {

    const [checked, setChecked] = useState(false)

    const handleWebSocketConnection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        setChecked(checked)
        if (checked) alert("connected")
        else alert("disconnected")
    }

    return (
        <Box sx={{display: "flex", justifyContent: "flex-start", gap: 1}}>
            <FormControlLabel control={
                <Switch checked={checked} onChange={handleWebSocketConnection}/>
            } label={"WebSocket Connection State ${{checked}}"}/>

        </Box>
    )
}