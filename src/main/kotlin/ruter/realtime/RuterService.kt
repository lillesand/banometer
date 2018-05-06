package ruter.realtime

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder

import java.io.IOException
import java.util.stream.Collectors

open class RuterService {

    private val mapper: ObjectMapper = ObjectMapper()
    private val httpClient: HttpClient

    init {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerKotlinModule()
                .registerModule(JavaTimeModule())

        mapper.propertyNamingStrategy = PropertyNamingStrategy.UpperCamelCaseStrategy()

        httpClient = HttpClientBuilder.create()
                .build()
    }

    fun fetchRealtimeInformation(): UpcomingDeparture? {
        return fetchRealtime(RealTimeRequest()).departures.firstOrNull()
    }

    open fun fetchRealtime(request: RealTimeRequest): UpcomingDepartures {
        try {
            val response = httpClient.execute(HttpGet("http://reisapi.ruter.no/StopVisit/GetDepartures/${request.stopId}"))

            response.entity.content.use { inputStream ->
                val departureDtos = mapper.readValue<List<DepartureDto>>(inputStream, object : TypeReference<List<DepartureDto>>() {})

                return UpcomingDepartures(request, departureDtos)
            }
        } catch (e: IOException) {
            throw RuterIOException(e)
        }

    }

}
