package weather

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import entur.realtime.DateTimeDeserializer
import org.apache.http.client.HttpClient
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder
import java.time.Instant

class PollenCountApi {

    private val url = "https://pollenkontroll.no/api/pollen-count?country=no"
    private val httpClient: HttpClient
    private val mapper: ObjectMapper = ObjectMapper()

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

    fun getPollenCount(): List<PollenCountForDay>? {
        val pollenCountForOslo = invokeApi().cities.find {
            it.name.contains("Oslo")
        }

        return pollenCountForOslo?.days?.map { day ->
            val mappedDays = day.allergens.filter {
                it.level_number != 0
            }.map {
                PollenCountForDay.Allergen(it.level_description, it.level_number, it.type)
            }

            PollenCountForDay(mappedDays, day.date, day.name)
        }
    }

    private fun invokeApi(): PollenCountResponse {
        val request = HttpGet(url)

        val httpResponse = httpClient.execute(request)

        httpResponse.entity.content.bufferedReader().use {
            return mapper.readValue(it, PollenCountResponse::class.java)
        }
    }


}

fun main() {


    println(PollenCountApi().getPollenCount())

}
