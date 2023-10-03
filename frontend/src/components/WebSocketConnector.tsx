import {Switch, Typography} from "@mui/material"
import Box from '@mui/material/Box'
import * as React from "react";
import {useEffect, useState} from "react";
import {useStomp} from "../hooks/useStomp";

export const WebSocketConnector = () => {

    const {connect, disconnect, connected} = useStomp()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(connected)
    }, [connected]);

    const handleConnectionSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = event.target.checked
        setChecked(newCheckedState)
        newCheckedState && !connected && connect()
        !newCheckedState && connected && disconnect()
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
                paddingLeft: 2
            }}>
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
                paddingLeft: 2
            }}>
                {connected ? "connected" : "disconnected"}
            </Typography>
        </Box>
    )
}