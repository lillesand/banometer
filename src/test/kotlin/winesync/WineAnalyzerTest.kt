package winesync

import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.Instant
import java.time.temporal.ChronoUnit.DAYS
import java.time.temporal.ChronoUnit.HOURS
import winesync.RatedWine as IRatedWine
import winesync.ScannedWine as IScannedWine
import winesync.WineAmount as IWineAmount

class WineAnalyzerTest {

    private val sut = WineAnalyzer()

    @Test
    fun finds_highest_rated_wines() {
        val highestRated = sut.highestRated(2, listOf(
                RatedWine("LowRatedWine1", 3.7),
                RatedWine("LowRatedWine2", 3.8),
                RatedWine("HighRatedWine1", 4.1),
                RatedWine("HighRatedWine2", 4.2)
        ))

        assertEquals(2, highestRated.size)
        assertEquals("HighRatedWine2", highestRated[0].name)
        assertEquals("HighRatedWine1", highestRated[1].name)
    }

    @Test
    fun finds_most_recently_scanned_wines() {
        val now = Instant.now()

        val mostRecentScans = sut.mostRecentlyScanned(2, listOf(
                ScannedWine("OldScan1", now.minus(1, DAYS)),
                ScannedWine("OldScan2", now.minus(12, HOURS)),
                ScannedWine("RecentScan1", now.minus(2, HOURS)),
                ScannedWine("RecentScan2", now.minus(1, HOURS))
        ))

        assertEquals(2, mostRecentScans.size)
        assertEquals("RecentScan2", mostRecentScans[0].name)
        assertEquals("RecentScan1", mostRecentScans[1].name)
    }

    @Test
    fun groups_different_vintages_from_same_winery() {
        val mostCollected = sut.mostCollected(2, listOf(
                WineAmount("winery1", "wine1", "2011", 1),
                WineAmount("winery1", "wine1", "2012", 2),
                WineAmount("winery1", "wine1", "2013", 3)
        ))

        assertEquals(1, mostCollected.size)
        assertEquals("winery1", mostCollected[0].winery)
        assertEquals("wine1", mostCollected[0].name)
        assertEquals("2011: 1, 2012: 2, 2013: 3", mostCollected[0].vintages)
    }

    @Test
    fun sorts_by_higest_total_number_across_vintages() {
        val mostCollected = sut.mostCollected(2, listOf(
                WineAmount("winery1", "wine1", "2011", 8),
                WineAmount("winery1", "wine1", "2012", 2),
                WineAmount("winery1", "wine1", "2013", 3),
                WineAmount("winery2", "wine2", "2011", 1),
                WineAmount("winery2", "wine2", "2012", 15)
        ))

        assertEquals(2, mostCollected.size)
        assertEquals("winery2", mostCollected[0].winery)
        assertEquals("wine2", mostCollected[0].name)
        assertEquals("2011: 1, 2012: 15", mostCollected[0].vintages)
        assertEquals("winery1", mostCollected[1].winery)
        assertEquals("wine1", mostCollected[1].name)
        assertEquals("2011: 8, 2012: 2, 2013: 3", mostCollected[1].vintages)
    }

    data class RatedWine(val name: String, override val rating: Double) : IRatedWine

    data class ScannedWine(val name: String, override val scanDate: Instant): IScannedWine

    data class WineAmount(override val winery: String, override val name: String, override val vintage: String?, override val numberOfBottles: Int): IWineAmount
}
