package winesync

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDateTime
import java.time.temporal.ChronoField
import java.time.temporal.ChronoUnit
import java.util.concurrent.TimeUnit

@Controller
class WineController {

    val wineSync = WineSync(VivinoProperties("lillesand@gmail.com", "1235453"), AirtableProperties("appE2hzOYu6ksFXAw"))

    var lastDiff: LastDiff? = null


    @RequestMapping(path = ["/wine_status"], produces = ["application/json"])
    @ResponseBody
    fun status(): LastDiff {
        return lastDiff!!
    }

    @RequestMapping(path = ["/update_wines"], produces = ["application/json"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun execute(@RequestParam generatedId: String) {
        if (generatedId != lastDiff!!.generatedId) {
            throw RuntimeException("Provided diff ID ${generatedId} does not match expected ${lastDiff!!.generatedId}")
        }

        wineSync.execute(lastDiff!!.diff)
    }


    @Scheduled(initialDelay = 0, fixedRate = 30 * 60 * 1000)
    fun updateDiff() {
        val diff = wineSync.findDiff()
        val generatedTime = LocalDateTime.now()
        val generatedId = generatedTime.toString()
        lastDiff = LastDiff(generatedTime, generatedId, diff)
    }

    class LastDiff(val now: LocalDateTime, val generatedId: String, val diff: Diff)

}

