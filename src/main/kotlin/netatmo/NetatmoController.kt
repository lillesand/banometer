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

        return Sensors(weather.body.devices.map(json).flatten())
    }

    private val json = { mainModule: NetatmoWeatherResponse.Body.Device ->
        val main = if (mainModule.dashboard_data != null) SensorData(mainModule.module_name, mainModule.dashboard_data.Temperature, mainModule.dashboard_data.Humidity) else null

        val modules = mainModule.modules.filter { it.dashboard_data != null }.map {
            SensorData(it.module_name ?: "${mainModule.station_name} (${it.type})", it.dashboard_data!!.Temperature, it.dashboard_data.Humidity)
        }

        listOfNotNull(main) + modules
    }

    data class Sensors(val sensors: List<SensorData>)

    data class SensorData(val name: String, val temperature: Double, val humidity: Int)
}
