package ruter.realtime

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import org.apache.http.client.HttpClient
import org.apache.http.impl.client.HttpClientBuilder

import java.time.Instant
import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit

class FakeRuterService : RuterService() {

    private val mapper: ObjectMapper = ObjectMapper()
    private val httpClient: HttpClient

    init {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        mapper.propertyNamingStrategy = PropertyNamingStrategy.UpperCamelCaseStrategy()

        httpClient = HttpClientBuilder.create()
                .build()
    }

    override fun fetchRealtime(request: RealTimeRequest): UpcomingDepartures {
        Thread.sleep((Math.random() * 5000).toLong());
        return UpcomingDepartures(RealTimeRequest(), listOf(
                departsIn("1", 3, ChronoUnit.MINUTES),
                departsIn("1", 11, ChronoUnit.MINUTES),
                departsIn("1", 32, ChronoUnit.MINUTES),
                departsIn("1", 48, ChronoUnit.MINUTES),
                departsIn("2", 5, ChronoUnit.MINUTES),
                departsIn("2", 16, ChronoUnit.MINUTES),
                departsIn("2", 28, ChronoUnit.MINUTES),
                departsIn("2", 34, ChronoUnit.MINUTES)
            )
        )
    }

    private fun departsIn(directionName: String, time: Long, unit: ChronoUnit): DepartureDto {
        return DepartureDto(
                MonitoredVehicleJourneyDto("Ringen Fake", directionName, "5",
                        MonitoredCall(ZonedDateTime.now().plus(time, unit)))
        )
    }

}
