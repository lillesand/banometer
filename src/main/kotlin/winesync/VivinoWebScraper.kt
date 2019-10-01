package winesync

import org.apache.http.client.config.RequestConfig
import org.apache.http.entity.ContentType
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClients
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.time.temporal.ChronoUnit


class VivinoWebScraper(private val vivinoProperties: VivinoProperties) {

    private val requestConfig = RequestConfig.custom()
            .setConnectTimeout(4000)
            .setSocketTimeout(120000)
            .setCookieSpec(CookieSpecs.STANDARD)
            .build()

    private val httpClient = HttpClients.custom()
            .setDefaultRequestConfig(requestConfig)
            .build()

    fun getCellar(): InputStream {
        login(vivinoProperties.username, vivinoProperties.password)
        return downloadCellar()
    }

    internal fun login(username: String, password: String) {
        val csrfToken = getCsrfToken()

        val post = HttpPost("https://www.vivino.com/api/login")
        post.addHeader("x-csrf-token", csrfToken)
        post.addHeader("Accept", "application/json")
        post.entity = StringEntity("{\"email\":\"$username\",\"password\":\"$password\"}", ContentType.APPLICATION_JSON)

        val httpResponse = httpClient.execute(post)

        if (httpResponse.statusLine.statusCode != 200) {
            throw VivinoException("Vivino login failed with code ${httpResponse.statusLine.statusCode}")
        }

        val response = httpResponse.entity.content.bufferedReader().use { it.readText() }

        if (!response.contains("\"success\":true")) {
            throw VivinoException("Vivino login failed:\n$response")
        }
    }

    internal fun downloadCellar(): InputStream {
        val get = HttpGet("https://www.vivino.com/users/${vivinoProperties.userId}/export.csv?data=cellar")

        val response = httpClient.execute(get)

        if (response.statusLine.statusCode != 200) {
            throw VivinoException("Vivino cellar download failed with code ${response.statusLine.statusCode}")
        }

        return response.entity.content!!
    }

    private fun getCsrfToken(): String {
        val frontPage = httpClient.execute(HttpGet("https://www.vivino.com"))

        val frontpageBytes = ByteArrayOutputStream()
        frontPage.entity.writeTo(frontpageBytes)

        val frontPageHtml = frontpageBytes.toString("utf-8")
        val csrfToken = frontPageHtml.substringAfter("<meta name=\"csrf-token\" content=\"").substringBefore("\" />")

        frontPage.close()
        return csrfToken
    }

}

class VivinoException(msg: String) : Throwable(msg)
