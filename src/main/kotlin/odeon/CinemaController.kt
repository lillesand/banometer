package odeon

import com.fasterxml.jackson.annotation.JsonGetter
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

@Controller
class CinemaController {

    var odeonApi: OdeonApi = OdeonApi()

    @RequestMapping(path = arrayOf("/movies"), produces = arrayOf("application/json"))
    @ResponseBody
    fun movies(): Movies {
        val allMovies = odeonApi.fetchMovies(LocalDateTime.now(), LocalDate.now().plusDays(3), listOf("LUXE", "IMAX®"))
        val moviesByScreen = allMovies.groupBy { it.screen }

        val moviesByScreenAndDate = HashMap<String, Map<String, List<Movies.Movie>>>()

        moviesByScreen.entries.forEach {
            val screen = it.key
            val moviesByDate = it.value.map { Movies.Movie(it.time, it.title, it.bookableSeats) }
                    .groupBy { it.time.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM")) }
            moviesByScreenAndDate[screen] = moviesByDate
        }


        return Movies(moviesByScreenAndDate)
    }
}

data class Movies(val movies: Map<String, Map<String, List<Movies.Movie>>>) {

    data class Movie(@JsonIgnore val time: ZonedDateTime,
                     val show: String,
                     val freeSeats: String) {

        @JsonGetter
        fun getDisplayTime(): String {
            return time.plusHours(2).withZoneSameInstant(ZoneId.of("Europe/Oslo")).format(DateTimeFormatter.ofPattern("HH:mm"));
        }
    }
}

