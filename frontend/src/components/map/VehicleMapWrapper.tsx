import {CircularProgress} from "@mui/material"
import React from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper"
import {ErrorToast} from "../toast/ErrorToast";
import {VehicleMap, VehicleMapProps} from "./VehicleMap";

export const VehicleMapWrapper = (props: VehicleMapProps) => {
    const apiKey = process.env.REACT_APP_MAPS_API_KEY!!

    const render = (status: Status) => {
        if (status === Status.FAILURE) return <ErrorToast message="Error loading map" severity="error"/>;
        return <CircularProgress/>;
    };

    return (
        <Wrapper apiKey={apiKey} render={render}>
            <VehicleMap {...props}/>
        </Wrapper>
    )
}
