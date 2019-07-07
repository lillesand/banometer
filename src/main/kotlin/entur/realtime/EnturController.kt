package entur.realtime

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class EnturController {

    var enturService = EnturService()

    @RequestMapping(path = arrayOf("/realtime"), produces = arrayOf("application/json"))
    @ResponseBody
    fun realtime(@RequestParam stopId: String): UpcomingDepartures {
        return enturService.fetchRealtime(RealTimeRequest(stopId = stopId))
    }


}

