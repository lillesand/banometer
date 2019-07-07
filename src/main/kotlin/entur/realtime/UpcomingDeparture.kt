package entur.realtime

import java.time.Duration
import java.time.Instant
import java.time.LocalTime
import java.time.ZoneId.systemDefault

class UpcomingDeparture(departure: EstimatedCall) {

    val destinationName: String = departure.destinationDisplay.frontText
    val lineId: String = departure.serviceJourney.journeyPattern.line.id
    val localLineId: String = departure.serviceJourney.journeyPattern.line.localLineId()
    val lineName = departure.serviceJourney.journeyPattern.line.name
    val quayId: String = departure.quay.id
    val expectedDepartureTime: Instant = departure.expectedDepartureTime

    override fun toString(): String {
        return "Departure to $destinationName ($lineName) in $waitingTimeInMinutes minutes, at ${LocalTime.from(expectedDepartureTime.atZone(systemDefault()))}"
    }

    val waitingTimeInMinutes: Int
        get() = Duration.between(Instant.now(), expectedDepartureTime).toMinutes().toInt()

}
