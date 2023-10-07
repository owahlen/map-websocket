package org.wahlen.mapwebsocket.service

import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import org.wahlen.mapwebsocket.model.VehiclePosition

@Service
class PositionBroadcastService(
    private val template: SimpMessagingTemplate
) {
    fun sendVehiclePositions(positions: List<VehiclePosition>) {
        template.convertAndSend("/topics/positions", positions)
    }
}