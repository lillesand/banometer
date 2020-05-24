package netatmo

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class NetatmoController {

    var netatmoService = NetatmoApi()

    @RequestMapping(path = ["/temperature"], produces = ["application/json"])
    @ResponseBody
    fun temperature(): List<SensorPair> {
        val weather = netatmoService.getMeasurements()

        return weather.body.devices.map { mainModule ->
            val indoor = SensorData(mainModule.module_name, mainModule.dashboard_data.Temperature, mainModule.dashboard_data.Humidity)

            val outdoor = mainModule.modules.find { it.type == "NAModule1" }?.let {
                SensorData(it.module_name ?: "Den andre", it.dashboard_data.Temperature, it.dashboard_data.Humidity)
            }

            SensorPair(indoor, outdoor)
        }
    }

    data class SensorPair(val indoor: SensorData, val outdoor: SensorData?)

    data class SensorData(val sensorName: String, val temperature: Double, val humidity: Int)
}


fun main() {
    val value: String? = "Heisann"

    value?.let {
        it.length
    }
}
