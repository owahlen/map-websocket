package org.wahlen.mapwebsocket.model

data class VehicleDistribution(
    var city: String,
    var center: LatLong,
    var radius: Double,
    var vehicles: Int
)
