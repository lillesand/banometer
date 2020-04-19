package weather

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled

class CachedPollenCountApi {

    private val api = PollenCountApi()
    private val log = LoggerFactory.getLogger(this.javaClass)

    private var pollenCount: List<PollenCountForDay>? = null


    fun getPollenCount(): List<PollenCountForDay>? {
        if (pollenCount == null) {
            updatePollenCount()
        }

        return pollenCount
    }

    @Scheduled(cron = "0 3 * * *")
    fun updatePollenCount() {
        log.info("Refreshing pollen count")
        pollenCount = api.getPollenCount()
        log.info("Refreshed pollen count")
    }

}
