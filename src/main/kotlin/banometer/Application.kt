package banometer

import odeon.CinemaController
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import ruter.realtime.RuterController
import weather.YrProxyController

@SpringBootApplication(scanBasePackageClasses = [ RuterController::class, MaintenanceController::class, YrProxyController::class, CinemaController::class ])
open class Application {

    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }
}
