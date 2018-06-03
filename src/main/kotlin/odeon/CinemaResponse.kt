package odeon

import java.time.ZonedDateTime


data class CinemaResponse(
    val totalNbrOfItems: Int,
    val items: List<Item>
) {
    data class Item(
        val time: ZonedDateTime,

        // These identify the booking system
        val remoteSystemAlias: String,
        val remoteEntityId: String,
        // That's where we find the booking status!

        val movie: Movie,
        val movieVersion: MovieVersion,
        val cinema: Cinema,
        val screen: Screen
    ) {
        data class Cinema(
            val ncgId: String,
            val title: String
        ) {
        }
        data class Screen(
            val title: String
        )
        data class Movie(
            val title: String,
            val releaseDate: String,
            val posterUrl: String,
            val length: Int,
            val images: List<Image>,
            val genres: List<Genre>
        ) {
            data class Image(
                val id: String,
                val imageType: String,
                val contentType: String,
                val url: String,
                val alternatives: List<Alternative>
            ) {
                data class Alternative(
                    val contentType: String,
                    val url: String
                )
            }
            data class Genre(
                val name: String
            )
        }
        data class MovieVersion(
            val ncgId: String,
            val movieNcgId: String,
            val remoteSystemAlias: String,
            val remoteEntityId: String,
            val title: String,
            val slug: String
        )
    }
}