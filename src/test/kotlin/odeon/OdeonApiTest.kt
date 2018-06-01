package odeon

import org.junit.Test

class OdeonApiTest {

    @Test
    fun make_call() {
        val odeon = OdeonApi()
        val movies = odeon.fetchMovies()
        println(movies)
    }

}
