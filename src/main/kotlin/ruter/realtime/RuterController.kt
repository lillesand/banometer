package ruter.realtime

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class RuterController {

    var ruterService: RuterService = RuterService()

    @RequestMapping(path = arrayOf("/ruter"), produces = arrayOf("application/json"))
    @ResponseBody
    fun ruter(@RequestParam stopId: String): UpcomingDepartures {
        val realtimeInformation = ruterService.fetchRealtime(RealTimeRequest(stopId = stopId))
        return realtimeInformation
    }
}