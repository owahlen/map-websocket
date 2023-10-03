import React, {useEffect, useState} from "react"
import {Snackbar} from "@mui/material"
import Alert from "@mui/material/Alert"
import {useStomp} from "../hooks/useStomp";

export const ErrorToast = () => {
    const {webSocketError, stompError} = useStomp()
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
        console.log("Analyzing Toast State")
            if (webSocketError || stompError) {
                !openSnackbar && setOpenSnackbar(true)
            } else {
                openSnackbar && setOpenSnackbar(false)
            }
        }, [webSocketError, stompError, openSnackbar]
    )

    const alertText = (): string => {
        if (webSocketError) {
            return "WebSocket error"
        } else if (stompError) {
            return `Stomp error ${stompError.headers['message']}: ${stompError.body}`
        } else {
            return "unknown error"
        }
    }

    return <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
        <Alert severity="error">
            {alertText()}
        </Alert>
    </Snackbar>
}
