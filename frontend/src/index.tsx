import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
import defaultTheme from "./themes/default-theme"
import {StompSessionProvider} from "./provider/stomp/StompSessionProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const {hostname, port} = window.location
// If no port is defined the "ws:" URI scheme defaults to port 80.
// When developing, "yarn start" serves the web app on port 3000
// while the websocket of the servlet container listens on port 8080.
// Note, that CORS must be disabled on the server for this to work.
const wsPort = !port?'80':port==='3000'?'8080':port
const wsUrl = `ws://${hostname}:${wsPort}/gs-guide-websocket`

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <StompSessionProvider url={wsUrl}>
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
