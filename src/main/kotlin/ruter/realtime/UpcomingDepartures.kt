package ruter.realtime

import java.util.Comparator
import java.util.stream.Collectors
import java.util.stream.Stream

class UpcomingDepartures(request: RealTimeRequest, departureDtos: List<BusDepartureDto>) {

    companion object {
        val LINE = "5"
    }

    val departures : Stream<UpcomingDeparture> = departureDtos.stream()
            .filter { busDepartureDto -> request.acceptsDirection(busDepartureDto.directionName) }
            .filter { busDepartureDto -> request.acceptsLine(busDepartureDto.publishedLineName) }
            // Minimum expected departing time is the closest bus to leaving
            .sorted(Comparator.comparing(BusDepartureDto::getExpectedDepartureTime))
            .map { departure -> UpcomingDeparture(departure) }

    override fun toString(): String {
        return departures.collect(Collectors.toList()).joinToString(separator = "\n")
    }
}