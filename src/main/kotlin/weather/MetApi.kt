package weather

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder

internal val objectMapper = ObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .registerModule(JavaTimeModule())
        .registerKotlinModule()

internal val requestConfig: RequestConfig = RequestConfig.custom()
        .setConnectTimeout(2500)
        .setSocketTimeout(5000)
        .build()

internal val httpClient = HttpClientBuilder.create()
        .setUserAgent("Joran Vagnby Lillesand (lillesand@gmail.com) - Banometer")
        .setDefaultRequestConfig(requestConfig)
        .setDefaultHeaders(listOf())
        .build()


fun getWeatherForecast(): MetCompactResponse {
    val get = HttpGet("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.9424&lon=10.7683")
    httpClient.execute(get).entity.content.bufferedReader().use {
        return objectMapper.readValue(it, MetCompactResponse::class.java)
    }
}


fun main() {
    println(getWeatherForecast())
}
