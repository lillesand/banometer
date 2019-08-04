package netatmo

import org.junit.Test

class NetatmoApiTest {

    @Test
    fun gets_outdoor_temperature() {
        val netatmo = NetatmoApi()
        println(netatmo.getMeasurements())
    }

}
