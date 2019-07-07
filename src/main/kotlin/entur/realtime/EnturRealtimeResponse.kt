package entur.realtime

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import java.time.Instant
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

data class EnturRealtimeResponse(
    val `data`: Data
)

data class Data(
        val stopPlace: StopPlace
)

data class StopPlace(
        val estimatedCalls: List<EstimatedCall>,
        val id: String,
        val name: String
)

data class EstimatedCall(
        val aimedArrivalTime: Instant,
        val aimedDepartureTime: Instant,
        val date: String,
        val destinationDisplay: DestinationDisplay,
        val expectedArrivalTime: Instant,
        val expectedDepartureTime: Instant,
        val quay: Quay,
        val realtime: Boolean,
        val serviceJourney: ServiceJourney
)

data class Quay(
        val id: String
)

data class DestinationDisplay(
        val frontText: String
)

data class ServiceJourney(
        val journeyPattern: JourneyPattern
)

data class JourneyPattern(
        val line: Line
)

data class Line(
        val id: String,
        val name: String,
        val transportMode: String
){

    fun localLineId(): String {
        if (id.contains(":")) {
            return id.substringAfterLast(":")
        }

        return id
    }

}

class DateTimeDeserializer : JsonDeserializer<Instant>() {
    private val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ")

    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): Instant {
            return ZonedDateTime.from(formatter.parse(p.text)).toInstant()
    }

}
