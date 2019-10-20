package winesync

import com.google.gson.annotations.SerializedName

class AirtableUpdateAmountPojo {

    @SerializedName("id")
    var id: String? = null

    @SerializedName("Bottles in cellar")
    var noBottles: Int? = null

    constructor() {}

    constructor(id: String, noBottles: Int?) {
        this.id = id
        this.noBottles = noBottles
    }

}
