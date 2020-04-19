package banometer

import entur.realtime.EnturController
import weather.WeatherController
import odeon.CinemaController
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.scheduling.annotation.EnableScheduling
import forecast.YrProxyController
import winesync.WineController

@SpringBootApplication(scanBasePackageClasses = [
    EnturController::class,
    MaintenanceController::class,
    YrProxyController::class,
    WeatherController::class,
    CinemaController::class,
    WineController::class
])
@EnableScheduling
open class Application {

    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }
}

