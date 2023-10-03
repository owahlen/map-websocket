import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
import defaultTheme from "./themes/default-theme"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
