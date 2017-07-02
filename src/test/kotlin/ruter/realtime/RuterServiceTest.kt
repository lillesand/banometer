package ruter.realtime

import org.junit.Test
import java.util.*


class RuterServiceTest {

    val sut = RuterService()

    @Test
    fun call_ruter() {
        val realtimeInformation = sut.fetchRealtimeInformation()

        println(realtimeInformation)
    }

    @Test
    fun all_coming_departures() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest())

        println(upcomingDepartures)
    }

    @Test
    fun eastbound_5_from_nydalen() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stopId = "3012130", wantedDirection = 2, wantedLines = listOf(5)))

        println(upcomingDepartures)
    }

    @Test
    fun westbound_5_or_4_from_nydalen() {
        val upcomingDepartures = sut.fetchRealtime(RealTimeRequest(stopId = "3012130", wantedDirection = 1, wantedLines = listOf(4, 5)))

        println(upcomingDepartures)
    }

}