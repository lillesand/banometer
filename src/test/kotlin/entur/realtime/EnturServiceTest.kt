package entur.realtime

import org.junit.Test
import java.util.*


class EnturServiceTest {

    private val sut = EnturService()

    @Test
    fun all_coming_departures() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stops = listOf("NSR:StopPlace:6073")))

        println(upcomingDepartures)
    }

    @Test
    fun multiple_stops() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stops = listOf("NSR:StopPlace:6073", "NSR:StopPlace:59649")))

        println(upcomingDepartures)
    }

    @Test
    fun eastbound_5_from_nydalen() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stops = listOf("NSR:StopPlace:6073"), wantedQuay = "NSR:Quay:11153", wantedLines = listOf("RUT:Line:5")))

        println(upcomingDepartures)
    }

    @Test
    fun westbound_5_or_4_from_nydalen() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stops = listOf("NSR:StopPlace:6073"), wantedQuay = "NSR:Quay:11151", wantedLines = listOf("RUT:Line:4", "RUT:Line:5")))

        println(upcomingDepartures)
    }


}
