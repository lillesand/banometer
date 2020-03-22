package winesync

import org.apache.http.client.config.RequestConfig
import org.apache.http.entity.ContentType
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.CloseableHttpClient
import org.apache.http.impl.client.HttpClientBuilder
import java.io.ByteArrayOutputStream


class VivinoWebScraper(private val vivinoProperties: VivinoProperties) {

    private val httpClient: CloseableHttpClient
    private val vivinoCsvReader = VivinoCsvReader()


    init {
        val requestConfig = RequestConfig.custom()
                .setConnectTimeout(4000)
                .setSocketTimeout(60000)
                .setCookieSpec(CookieSpecs.STANDARD)
                .build()

        httpClient = HttpClientBuilder.create()
                .setDefaultRequestConfig(requestConfig)
                .build()
    }

    fun getCellar(): WinesFromVivino {
        login(vivinoProperties.username, vivinoProperties.password)
        return downloadCellar()
    }

    private fun login(username: String, password: String) {
        val csrfToken = getCsrfToken()

        val post = HttpPost("https://www.vivino.com/api/login")
        post.addHeader("x-csrf-token", csrfToken)
        post.addHeader("Accept", "application/json")
        post.entity = StringEntity("{\"email\":\"$username\",\"password\":\"$password\"}", ContentType.APPLICATION_JSON)

        httpClient.execute(post).use {
            if (it.statusLine.statusCode != 200) {
                throw VivinoException("Vivino login failed with code ${it.statusLine.statusCode}")
            }

            val response = it.entity.content.bufferedReader().use { responseReader -> responseReader.readText() }

            if (!response.contains("\"success\":true")) {
                throw VivinoException("Vivino login failed:\n$response")
            }
        }
    }

    private fun downloadCellar(): WinesFromVivino {
        val get = HttpGet("https://www.vivino.com/users/${vivinoProperties.userId}/export.csv?data=cellar")

        httpClient.execute(get).use {
            if (it.statusLine.statusCode != 200) {
                throw VivinoException("Vivino cellar download failed with code ${it.statusLine.statusCode}")
            }

            return vivinoCsvReader.read(it.entity.content.bufferedReader())
        }
    }

    private fun getCsrfToken(): String {
        httpClient.execute(HttpGet("https://www.vivino.com")).use {
            val frontpageBytes = ByteArrayOutputStream()
            it.entity.writeTo(frontpageBytes)

            val frontPageHtml = frontpageBytes.toString("utf-8")
            val csrfToken = frontPageHtml.substringAfter("<meta name=\"csrf-token\" content=\"").substringBefore("\" />")

            return csrfToken
        }
    }

}

class VivinoException(msg: String) : Throwable(msg)
