package entur.realtime

import java.util.*
import java.util.stream.Collectors

class UpcomingDepartures(request: RealTimeRequest, estimatedCalls: List<EstimatedCall>)  {

    val departures : List<UpcomingDeparture> = estimatedCalls.stream()
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
