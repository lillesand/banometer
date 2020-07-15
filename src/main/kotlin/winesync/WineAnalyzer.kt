package winesync

import java.time.Instant
import kotlin.math.min

class WineAnalyzer {

    fun findDiff(winesFromVivino: WinesFromVivino, winesFromAirtable: WinesFromAirtable): Diff {
        val newWines = winesFromVivino.wines.filter { !winesFromAirtable.contains(it) }

        val changedAmount = winesFromAirtable.wines.map { airtableWine ->
            val vivinoWine = winesFromVivino.find(airtableWine)
            if (vivinoWine == null) {
                AmountDiff(airtableWine, 0)
            } else {
                AmountDiff(airtableWine, vivinoWine.numberOfBottles)
            }
        }.filter { it.hasDiff() }

        val potentialRenames = newWines.mapNotNull { vivinoWine ->
            changedAmount.filter { it.updatedAmount == 0 }.map { PotentialRename(it.displayName(), vivinoWine.displayName()) }
                    .sortedByDescending { it.levensthein }
                    .find { it.levensthein > 0.3 }

        }.sortedByDescending { it.levensthein }

        println(potentialRenames.joinToString("\n") { "${it.levensthein}: ${it.oldName} -> ${it.newName}" })

        return Diff(newWines, changedAmount)
    }

    data class PotentialRename(val oldName: String, val newName: String) {
        val levensthein: Double
            get() = biggestSimilarity(oldName, newName)
    }

    fun <T: RatedWine> highestRated(numberToReturn: Int, wines: List<T>): List<T> {
        return wines.sortedByDescending { it.rating }.subList(0, min(numberToReturn, wines.size))
    }

    fun <T: ScannedWine> mostRecentlyScanned(numberToReturn: Int, wines: List<T>): List<T> {
        return wines.sortedByDescending { it.scanDate }.subList(0, min(numberToReturn, wines.size))
    }

    fun mostCollected(numberToReturn: Int, wines: List<WineAmount>): List<WineAmountAcrossVintages> {
        val sortedByAmounts = wines.groupBy { it.winery + it.name }
                .entries.sortedByDescending { mapEntries -> mapEntries.value.map { wineAmount ->  wineAmount.numberOfBottles }.reduce { acc, nextAmount -> acc + nextAmount } }

        return sortedByAmounts.map { it.value }.map { amountsOfWine: List<WineAmount> ->
            val wine = amountsOfWine.first()
            val vintages = amountsOfWine.sortedBy { it.vintage }.map { "${it.vintage}: ${it.numberOfBottles}" }
            val totalBottles = amountsOfWine.map { it.numberOfBottles }.reduce { acc, i -> acc + i }

            WineAmountAcrossVintages(wine.winery, wine.name, totalBottles, vintages)
        }.subList(0, min(numberToReturn, sortedByAmounts.size))
    }

}

interface RatedWine {
    val rating: Double
}

interface ScannedWine {
    val scanDate: Instant
}

interface WineAmount {
    val winery: String
    val name: String
    val vintage: String?
    val numberOfBottles: Int
}

data class WineAmountAcrossVintages(override val winery: String, override val name: String, val totalAmount: Int, val vintages: List<String>): Wine {
    override val numberOfBottles: Int
        get() = totalAmount

    override val vintage: String? = null
}
