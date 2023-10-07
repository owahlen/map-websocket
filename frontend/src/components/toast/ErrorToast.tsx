import React, {ReactNode} from "react"
import {AlertColor, Snackbar} from "@mui/material"
import Alert from "@mui/material/Alert"

interface ErrorToastProps {
    message: ReactNode
    severity: AlertColor
    open?: boolean
}

export const ErrorToast = ({message, severity, open}: ErrorToastProps) => {
    if (open === undefined) {
        open = true
    }

    return <Snackbar
        open={open}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
        <Alert severity={severity}>
            {message}
        </Alert>
    </Snackbar>
}
