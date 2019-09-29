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



}
