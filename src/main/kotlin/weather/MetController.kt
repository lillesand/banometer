package weather

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.time.temporal.ChronoUnit.DAYS
import java.time.temporal.TemporalUnit
import java.util.*
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
                    dayString(it.time),
                    it.time.atZone(ZoneId.systemDefault()).format(DateTimeFormatter.ofPattern("HH:mm")),
                    details.air_temperature,
                    forecastDetails.precipitation_amount,
                    details.wind_from_direction,
                    windDirection(details.wind_from_direction),
                    details.wind_speed,
                    it.data.next_1_hours.summary.symbol_code)
        }

        return MetWeatherForecast(forecast)
    }

    private fun dayString(time: Instant): String {
        return when (val day = time.atZone(ZoneId.systemDefault()).toLocalDate()) {
            LocalDate.now() -> "I dag"
            LocalDate.now().plus(1, DAYS) -> "I morgen"
            LocalDate.now().plus(2, DAYS) -> "Overimorgen"
            else -> day.format(DateTimeFormatter.ofPattern("dd.MM"))
        }
    }

}

data class MetWeatherForecast(val forecast: List<MetHourlyForecast>)

data class MetHourlyForecast(val instant: Instant,
                             val dayString: String,
                             val time: String,
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
