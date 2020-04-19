package weather

data class PollenCountForDay(
        val allergens: List<Allergen>,
        val date: String,
        val name: String) {

        data class Allergen(
            val level_description: String,
            val level_number: Int,
            val type: String
        )
}
