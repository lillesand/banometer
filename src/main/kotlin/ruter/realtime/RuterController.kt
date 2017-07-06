package ruter.realtime

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class RuterController {

    var ruterService: RuterService = RuterService()

    @RequestMapping(path = arrayOf("/ruter"), produces = arrayOf("application/json"))
    @ResponseBody
    fun ruter(): UpcomingDepartures {
        val realtimeInformation = ruterService.fetchRealtime(RealTimeRequest(wantedDirection = 2, wantedLines =  listOf(5)))
        return realtimeInformation
    }
}