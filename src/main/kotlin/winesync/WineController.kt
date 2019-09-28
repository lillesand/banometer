package winesync

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDateTime

@Controller
class WineController {

    private val wineSync = WineSync(VivinoProperties("lillesand@gmail.com", "1235453"), AirtableProperties("appE2hzOYu6ksFXAw"))
    private var lastDiff: LastDiff? = null
    private val log = LoggerFactory.getLogger(this.javaClass)

    @RequestMapping(path = ["/wine_status"], produces = ["application/json"])
    @ResponseBody
    fun status(): LastDiff {
        if (lastDiff == null) {
            updateDiff()
        }
        return lastDiff!!
    }

    @RequestMapping(path = ["/update_wines"], produces = ["text/plain"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun execute(@RequestParam generatedId: String): String {
        if (generatedId != lastDiff!!.generatedId) {
            throw RuntimeException("Provided diff ID $generatedId does not match expected ${lastDiff!!.generatedId}")
        }

        wineSync.execute(lastDiff!!.diff)

        return "Okee dokee!"
    }


    @Scheduled(fixedRate = 30 * 60 * 1000)
    fun updateDiff() {
        log.info("Updating wines")
        val diff = wineSync.findDiff()
        val generatedTime = LocalDateTime.now()
        val generatedId = generatedTime.toString()
        lastDiff = LastDiff(generatedTime, generatedId, diff)
        log.info("Generated diff of ${lastDiff!!.diff.getNumberOfBottlesNeedSync()} bottles")
    }

    class LastDiff(val now: LocalDateTime, val generatedId: String, val diff: Diff)

}

