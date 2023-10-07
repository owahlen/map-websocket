import {WebSocketConnector} from "./components/websocket/WebSocketConnector"
import Box from "@mui/material/Box"
import {StompErrorToast} from "./components/toast/StompErrorToast"
import {VehicleMapWrapper} from "./components/map/VehicleMapWrapper"

export const App = () => {
    return (
        <main>
            <Box sx={{
                width: "100%",
                height: "100%"
            }}>
                <Box position="absolute" top="10px" right="10px" zIndex="1000">
                    <WebSocketConnector/>
                </Box>
                <VehicleMapWrapper center={{lat: 51.165691, lng: 10.451526}} zoom={6}/>
            </Box>
            <StompErrorToast/>
        </main>
    )
}
