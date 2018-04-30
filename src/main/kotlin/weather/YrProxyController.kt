package weather

import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.HttpClientBuilder
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody

@Controller
class YrProxyController {

    private val httpClient: HttpClient

    init {
        httpClient = HttpClientBuilder.create().build()
    }

    @RequestMapping(path = arrayOf("/place/{country}/{fylke}/{by}/{sted}/meteogram.svg"), produces = arrayOf("image/svg+xml"))
    fun meteogram(@PathVariable("country") country: String,
                  @PathVariable("fylke") fylke: String,
                  @PathVariable("by") by: String,
                  @PathVariable("sted") sted: String): ResponseEntity<StreamingResponseBody> {

        return ResponseEntity.ok()
                .contentType(MediaType("image", "svg+xml"))
                .body(StreamingResponseBody { outputStream ->
                    run {
                        val response = httpClient.execute(HttpGet("https://www.yr.no/place/${country}/${fylke}/${by}/${sted}/meteogram.svg"))
                        response.entity.writeTo(outputStream)
                    }
                })
    }

}

