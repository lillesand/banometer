package winesync

import com.google.gson.annotations.SerializedName

class AirtableWinePojo {

    @SerializedName("Bottles in cellar")
    var noBottles: Int? = null

    @SerializedName("Country")
    var country: String? = null

    @SerializedName("Flasker uten plassering")
    var noUnplacedBottles: Int? = null

    @SerializedName("Vin")
    var wine: String? = null

    @SerializedName("id")
    var id: String? = null

    @SerializedName("Plasserte flasker")
    var noPlacedBottles: Int? = null

    @SerializedName("Region")
    var region: String? = null

    @SerializedName("Average rating")
    var averageRating: String? = null

    @SerializedName("Regional wine style")
    var wineStyle: String? = null

    @SerializedName("Vintage")
    var vintage: String? = null

    @SerializedName("Wine name")
    var name: String? = null

    @SerializedName("Wine type")
    var wineType: String? = null

    @SerializedName("Winery")
    var winery: String? = null

    constructor() {}

    constructor(id: String) {
        this.id = id
    }

    constructor(winery: String, name: String, vintage: String?, country: String?, region: String?, wineStyle: String?, wineType: String?, noBottles: Int?, averageRating: Double) {
        this.noBottles = noBottles
        this.country = country
        this.region = region
        this.wineStyle = wineStyle
        this.vintage = vintage
        this.name = name
        this.wineType = wineType
        this.winery = winery
        this.averageRating = averageRating.toString()
    }
}
