package weather

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class WeatherController {

    private val netatmoService = NetatmoApi()
    private val pollenService = CachedPollenCountApi()

    @RequestMapping(path = ["/temperature"], produces = ["application/json"])
    @ResponseBody
    fun temperature(): Measurements {
        val weather = netatmoService.getMeasurements()
        val indoor = weather.body.devices.find { it.type == "NAMain" }!!
        val outdoor = indoor.modules.find { it.type == "NAModule1" }!!.dashboard_data

        val pollen = pollenService.getPollenCount()

        return Measurements(indoor = MeasurementSet(indoor.dashboard_data.Temperature, indoor.dashboard_data.Humidity),
                outdoor = MeasurementSet(outdoor.Temperature, outdoor.Humidity),
                pollenCount = pollen)

    }

    data class Measurements(val indoor: MeasurementSet, val outdoor: MeasurementSet, val pollenCount: List<PollenCountForDay>?)

    data class MeasurementSet(val temperature: Double, val humidity: Int)
}
