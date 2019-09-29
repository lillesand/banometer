package winesync

import java.io.InputStreamReader

class WineSync(vivinoProperties: VivinoProperties, airtableProperties: AirtableProperties) {

    private val airtable = AirtableWineService(airtableProperties)
    private val vivinoWebScraper = VivinoWebScraper(vivinoProperties)
    private val wineAnalyzer = WineAnalyzer()

    fun getWineStatus(): Diff {
        val winesFromVivino = VivinoCsvReader().read(InputStreamReader(vivinoWebScraper.getCellar(), Charsets.UTF_8))

        val winesFromAirtable = airtable.getWines()

        return wineAnalyzer.findDiff(winesFromVivino, winesFromAirtable)
    }

    fun synchronizeVivinoAndAirtable(diff: Diff) {
        val newWinesToCreate = diff.newWines.map { AirtableWine(it.winery, it.name, it.vintage, it.regionalWineType, it.country, it.region, it.wineType, it.rating, it.numberOfBottles, noUnplacedBottles = null, noPlacedBottles = null, id = null) }
        airtable.saveNew(newWinesToCreate)
        airtable.remove(diff.drunkWines)
        airtable.updateAmounts(diff.changedAmount)
    }

}

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


