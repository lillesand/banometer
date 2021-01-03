package photos

import com.google.firebase.database.FirebaseDatabase
import firebase.FirebaseConfig
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit.SECONDS

class PhotosFirebaseClient {

    fun requestPhoto(requestedAt: LocalDateTime) {
        val database = FirebaseDatabase.getInstance(FirebaseConfig.firebaseApp)
        val allPhotosRef = database.getReference(FirebaseConfig.PHOTOS_PATH)
        allPhotosRef.push().setValueAsync(PhotoRequest(requestedAt.toString())).get(5, SECONDS)
    }
}

fun main(args: Array<String>) {
    PhotosFirebaseClient().requestPhoto(LocalDateTime.now())
}

data class PhotoRequest (
    val requested_at: String,
    val status: String = "REQUESTED"
)
