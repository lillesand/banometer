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
    private var lastWineStatus: LastWineStatus? = null
    private val log = LoggerFactory.getLogger(this.javaClass)

    @RequestMapping(path = ["/wine_status"], produces = ["application/json"])
    @ResponseBody
    fun status(): LastWineStatus {
        if (lastWineStatus == null) {
            updateDiff()
        }
        return lastWineStatus!!
    }

    @RequestMapping(path = ["/update_wines"], produces = ["text/plain"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun execute(@RequestParam generatedId: String): String {
        if (generatedId != lastWineStatus!!.generatedId) {
            throw RuntimeException("Provided diff ID $generatedId does not match expected ${lastWineStatus!!.generatedId}")
        }

        wineSync.synchronizeVivinoAndAirtable(lastWineStatus!!.wineStatus.diff)
        updateDiff();
        return "Okee dokee!"
    }


    @Scheduled(initialDelay = 0, fixedRate = 30 * 60 * 1000)
    fun updateDiff() {
        log.info("Updating wines")
        val diff = wineSync.getWineStatus()
        val generatedTime = LocalDateTime.now()
        val generatedId = generatedTime.toString()
        lastWineStatus = LastWineStatus(generatedTime, generatedId, diff)
        log.info("Generated diff of ${lastWineStatus!!.wineStatus.diff.getNumberOfBottlesNeedSync()} bottles")
    }

    class LastWineStatus(val now: LocalDateTime, val generatedId: String, val wineStatus: WineStatus)

}

