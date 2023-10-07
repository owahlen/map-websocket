import {Switch, Typography} from "@mui/material"
import Box from '@mui/material/Box'
import * as React from "react";
import {useEffect, useState} from "react";
import {useStompClient} from "../../hooks/useStompClient";

export const WebSocketConnector = () => {

    const {client, connected} = useStompClient()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(client !== undefined && client.connected)
    }, [client]);

    const handleConnectionSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = event.target.checked
        setChecked(newCheckedState)
        newCheckedState && client && !client.active && client.activate()
        !newCheckedState && client && client.deactivate()
    }

    return (
        <Box sx={{
            display: "inline-flex",
            gap: 1,
            alignItems: "center",
            borderRadius: "4px",
            paddingTop: "1px",
            paddingRight: "17px",
            paddingBottom: "1px",
            paddingLeft: "17px",
            bgcolor: "#fff"
        }}>
            <Typography>
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
        </Box>
    )
}