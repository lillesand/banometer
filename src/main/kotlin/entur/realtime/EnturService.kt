package entur.realtime

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import exceptions.BanometerIOException
import org.apache.http.client.HttpClient
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClientBuilder
import java.io.IOException
import java.time.Instant

class EnturService {

    private val mapper: ObjectMapper = ObjectMapper()
    private val httpClient: HttpClient

    init {

        val javaTimeModule = JavaTimeModule()
        javaTimeModule.addDeserializer(Instant::class.java, DateTimeDeserializer())

        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerKotlinModule()
                .registerModule(javaTimeModule)

        val requestConfig = RequestConfig.custom()
                .setConnectTimeout(2500)
                .setSocketTimeout(5000)
                .build()

        httpClient = HttpClientBuilder.create()
                .setDefaultRequestConfig(requestConfig)
                .build()
    }

    fun fetchRealtime(request: RealTimeRequest): UpcomingDepartures {
        try {
            val post = HttpPost("https://api.entur.io/journey-planner/v2/graphql")
            post.addHeader("ET-Client-Name", "Joran Vagnby Lillesand (lillesand@gmail.com) - Banometer")
            post.addHeader("Content-Type", "application/graphql")
            post.addHeader("Accept", "application/json")
            post.entity = StringEntity(graphqlRequest(request.stops, request.wantedLines))
            val response = httpClient.execute(post)


            response.entity.content.use { inputStream ->
                val jsonResponse = mapper.readValue<EnturRealtimeResponse>(inputStream, object : TypeReference<EnturRealtimeResponse>() {})
                return UpcomingDepartures(request, jsonResponse.data.stopPlaces)
            }
        } catch (e: IOException) {
            throw BanometerIOException(e)
        }

    }


    private fun graphqlRequest(stops: List<String>, lines: List<String>) : String {
        val stopsString = stops.joinToString(",") { "\"${it}\"" }
        val linesQuery = if (lines.isEmpty()) "" else ", whiteListed: { lines: [" + lines.joinToString(",") { "\"${it}\"" } +  "] }"
        return """
            {
              stopPlaces(ids: [ $stopsString ]) {
                id
                name
                estimatedCalls(timeRange: 10800, numberOfDepartures: 10 ${linesQuery}) {
                  realtime
                  aimedArrivalTime
                  aimedDepartureTime
                  expectedArrivalTime
                  expectedDepartureTime
                  actualArrivalTime
                  actualDepartureTime
                  date
                  destinationDisplay {
                    frontText
                  }
                  quay {
                    id
                  }
                  serviceJourney {
                    journeyPattern {
                      line {
                        id
                        name
                        transportMode
                      }
                    }
                  }
                }
              }
            }

        """.trimIndent()
    }


}
