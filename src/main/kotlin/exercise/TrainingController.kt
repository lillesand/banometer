package exercise

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestMethod.POST

@Controller
class TrainingController {

    private val firebaseClient = TrainingFirebaseClient()

    @RequestMapping(path = ["/training/{person}"], method = [POST], consumes = ["application/json"])
    @ResponseBody
    fun excercises(@PathVariable person: String, @RequestBody training: Training) {
        firebaseClient.createTraining(person, training)
    }

}
