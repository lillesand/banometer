package firebase

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions

sealed class FirebaseConfig {

    companion object {

        fun photosPath(env: String): String {
            val envPrefix = if(env == "prod") "" else "/${env}"
            return "${envPrefix}/photos/jorbu"
        }

        fun photoPath(env: String, photoId: String): String {
            return "${photosPath(env)}/${photoId}"
        }


        fun trainingPath(person: String): String {
            return "/users/${person}/exercises"
        }

        val firebaseApp: FirebaseApp

        private val serviceAccount = FirebaseConfig::class.java.getResourceAsStream("/.secret/banometer-firebase-adminsdk.json");
        private val options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://banometer.firebaseio.com")
            .build();

        init {
            firebaseApp = FirebaseApp.initializeApp(options)
        }

    }
}
