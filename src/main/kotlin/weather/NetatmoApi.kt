package weather

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import entur.realtime.DateTimeDeserializer
import org.apache.http.client.HttpClient
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.entity.UrlEncodedFormEntity
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClientBuilder
import org.apache.http.message.BasicNameValuePair
import java.time.Instant
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit

class NetatmoApi {

    private val httpClient: HttpClient
    private val mapper: ObjectMapper = ObjectMapper()

    private var oAuthTokens: OAuthTokenResponse? = null

    private val userPassword = System.getenv("NETATMO_PASSWORD") ?: throw RuntimeException("NETATMO_PASSWORD not set")
    private val clientSecret = System.getenv("NETATMO_CLIENT_SECRET") ?: throw RuntimeException("NETATMO_CLIENT_SECRET not set")

    private val oAuthClientCredentials = listOf(
            BasicNameValuePair("client_id", "5d4428edffda1e00186ecfad"),
            BasicNameValuePair("client_secret", clientSecret)
    )

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

    fun getMeasurements(): NetatmoWeatherResponse {
        if (oAuthTokens == null || oAuthTokens!!.isError()) {
            this.oAuthTokens = refreshAuthentication()
        } else if (oAuthTokens!!.hasExpired()) {
            this.oAuthTokens = refreshAuthentication(oAuthTokens)
        }

        val post = HttpPost("https://api.netatmo.com/api/getstationsdata")
        post.entity = UrlEncodedFormEntity(listOf(BasicNameValuePair("access_token", this.oAuthTokens!!.access_token)))

        val httpResponse = httpClient.execute(post)

        httpResponse.entity.content.bufferedReader().use {
            return mapper.readValue(it, NetatmoWeatherResponse::class.java)
        }
    }


    private fun refreshAuthentication(oAuthTokens: OAuthTokenResponse? = null): OAuthTokenResponse? {
        val post = HttpPost("https://api.netatmo.com/oauth2/token")

        val authentication: List<BasicNameValuePair>
        if (oAuthTokens == null) {
            authentication = listOf(
                    BasicNameValuePair("grant_type", "password"),
                    BasicNameValuePair("username", "lillesand@gmail.com"),
                    BasicNameValuePair("password", userPassword)
            )
        } else {
            authentication = listOf(
                    BasicNameValuePair("grant_type", "refresh_token"),
                    BasicNameValuePair("refresh_token", this.oAuthTokens!!.refresh_token)
            )
        }

        post.entity = UrlEncodedFormEntity(this.oAuthClientCredentials.union(authentication))

        val response = httpClient.execute(post)

        response.entity.content.bufferedReader(Charsets.UTF_8).use {
            val jsonResponse = mapper.readValue(it, OAuthTokenResponse::class.java)
            if (jsonResponse.error != null) {
                throw NetatmoException("Failed getting refresh token from password: ${jsonResponse.error}")
            } else {
                return jsonResponse
            }
        }
    }



    data class OAuthTokenResponse(val access_token: String?, val refresh_token: String?, val expires_in: Int?, val error: String?) {

        private val issued: LocalDateTime = LocalDateTime.now()

        fun hasExpired(): Boolean {
            return issued.plus(expires_in!!.toLong(), ChronoUnit.MILLIS) < LocalDateTime.now()
        }

        fun isError(): Boolean {
            return error != null
        }

    }

}

class NetatmoException(s: String) : Exception(s)
