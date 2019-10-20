package winesync

import com.fasterxml.jackson.annotation.JsonProperty

interface Wine {
    fun isSame(that: Wine): Boolean {
        return this.winery == that.winery && this.name == that.name && this.vintage == that.vintage
    }

    @JsonProperty("displayName")
    fun displayName(): String {
        val numberOfBottlesString = if(numberOfBottles == 1) "$numberOfBottles bottle" else "$numberOfBottles bottles"

        return "$numberOfBottlesString: $winery $name $vintage"
    }

    @JsonProperty("wineName")
    fun wine(): String {
        return "$winery $name ${vintage.orEmpty()}".trim()
    }

    val winery: String
    val name: String
    val vintage: String?
    val numberOfBottles: Int


}
