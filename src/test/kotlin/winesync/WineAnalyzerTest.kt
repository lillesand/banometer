package winesync

import org.junit.Assert.assertEquals
import org.junit.Test
import winesync.RatedWine as IRatedWine

class WineAnalyzerTest {

    @Test
    fun finds_highest_rated_wines() {
        val sut = WineAnalyzer()

        val highestRated = sut.highestRated(2, listOf(
                RatedWine("LowRatedWinery1", "LowRatedWine1", null, 3.7),
                RatedWine("LowRatedWinery2", "LowRatedWine2", null, 3.8),
                RatedWine("HighRatedWinery1", "HighRatedWine1", null, 4.1),
                RatedWine("HighRatedWinery2", "HighRatedWine2", null, 4.2)
        ))

        assertEquals(2, highestRated.size)
        assertEquals("HighRatedWine2", highestRated[0].name)
        assertEquals("HighRatedWine1", highestRated[1].name)
    }

    data class RatedWine(override val winery: String, override val name: String, override val vintage: String?, override val rating: Double) : IRatedWine

}
