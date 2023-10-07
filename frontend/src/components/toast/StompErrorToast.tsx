import React, {useEffect, useState} from "react"
import {Snackbar} from "@mui/material"
import Alert from "@mui/material/Alert"
import {useStompClient} from "../../hooks/useStompClient";

export const StompErrorToast = () => {
    const {error} = useStompClient()
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
            if (error) {
                !openSnackbar && setOpenSnackbar(true)
            } else {
                openSnackbar && setOpenSnackbar(false)
            }
        }, [error, openSnackbar]
    )

    return <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
        <Alert severity="error">
            {error}
        </Alert>
    </Snackbar>
}
