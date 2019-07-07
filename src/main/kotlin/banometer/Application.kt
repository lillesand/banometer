package banometer

import entur.realtime.EnturController
import odeon.CinemaController
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import weather.YrProxyController

@SpringBootApplication(scanBasePackageClasses = [ EnturController::class, MaintenanceController::class, YrProxyController::class, CinemaController::class ])
open class Application {

    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }
}

