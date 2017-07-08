package ruter.realtime

import java.time.Duration
import java.time.Instant
import java.time.LocalTime
import java.util.Comparator

import java.time.ZoneId.systemDefault

class UpcomingDeparture(departure: BusDepartureDto) {

    var destinationName: String = departure.destinationName
    var lineName: String = departure.publishedLineName
    var expectedDepartureTime: Instant = departure.expectedDepartureTime
    var directionName: String = departure.directionName;

    override fun toString(): String {
        return "Departure to $destinationName ($lineName) in $waitingTimeInMinutes minutes, at ${LocalTime.from(expectedDepartureTime.atZone(systemDefault()))}"
    }

    val waitingTimeInMinutes: Int
        get() = Duration.between(Instant.now(), expectedDepartureTime).toMinutes().toInt()

}
