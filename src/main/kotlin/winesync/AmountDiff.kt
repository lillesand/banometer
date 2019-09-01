package winesync

import com.fasterxml.jackson.annotation.JsonIgnore

data class AmountDiff(@JsonIgnore val vivinoWine: VivinoWine, @JsonIgnore val airtableWine: AirtableWine): Wine, AmountUpdate {
    override val airtableId: String
        get() = airtableWine.id!!
    val oldAmount: Int
        get() = airtableWine.numberOfBottles
    override val newAmount: Int
        get() = vivinoWine.numberOfBottles
    override val winery: String
        get() = vivinoWine.winery
    override val name: String
        get() = vivinoWine.name
    override val vintage: String?
        get() = vivinoWine.vintage
    override val numberOfBottles: Int
        get() = vivinoWine.numberOfBottles

    override fun displayName(): String {
        return "${super.displayName()} (Airtable: ${airtableWine.numberOfBottles} bottles)"
    }

    fun hasDiff(): Boolean {
        return vivinoWine.numberOfBottles != airtableWine.numberOfBottles
    }

}
