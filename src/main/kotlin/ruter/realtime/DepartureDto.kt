package ruter.realtime

import java.time.Instant
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatterBuilder

data class DepartureDto(val monitoredVehicleJourney: MonitoredVehicleJourneyDto) {

    override fun toString(): String {
        val departmentTime = DateTimeFormatterBuilder().appendPattern("HH:mm").toFormatter().format(monitoredVehicleJourney.monitoredCall.expectedDepartureTime)
        return monitoredVehicleJourney.destinationName + "(" + monitoredVehicleJourney.directionName + "): " + departmentTime
    }
}

data class MonitoredVehicleJourneyDto(
        val destinationName: String, // E.g. "Bygdøy"
        val directionName: String?, // E.g. "2"
        val publishedLineName: String, // E.g. "30"
        val monitoredCall: MonitoredCall
)

data class MonitoredCall(val expectedDepartureTime: ZonedDateTime)