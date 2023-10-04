import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
import defaultTheme from "./themes/default-theme"
import StompSessionProvider from "./provider/stomp/StompSessionProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <StompSessionProvider
                url={"ws://localhost:8080/gs-guide-websocket"}
                //All options supported by @stomp/stompjs can be used here
            >
            <CssBaseline/>
            <App/>
            </StompSessionProvider>
        </ThemeProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
