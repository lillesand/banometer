package winesync

import com.fasterxml.jackson.annotation.JsonIgnore
import com.sybit.airtable.Airtable

class AirtableWineService(airtableProperties: AirtableProperties) {

    private val airtable = Airtable().configure()
    private val vinTable = airtable.base(airtableProperties.baseId).table("Vin", AirtableWinePojo::class.java)

    fun getWines(): WinesFromAirtable {
        @Suppress("UNCHECKED_CAST")
        val winePojos = vinTable.select() as List<AirtableWinePojo>
        val wines = winePojos.map {
            try {
                val averageRating = it.averageRating!!.replace(",", ".").toDouble()
                AirtableWine(it.winery!!, it.name!!, it.vintage, it.wineType, it.country, it.region, it.wineStyle, averageRating, it.noBottles!!, it.noUnplacedBottles, it.noPlacedBottles, it.id)
            } catch (e: IllegalStateException) {
                println("Failed to parse data from Airtable, probably because of unexpeted null field. Failed on ${it.winery} ${it.name}")
                throw e
            }
        }
        return WinesFromAirtable(wines)
    }

    fun saveNew(newWines: List<AirtableWine>) {
        newWines.forEach {
            val pojo = AirtableWinePojo(it.winery, it.name, it.vintage, it.country, it.region, it.wineStyle, it.wineType, it.numberOfBottles, it.averageRating)
            vinTable.create(pojo)

            Thread.sleep(100) // Max 5 calls per second. This should definitely do.
        }
    }

    fun remove(winesToRemove: List<AirtableWine>) {
        winesToRemove.forEach {
            vinTable.destroy(it.id)

            Thread.sleep(100) // Max 5 calls per second. This should definitely do.
        }
    }

    fun updateAmounts(changedAmount: List<AmountUpdate>) {
        changedAmount
                .forEach {
                    vinTable.update(AirtableUpdateAmountPojo(it.airtableId, it.newAmount))
                }
    }
}

interface AmountUpdate {
    val airtableId: String
    val newAmount: Int

    fun displayName(): String
}

data class AirtableWine(
        override val winery: String,
        override val name: String,
        override val vintage: String?,
        @JsonIgnore
        val wineType: String?,
        @JsonIgnore
        val country: String?,
        @JsonIgnore
        val region: String?,
        @JsonIgnore
        val wineStyle: String?,
        @JsonIgnore
        val averageRating: Double,
        override val numberOfBottles: Int,
        @JsonIgnore
        val noUnplacedBottles: Int?,
        @JsonIgnore
        val noPlacedBottles: Int?,
        @JsonIgnore
        val id: String?
) : Wine

data class WinesFromAirtable(override val wines: List<AirtableWine>): Wines
