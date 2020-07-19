package entur.realtime

import java.util.*
import java.util.stream.Collectors

class UpcomingDepartures(request: RealTimeRequest, stopPlaces: List<StopPlace>)  {

    val departures : List<UpcomingDeparture> = stopPlaces.stream()
            .map { it.estimatedCalls }
            .collect(Collectors.toList()).flatten().stream()
            .filter { estimatedCall ->  request.acceptsLine(estimatedCall.serviceJourney.journeyPattern.line.id)}
            .filter { estimatedCall -> request.acceptsQuay(estimatedCall.quay.id) }
            // Minimum expected departing time is the closest bus to leaving
            .sorted(Comparator.comparing { estimatedCall: EstimatedCall -> estimatedCall.expectedArrivalTime })
            .map { departure -> UpcomingDeparture(departure) }
            .collect(Collectors.toList())

    override fun toString(): String {
        return departures.joinToString(separator = "\n")
    }
}
