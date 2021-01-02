package exercise

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.FirebaseDatabase
import java.time.LocalDateTime

class PhotosFirebaseClient() {

    private val firebaseApp: FirebaseApp

    private val serviceAccount = this.javaClass.getResourceAsStream("/.secret/banometer-firebase-adminsdk.json");
    private val options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .setDatabaseUrl("https://banometer.firebaseio.com")
        .build();

    init {
        firebaseApp = FirebaseApp.initializeApp(options)
    }


    fun requestPhoto(requestedAt: LocalDateTime) {
        val database = FirebaseDatabase.getInstance(firebaseApp)
        val allPhotosRef = database.getReference("/test/banometer/photos/jorbu/")
        val newPhotoRequest = allPhotosRef.push()
        newPhotoRequest.setValueAsync(PhotoRequest(requestedAt.toString()))
    }

}

fun main(args: Array<String>) {
    PhotosFirebaseClient().requestPhoto(LocalDateTime.now())
    Thread.sleep(5000)
}

data class PhotoRequest (
    val requested_at: String,
    val status: String = "REQUESTED"
)
