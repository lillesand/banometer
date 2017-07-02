package ruter.realtime

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class RuterController {

    var ruterService: RuterService = RuterService()

    @RequestMapping(path = arrayOf("/ruter"), produces = arrayOf("application/json"))
    @ResponseBody
    fun ruter(): UpcomingDeparture? {
        val realtimeInformation = ruterService.fetchRealtimeInformation()
        return realtimeInformation
    }
}