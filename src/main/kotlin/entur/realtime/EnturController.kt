package entur.realtime

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class EnturController {

    private var enturService = EnturService()

    @RequestMapping(path = ["/realtime"], produces = ["application/json"])
    @ResponseBody
    fun realtime(@RequestParam stopId: String, @RequestParam lines: String?): UpcomingDepartures {
        val stops = stopId.split(",")
        val lines = lines?.split(",").orEmpty()
        return enturService.fetchRealtime(RealTimeRequest(stops = stops, wantedLines = lines))
    }


}

