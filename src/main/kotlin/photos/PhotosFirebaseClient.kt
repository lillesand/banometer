package photos

import com.google.firebase.database.FirebaseDatabase
import firebase.FirebaseConfig
import java.time.LocalDateTime

class PhotosFirebaseClient {

    fun requestPhoto(requestedAt: LocalDateTime) {
        val database = FirebaseDatabase.getInstance(FirebaseConfig.firebaseApp)
        val allPhotosRef = database.getReference(FirebaseConfig.PHOTOS_PATH)
        allPhotosRef.push().setValueAsync(PhotoRequest(requestedAt.toString()))
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
