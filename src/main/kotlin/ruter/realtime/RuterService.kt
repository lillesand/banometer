package ruter.realtime

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder

import java.io.IOException

class RuterService {

    private val mapper: ObjectMapper = ObjectMapper()
    private val httpClient: HttpClient

    init {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        mapper.propertyNamingStrategy = PropertyNamingStrategy.UpperCamelCaseStrategy()

        httpClient = HttpClientBuilder.create()
                .build()
    }

    fun fetchRealtimeInformation(): UpcomingDeparture {
        return fetchRealtime(RealTimeRequest()).departures.findFirst()
                .orElseThrow({ throw RuterException("No realtime data found :(") })
    }

    fun fetchRealtime(request: RealTimeRequest): UpcomingDepartures {
        try {
            val response = httpClient.execute(HttpGet("http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/${request.stopId}"))

            response.entity.content.use { inputStream ->
                val departureDtos = mapper.readValue<List<BusDepartureDto>>(inputStream, object : TypeReference<List<BusDepartureDto>>() {})

                return UpcomingDepartures(request, departureDtos)
            }
        } catch (e: IOException) {
            throw RuterIOException(e)
        }

    }

}
