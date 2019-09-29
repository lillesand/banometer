package winesync

class WineAnalyzer {

    fun findDiff(winesFromVivino: WinesFromVivino, winesFromAirtable: WinesFromAirtable): Diff {
        val newWines = winesFromVivino.wines.filter { !winesFromAirtable.contains(it) }

        val drunkWines = winesFromAirtable.wines.filter { !winesFromVivino.contains(it) }

        val changedAmount = winesFromVivino.wines.mapNotNull {
            val airtableWine = winesFromAirtable.find(it)
            if (airtableWine == null) {
                null
            } else {
                AmountDiff(it, airtableWine as AirtableWine)
            }
        }.filter { it.hasDiff() }

        return Diff(newWines, drunkWines, changedAmount)
    }

    fun <T: RatedWine> highestRated(numberToReturn: Int, wines: List<T>): List<T> {
        return wines.sortedByDescending { it.rating }.subList(0, numberToReturn)
    }

}

interface RatedWine {
    val winery: String
    val name: String
    val vintage: String?
    val rating: Double
}
