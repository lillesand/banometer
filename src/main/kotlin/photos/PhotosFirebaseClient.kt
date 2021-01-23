package photos

import com.google.firebase.database.FirebaseDatabase
import firebase.FirebaseConfig
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit.SECONDS

class PhotosFirebaseClient(val env: String = "") {

    fun requestPhoto(requestedAt: LocalDateTime) {
        val database = FirebaseDatabase.getInstance(FirebaseConfig.firebaseApp)
        val allPhotosRef = database.getReference(FirebaseConfig.photosPath(env))
        allPhotosRef.push().setValueAsync(PhotoRequest(requestedAt.toString())).get(5, SECONDS)
    }

    fun hidePhoto(id: String) {
        val database = FirebaseDatabase.getInstance(FirebaseConfig.firebaseApp)
        println(FirebaseConfig.photoPath(env, id))
        database.getReference(FirebaseConfig.photoPath(env, id))
            .updateChildrenAsync(mapOf(Pair("hidden", true))).get(5, SECONDS)
    }
}

fun main(args: Array<String>) {
    //PhotosFirebaseClient("test").requestPhoto(LocalDateTime.now())
    PhotosFirebaseClient("test/banometer").hidePhoto("-MQ1Zt76fCdgwwSNvox3")
}

data class PhotoRequest (
    val requested_at: String,
    val status: String = "REQUESTED"
)
