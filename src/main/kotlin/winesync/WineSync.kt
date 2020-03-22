package winesync

import java.io.InputStreamReader

class WineSync(vivinoProperties: VivinoProperties, airtableProperties: AirtableProperties) {

    private val airtable = AirtableWineService(airtableProperties)
    private val vivinoWebScraper = VivinoWebScraper(vivinoProperties)
    private val wineAnalyzer = WineAnalyzer()

    fun getWineStatus(): WineStatus {
        val winesFromVivino = vivinoWebScraper.getCellar()
        val winesFromAirtable = airtable.getWines()

        val highestRated = wineAnalyzer.highestRated(15, winesFromVivino.wines)
        val mostCollected = wineAnalyzer.mostCollected(15, winesFromVivino.wines)
        val mostRecentlyScanned = wineAnalyzer.mostRecentlyScanned(15, winesFromVivino.wines)

        val stats = Stats(highestRated, mostCollected, mostRecentlyScanned)
        val diff = wineAnalyzer.findDiff(winesFromVivino, winesFromAirtable)

        return WineStatus(diff, stats)
    }

    fun synchronizeVivinoAndAirtable(diff: Diff) {
        val newWinesToCreate = diff.newWines.map { AirtableWine(it.winery, it.name, it.vintage, it.regionalWineType, it.country, it.region, it.wineType, it.rating, it.numberOfBottles, noUnplacedBottles = null, noPlacedBottles = null, id = null) }
        airtable.saveNew(newWinesToCreate)
        airtable.remove(diff.drunkWines)
        airtable.updateAmounts(diff.changedAmount)
    }

}

data class WineStatus(val diff: Diff, val stats: Stats)

data class Stats(val highestRated: List<VivinoWine>, val mostCollected: List<WineAmountAcrossVintages>, val mostRecentlyScanned: List<VivinoWine>)

class Diff(val newWines: List<VivinoWine>, val drunkWines: List<AirtableWine>, val changedAmount: List<AmountDiff>) {
    fun getNumberOfBottlesNeedSync(): Int {
        return newWines.size + drunkWines.size + changedAmount.size
    }
}

data class VivinoProperties(val username: String, val userId: String) {

    val password = System.getenv("VIVINO_PASSWORD")
        ?: throw VivinoException("Vivino password must be set in environment variable VIVINO_PASSWORD")

}

data class AirtableProperties(val baseId: String)


