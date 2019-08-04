package netatmo

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class NetatmoController {

    var netatmoService = NetatmoApi()

    @RequestMapping(path = ["/weather"], produces = ["application/json"])
    @ResponseBody
    fun weather(): Measurements {
        val weather = netatmoService.getMeasurements()
        val indoor = weather.body.devices.find { it.type == "NAMain" }!!
        val outdoor = indoor.modules.find { it.type == "NAModule1" }!!.dashboard_data

        return Measurements(indoor = MeasurementSet(indoor.dashboard_data.Temperature, indoor.dashboard_data.Humidity),
                outdoor = MeasurementSet(outdoor.Temperature, outdoor.Humidity))

    }

    data class Measurements(val indoor: MeasurementSet, val outdoor: MeasurementSet)

    data class MeasurementSet(val temperature: Double, val humidity: Int)
}
