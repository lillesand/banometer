package weather

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.time.Instant
import kotlin.math.absoluteValue
import kotlin.math.roundToInt

@Controller
class MetController {
    @RequestMapping(path = ["/forecast"], produces = ["application/json"])
    @ResponseBody
    fun forecast(): MetWeatherForecast? {
        val forecast = getWeatherForecast().properties.timeseries.filter { it.data.next_1_hours?.details != null }.map {
            val details = it.data.instant.details
            val forecastDetails = it.data.next_1_hours!!.details!!
            MetHourlyForecast(it.time,
                    details.air_temperature,
                    forecastDetails.precipitation_amount,
                    details.wind_from_direction,
                    windDirection(details.wind_from_direction),
                    details.wind_speed,
                    it.data.next_1_hours.summary.symbol_code)
        }

        return MetWeatherForecast(forecast)
    }

}

data class MetWeatherForecast(val forecast: List<MetHourlyForecast>)

data class MetHourlyForecast(val instant: Instant,
                             val temperature: Double,
                             val precipiation: Double,
                             val windFromDirection: Double,
                             val windFromDirectionWord: String,
                             val windSpeed: Double,
                             val symbol: String)

internal val windDirections = listOf("Nord", "Nord-øst", "Øst", "Sør-øst", "Sør", "Sør-vest", "Vest", "Nord-vest")

internal fun windDirection(degrees: Double): String {
    val sectorSize = 360 / windDirections.size
    val sector = ((degrees / sectorSize).absoluteValue).roundToInt()
    return windDirections[sector % windDirections.size]
}
