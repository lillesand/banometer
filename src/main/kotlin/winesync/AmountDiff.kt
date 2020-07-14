package winesync

import com.fasterxml.jackson.annotation.JsonIgnore

data class AmountDiff(@JsonIgnore val airtableWine: AirtableWine, @JsonIgnore val updatedAmount: Int): Wine, AmountUpdate {
    override val airtableId: String
        get() = airtableWine.id!!
    val oldAmount: Int
        get() = airtableWine.numberOfBottles
    override val newAmount: Int
        get() = updatedAmount
    override val winery: String
        get() = airtableWine.winery
    override val name: String
        get() = airtableWine.name
    override val vintage: String?
        get() = airtableWine.vintage
    override val numberOfBottles: Int
        get() = airtableWine.numberOfBottles

    override fun displayName(): String {
        return "${super.displayName()} (Airtable: ${airtableWine.numberOfBottles} bottles)"
    }

    fun hasDiff(): Boolean {
        return updatedAmount != airtableWine.numberOfBottles
    }

}
