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
    fun ruter(): Movies {
        val movies = odeonApi.fetchMovies(LocalDateTime.now(), LocalDate.now().plusDays(3), listOf("LUXE"))
        val moviesByDate = movies.map { Movies.Movie(it.time, it.title, it.bookableSeats) }.groupBy { it.time.toLocalDate().format(DateTimeFormatter.ofPattern("dd.MM")) }
        return Movies(moviesByDate)
    }
}

data class Movies(val movies: Map<String, List<Movie>>) {

    data class Movie(@JsonIgnore val time: ZonedDateTime,
                     val show: String,
                     val freeSeats: String) {

        @JsonGetter
        fun getDisplayTime(): String {
            return time.plusHours(2).withZoneSameInstant(ZoneId.of("Europe/Oslo")).format(DateTimeFormatter.ofPattern("HH:mm"));
        }
    }
}

