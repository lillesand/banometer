package weather

data class PollenCountResponse(
        val cities: List<City>,
        val success: Boolean,
        val total_levels: Int
) {
    data class City(
            val days: List<Day>,
            val id: String,
            val lat: String,
            val lng: String,
            val name: String
    ) {
        data class Day(
                val allergens: List<Allergen>,
                val date: String,
                val message: String?,
                val name: String
        ) {
            data class Allergen(
                val level_description: String,
                val level_number: Int,
                val type: String
            )
        }
    }
}
