package exercise

import com.google.firebase.database.FirebaseDatabase
import firebase.FirebaseConfig
import java.util.concurrent.TimeUnit.SECONDS

class FirebaseTrainingClient {

    fun createTraining(person: String, training: Training) {
        val database = FirebaseDatabase.getInstance(FirebaseConfig.firebaseApp)
        val exerciseRef = database.getReference(FirebaseConfig.trainingPath((person)))
        exerciseRef.push().setValueAsync(training).get(5, SECONDS)
    }

}

fun main(args: Array<String>) {
    FirebaseTrainingClient().createTraining("jøran", Training(
        "lol", 10, 10000, 2, 1, 2021, "👍", "skiing"
    ))
}

data class Training(
    val date: String,
    val durationMinutes: Int?,
    val distanceMeters: Int?,
    val day: Int,
    val month: Int,
    val year: Int,
    val feeling: String?,
    val type: String
)
