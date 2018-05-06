package ruter.realtime

import java.time.Duration
import java.time.Instant
import java.time.LocalTime

import java.time.ZoneId.systemDefault

class UpcomingDeparture(departure: DepartureDto) {

    var destinationName: String = departure.monitoredVehicleJourney.destinationName
    var lineName: String = departure.monitoredVehicleJourney.publishedLineName
    var expectedDepartureTime: Instant = departure.monitoredVehicleJourney.monitoredCall.expectedDepartureTime.toInstant()
    var directionName: String = if (departure.monitoredVehicleJourney.directionName != null) departure.monitoredVehicleJourney.directionName else "";

    override fun toString(): String {
        return "Departure to $destinationName ($lineName) in $waitingTimeInMinutes minutes, at ${LocalTime.from(expectedDepartureTime.atZone(systemDefault()))}"
    }

    val waitingTimeInMinutes: Int
        get() = Duration.between(Instant.now(), expectedDepartureTime).toMinutes().toInt()

}
