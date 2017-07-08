package ruter.realtime

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import org.apache.http.client.HttpClient
import org.apache.http.impl.client.HttpClientBuilder

import java.time.Instant
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
        return UpcomingDepartures(RealTimeRequest(), listOf(
                departsIn(5, ChronoUnit.MINUTES),
                departsIn(16, ChronoUnit.MINUTES),
                departsIn(28, ChronoUnit.MINUTES),
                departsIn(34, ChronoUnit.MINUTES)
            )
        )
    }

    private fun departsIn(time: Long, unit: ChronoUnit): BusDepartureDto {
        val busDepartureDto = BusDepartureDto()
        busDepartureDto.directionName = "2"
        busDepartureDto.publishedLineName = "5"
        busDepartureDto.destinationName = "Ringen Fake"
        busDepartureDto.expectedDepartureTime = Instant.now().plus(time, unit)
        return busDepartureDto
    }

}
