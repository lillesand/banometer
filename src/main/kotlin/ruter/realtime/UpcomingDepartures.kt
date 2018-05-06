package ruter.realtime

import java.util.Comparator
import java.util.stream.Collectors

class UpcomingDepartures(request: RealTimeRequest, departureDtos: List<DepartureDto>) {

    val departures : List<UpcomingDeparture> = departureDtos.stream()
            .filter { busDepartureDto -> request.acceptsDirection(busDepartureDto.monitoredVehicleJourney.directionName) }
            .filter { busDepartureDto -> request.acceptsLine(busDepartureDto.monitoredVehicleJourney.publishedLineName) }
            // Minimum expected departing time is the closest bus to leaving
            .sorted(Comparator.comparing { departure: DepartureDto -> departure.monitoredVehicleJourney.monitoredCall.expectedDepartureTime })
            .map { departure -> UpcomingDeparture(departure) }
            .collect(Collectors.toList())

    override fun toString(): String {
        return departures.joinToString(separator = "\n")
    }
}