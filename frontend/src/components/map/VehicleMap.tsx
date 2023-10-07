import React, {useEffect, useRef, useState} from "react"
import {useSubscription} from "../../hooks/useSubscription"
import {useStompClient} from "../../hooks/useStompClient";

export interface VehicleMapProps {
    center: google.maps.LatLngLiteral
    zoom: number
}

export const VehicleMap = ({center, zoom}: VehicleMapProps) => {
    const {connected} = useStompClient()
    const ref = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [positionUpdates, setPositionUpdates] = useState<Array<VehiclePosition>>([])
    const markerRecord = useRef<Record<string, google.maps.Marker>>({})

    useSubscription("/topic/positions", (positionsMessage) => {
        // Position updates are received via the websocket
        const vehiclePositions = JSON.parse(positionsMessage.body) as Array<VehiclePosition>
        setPositionUpdates(vehiclePositions)
    })

    useEffect(() => {
        // Create the Map
        if (ref.current) {
            const newMap = new window.google.maps.Map(ref.current, {
                center: center,
                zoom: zoom,
                fullscreenControl: false
            });
            setMap(newMap)
        }
    }, [ref]);

    useEffect(() => {
        // Populate the Map with Markers
        if(!map) return
        if(!connected) {
            for(const vehicleId in markerRecord.current) {
                markerRecord.current[vehicleId].setMap(null)
                delete markerRecord.current[vehicleId]
            }
            setPositionUpdates([])
        }
        positionUpdates.forEach(({vehicleId, position}) => {
            const marker = markerRecord.current[vehicleId]
            if (marker) {
                marker.setPosition(position)
            } else {
                markerRecord.current[vehicleId] = new google.maps.Marker({position, map})
            }
        })
    }, [map, positionUpdates, connected]);

    return (
        <div
            ref={ref}
            style={{width: "100%", height: "100%"}}
        />
    )
}
