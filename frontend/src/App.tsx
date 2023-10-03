import {WebSocketConnector} from "./components/WebSocketConnector";
import Box from "@mui/material/Box";
import {NameInput} from "./components/NameInput";
import {Greetings} from "./components/Greetings";
import {Typography} from "@mui/material";

function App() {
    return (
        <main>
            <Box sx={{
                width: "100%",
                maxWidth: "960px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: 1,
                display: "block",
                gap: 2
            }}>
                <Typography variant="h1" component="h1">Hello WebSocket!</Typography>
                <Box sx={{display: "grid", gap: 2}}>
                    <WebSocketConnector/>
                    <NameInput/>
                    <Greetings/>
                </Box>
            </Box>
        </main>
    )
}

export default App
