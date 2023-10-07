package org.wahlen.mapwebsocket.task

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.wahlen.mapwebsocket.service.PositionBroadcastService
import org.wahlen.mapwebsocket.service.VehiclePositionService

@Component
class CrawlPositionsTask(
    private val vehiclePositionService: VehiclePositionService,
    private val positionBroadcastService: PositionBroadcastService
) {

    private val log = LoggerFactory.getLogger(CrawlPositionsTask::class.java)

    @Scheduled(fixedRate = 1_000)
    fun updatePositions() {
        log.debug("fetching and broadcasting vehicle positions...")
        val positions = vehiclePositionService.getVehiclePositions()
        positionBroadcastService.sendVehiclePositions(positions)
    }
}
