package banometer

import entur.realtime.EnturController
import exercise.TrainingController
import netatmo.NetatmoController
import odeon.CinemaController
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import photos.PhotosController
import weather.MetController
import weather.YrProxyController
import winesync.WineController


@SpringBootApplication(scanBasePackageClasses = [
    EnturController::class,
    MaintenanceController::class,
    YrProxyController::class,
    MetController::class,
    NetatmoController::class,
    CinemaController::class,
    WineController::class,
    PhotosController::class,
    TrainingController::class
])
@EnableScheduling
@Configuration
@EnableWebMvc
open class Application {

    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }

    @Bean
    open fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**").allowedOrigins("*")
            }
        }
    }

}

