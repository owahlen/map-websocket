import {createTheme} from "@mui/material/styles"

const defaultTheme = createTheme({
    typography: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {height: 56}
            }
        }
    }
})

export default defaultTheme
