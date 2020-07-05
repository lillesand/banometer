package netatmo

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class NetatmoController {

    private val netatmoService = NetatmoApi()

    @RequestMapping(path = ["/temperature"], produces = ["application/json"])
    @ResponseBody
    fun temperature(): Sensors {
        val weather = netatmoService.getMeasurements()

        val nydalen = weather.body.devices.map(json).find { device -> device.indoor.sensorName == "Indoor" }
        val ski = weather.body.devices.map(json).find { device -> device.indoor.sensorName == "Kjelleren" }
        return Sensors(nydalen, ski)
    }

    private val json = { mainModule: NetatmoWeatherResponse.Body.Device ->
        val indoor = SensorData(mainModule.module_name, mainModule.dashboard_data.Temperature, mainModule.dashboard_data.Humidity)

        val outdoor = mainModule.modules.find { it.type == "NAModule1" }?.let {
            SensorData(it.module_name ?: "Den andre", it.dashboard_data.Temperature, it.dashboard_data.Humidity)
        }

        SensorPair(indoor, outdoor)
    }

    data class Sensors(val nydalen: SensorPair?, val ski: SensorPair?)

    data class SensorPair(val indoor: SensorData, val outdoor: SensorData?)

    data class SensorData(val sensorName: String, val temperature: Double, val humidity: Int)
}
