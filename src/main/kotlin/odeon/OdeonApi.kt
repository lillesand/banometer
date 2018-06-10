package odeon

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import exceptions.BanometerIOException
import org.apache.http.client.HttpClient
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClientBuilder
import java.io.IOException
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

open class OdeonApi {

    private val mapper: ObjectMapper = ObjectMapper()
    private val httpClient: HttpClient

    init {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerKotlinModule()
                .registerModule(JavaTimeModule())

        val requestConfig = RequestConfig.custom()
                .setConnectTimeout(2500)
                .setSocketTimeout(5000)
                .build()

        httpClient = HttpClientBuilder.create()
                .setDefaultRequestConfig(requestConfig)
                .build()
    }

    open fun fetchMovies(fromDate: LocalDateTime, toDate: LocalDate, rooms: List<String>): List<Show> {
        try {
            val from = fromDate.withMinute(0).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            val to = toDate.format(DateTimeFormatter.ISO_DATE)
            val response = httpClient.execute(HttpGet("https://www.odeonkino.no/api/v2/show/no/1/250?filter.countryAlias=no&filter.cityAlias=OS&filter.timeUtc.greaterThanOrEqualTo=$from&filter.timeUtc.lessThanOrEqualTo=$to&filter.cinemaNcgId=NCG88462&filter.attributeAliasOperator=And"))

            response.entity.content.use {
                val movies = mapper.readValue<CinemaResponse>(it, object : TypeReference<CinemaResponse>() {})
                val luxeMovies = movies.items.filter { rooms.contains(it.screen.title) }

                if (luxeMovies.isEmpty()) {
                    return emptyList();
                }

                val bookings = fetchBookings(luxeMovies)
                val shows = luxeMovies.map { Show(it.time, it.movie.title, bookings.freeSeatsForId(it.remoteEntityId)) }

                return shows
            }
        } catch (e: IOException) {
            throw BanometerIOException(e)
        }

    }

    private fun fetchBookings(luxeMovies: List<CinemaResponse.Item>): Bookings {
        // Okay, exotic bug time: it appears that the Sys99 booking system mixes request for the same time on different days.
        // This doesn't appear to affect odeon.no because they only group shows by day. So, make 1 request for each day. Brittle? Nah, bro.
        val systemAliases = luxeMovies.map { it.remoteEntityId }.groupBy {
            // Example value: AA-1084-201806021900
            it.substring(8, 16)
        }

        return Bookings(systemAliases.values.map { seatStatus(it) }.flatten())
    }

    private fun seatStatus(systemAliases: List<String>): List<NumberOfSeatsResponse> {
        val request = mapper.writeValueAsString(NumberOfSeatsRequest(systemAliases.map { NumberOfSeatsRequest.ShowRemoteEntityId(it) }))
        val httpPost = HttpPost("https://www.odeonkino.no/api/v2/show/seatstatussummary/Sys99-NO")
        httpPost.setHeader("Content-Type", "application/json")
        httpPost.entity = StringEntity(request)

        val response = httpClient.execute(httpPost)
        response.entity.content.use {
            val string = it.bufferedReader().readText()
            return mapper.readValue<List<NumberOfSeatsResponse>>(string.byteInputStream(), object : TypeReference<List<NumberOfSeatsResponse>>() {})
        }
    }

    data class Show(
            val time: ZonedDateTime,
            val title: String,
            val bookableSeats: String
    )

    data class Bookings(
            val bookings: List<NumberOfSeatsResponse>
    ) {
        fun freeSeatsForId(remoteEntityId: String): String {
            val seats = bookings.find { it.showRemoteEntityId == remoteEntityId }
            if (seats == null) {
                println(remoteEntityId)
                println(bookings)
                return "🤷‍♂️";
            }
            return seats.status.available.toString()
        }
    }


}