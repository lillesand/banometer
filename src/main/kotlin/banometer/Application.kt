package banometer

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import ruter.realtime.RuterController

@SpringBootApplication(scanBasePackageClasses = arrayOf(RuterController::class, UpdateController::class))
open class Application {

    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }
}