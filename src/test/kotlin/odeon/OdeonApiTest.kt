package odeon

import org.junit.Test
import java.time.LocalDate
import java.time.LocalDateTime

class OdeonApiTest {

    @Test
    fun make_call() {
        val odeon = OdeonApi()
        val movies = odeon.fetchMovies(LocalDateTime.now(), LocalDate.now().plusDays(3), listOf("LUXE"))
        println(movies)
    }

}
