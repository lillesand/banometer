package banometer

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody
import java.io.ByteArrayInputStream
import java.io.InputStream
import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread

@Controller
class MaintenanceController {

    @RequestMapping(path = [ "/maintenance/pull" ], method = [ RequestMethod.POST ])
    @ResponseBody
    fun update(): ResponseEntity<StreamingResponseBody> {
        return exec("git pull", 20, TimeUnit.SECONDS)
    }

    @RequestMapping(path = [ "/maintenance/build" ], method = [ RequestMethod.POST ])
    @ResponseBody
    fun build(): ResponseEntity<StreamingResponseBody> {
        return exec("./gradlew build -x test", 2, TimeUnit.MINUTES)
    }

    @RequestMapping(path = [ "/maintenance/restart" ], method = [ RequestMethod.POST ])
    @ResponseBody
    fun restart(): String {
        thread {
            // Allow some time for the request to return first
            Thread.sleep(200);

            Runtime.getRuntime().exec(arrayOf("./scripts/start.sh", "5"))
            System.exit(0);
        }

        return "Okay, triggering restart!";
    }

    @RequestMapping(path = [ "/up" ], method = [ RequestMethod.GET ])
    fun up(): String {
        return "Yes, yes, I'm up.";
    }

    private fun exec(command: String, time: Long, timeUnit: TimeUnit): ResponseEntity<StreamingResponseBody> {
        val process = Runtime.getRuntime().exec(command)
        val finished = process.waitFor(time, timeUnit);

        if (!finished) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseBody(ByteArrayInputStream("Did not finish in time".toByteArray(StandardCharsets.UTF_8))))
        }

        return if (process.exitValue() == 0) {
            ResponseEntity.ok()
                    .body(responseBody(process.inputStream))

        } else {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseBody(process.errorStream))
        }
    }

    private fun responseBody(stream: InputStream): StreamingResponseBody {
        return StreamingResponseBody { outputStream ->
            stream.use { it.copyTo(outputStream) }
        }
    }
}
