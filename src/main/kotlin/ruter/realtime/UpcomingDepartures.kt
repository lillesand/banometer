package ruter.realtime

import java.util.Comparator
import java.util.stream.Collectors
import java.util.stream.Stream

class UpcomingDepartures(request: RealTimeRequest, departureDtos: List<BusDepartureDto>) {

    val departures : List<UpcomingDeparture> = departureDtos.stream()
            .filter { busDepartureDto -> request.acceptsDirection(busDepartureDto.directionName) }
            .filter { busDepartureDto -> request.acceptsLine(busDepartureDto.publishedLineName) }
            // Minimum expected departing time is the closest bus to leaving
            .sorted(Comparator.comparing(BusDepartureDto::getExpectedDepartureTime))
            .map { departure -> UpcomingDeparture(departure) }
            .collect(Collectors.toList())

    override fun toString(): String {
        return departures.joinToString(separator = "\n")
    }
}