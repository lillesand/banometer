package ruter.realtime

import org.junit.Test


class RuterServiceTest {

    @Test
    fun call_ruter() {
        val sut = RuterService()
        val realtimeInformation = sut.fetchRealtimeInformation()

        println(realtimeInformation)
    }

}