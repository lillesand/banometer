package weather

import java.time.Instant

data class MetCompactResponse(
    val geometry: Geometry,
    val properties: Properties,
    val type: String
) {
    data class Geometry(
        val coordinates: List<Double>,
        val type: String
    )

    data class Properties(
        val meta: Meta,
        val timeseries: List<Timeseries>
    )

    data class Meta(
            val units: Units,
            val updated_at: String
    )


    data class Units(
            val air_pressure_at_sea_level: String,
            val air_temperature: String,
            val cloud_area_fraction: String,
            val precipitation_amount: String,
            val relative_humidity: String,
            val wind_from_direction: String,
            val wind_speed: String
    )


    data class Timeseries(
            val data: TimeSeriesData,
            val time: java.time.Instant
    )

    data class TimeSeriesData(
            val instant: Instant,
            val next_12_hours: ForecastBlock?,
            val next_1_hours: ForecastBlock?,
            val next_6_hours: ForecastBlock?
    )


    data class Instant(
            val details: Details
    )

    data class Details(
            val air_pressure_at_sea_level: Double,
            val air_temperature: Double,
            val cloud_area_fraction: Double,
            val relative_humidity: Double,
            val wind_from_direction: Double,
            val wind_speed: Double
    )


    data class ForecastBlock(
            val details: PrecipiationDetails?,
            val summary: Summary
    )

    data class PrecipiationDetails(
            val precipitation_amount: Double
    )

    data class Summary(
            val symbol_code: String
    )

}
