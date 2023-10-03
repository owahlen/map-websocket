import {Button, FormControlLabel, Switch, Typography} from "@mui/material"
import Box from '@mui/material/Box'
import {useEffect, useState} from "react";
import * as React from "react";

export const WebSocketConnector = () => {

    // todo: this state should come from a custom hook
    const [connected, setConnected] = useState(false)
    const [checked, setChecked] = useState(false)

    const handleConnectionSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        setChecked(checked)
        // todo: this should be a call to establish/terminate the connection
        setConnected(checked)
    }

    return (
        <Box sx={{
            display: "inline-flex",
            gap: 1,
            alignItems: "center",
            border: 1,
            borderColor: "initial",
            borderRadius: "4px"
        }}>
            <Typography sx={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2}}>
                WebSocket State:
            </Typography>
            <Switch checked={checked} onChange={handleConnectionSwitch}/>
            <Box sx={{
                height: "25px",
                width: "25px",
                backgroundColor: (connected ? "#0a0" : "#a00"),
                borderRadius: "50%",
                display: "inline-block"
            }}/>
            <Typography sx={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2}}>
                {connected ? "connected" : "disconnected"}
            </Typography>
        </Box>
    )
}