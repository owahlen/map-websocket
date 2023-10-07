package org.wahlen.mapwebsocket.service

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import org.wahlen.mapwebsocket.model.LatLng
import org.wahlen.mapwebsocket.model.VehicleDistribution
import org.wahlen.mapwebsocket.model.VehiclePosition
import kotlin.math.*

/**
 * The service simulates retrieval of vehicle positions that are usually loaded from third party APIs.
 */
@Service
class VehiclePositionService(
    private val objectMapper: ObjectMapper,
    @Value("classpath:vehicle-distributions.json")
    private val vehicleDistributionsResource: Resource
) {
    private val log = LoggerFactory.getLogger(VehiclePositionService::class.java)
    private val equatorialRadius = 6378137.0
    private val vehicleDistributions = readVehicleDistributions()

    fun getVehiclePositions(): List<VehiclePosition> {
        log.debug("creating sample of vehicle positions")
        return createSample()
    }

    private fun readVehicleDistributions(): List<VehicleDistribution> {
        val inputStream = vehicleDistributionsResource.inputStream
        return objectMapper.readValue(inputStream, object : TypeReference<List<VehicleDistribution>>() {})
    }

    /**
     * Create a sample distribution of vehicles in the cities defined by vehicle-distributions.json
     */
    private fun createSample(): List<VehiclePosition> {
        val positions = mutableListOf<VehiclePosition>()
        vehicleDistributions.forEach { distribution ->
            repeat(distribution.vehicles) {
                // Generate a random sample position of a vehicle relative to the city center.
                // For equal distribution across the city area the probability density
                // of the distance from the center must be linear increasing between 0 and the maximum distance.
                val distance = distribution.radius * 1000.0 * (1.0 - abs(Math.random() + Math.random() - 1.0))
                // The bearing from the city center is equally distributed between 0 and 360 degree
                val bearing = 360 * Math.random()
                // compute the sample vehicle position relative to the city center
                val position = destinationPoint(distribution.center, distance, bearing)
                val vehiclePosition = VehiclePosition("vehicle_${positions.size}", position)
                positions.add(vehiclePosition)
            }
        }
        return positions
    }

    /**
     * Returns the destination point from this point having travelled the given distance on the
     * given initial bearing (bearing normally varies around path followed).
     *
     * @param start    the start point
     * @param distance the distance travelled, in same units as earth radius (default: meters)
     * @param bearing  the initial bearing in degrees from north
     * @return the destination point
     * @see <a href="http://www.movable-type.co.uk/scripts/latlon.js">latlon.js</a>
     */
    private fun destinationPoint(start: LatLng, distance: Double, bearing: Double): LatLng {
        val theta = Math.toRadians(bearing)
        val delta: Double = distance / equatorialRadius // angular distance in radians
        val phi1 = Math.toRadians(start.lat)
        val lambda1 = Math.toRadians(start.lng)
        val phi2 = asin(sin(phi1) * cos(delta) + cos(phi1) * sin(delta) * cos(theta))
        val lambda2 = lambda1 + atan2(
            sin(theta) * sin(delta) * cos(phi1),
            cos(delta) - sin(phi1) * sin(phi2)
        )
        return LatLng(Math.toDegrees(phi2), Math.toDegrees(lambda2))
    }
}
