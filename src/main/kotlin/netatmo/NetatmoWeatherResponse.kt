package netatmo

data class NetatmoWeatherResponse(
    val body: Body,
    val status: String,
    val time_exec: Double,
    val time_server: Int
) {
    data class Body(
        val devices: List<Device>,
        val user: User
    ) {
        data class Device(
            val _id: String,
            val co2_calibrating: Boolean,
            val dashboard_data: DashboardData?,
            val data_type: List<String>,
            val date_setup: Int,
            val firmware: Int,
            val last_setup: Int,
            val last_status_store: Int,
            val last_upgrade: Int,
            val module_name: String,
            val modules: List<Module>,
            val place: Place,
            val reachable: Boolean,
            val station_name: String,
            val type: String,
            val wifi_status: Int
        ) {
            data class DashboardData(
                val AbsolutePressure: Double,
                val CO2: Int,
                val Humidity: Int,
                val Noise: Int,
                val Pressure: Double,
                val Temperature: Double,
                val date_max_temp: Int,
                val date_min_temp: Int,
                val max_temp: Double,
                val min_temp: Double,
                val pressure_trend: String?,
                val temp_trend: String?,
                val time_utc: Int
            )

            data class Module(
                val _id: String,
                val battery_percent: Int,
                val battery_vp: Int,
                val dashboard_data: DashboardData?,
                val data_type: List<String>,
                val firmware: Int,
                val last_message: Int,
                val last_seen: Int,
                val last_setup: Int,
                val module_name: String?,
                val reachable: Boolean,
                val rf_status: Int,
                val type: String
            ) {
                data class DashboardData(
                    val Humidity: Int,
                    val Temperature: Double,
                    val date_max_temp: Int,
                    val date_min_temp: Int,
                    val max_temp: Double,
                    val min_temp: Double,
                    val temp_trend: String?,
                    val time_utc: Int
                )
            }

            data class Place(
                val altitude: Int,
                val city: String?,
                val country: String,
                val location: List<Double>,
                val timezone: String
            )
        }

        data class User(
            val administrative: Administrative,
            val mail: String
        ) {
            data class Administrative(
                val country: String,
                val feel_like_algo: Int,
                val lang: String,
                val pressureunit: Int,
                val reg_locale: String,
                val unit: Int,
                val windunit: Int
            )
        }
    }
}
