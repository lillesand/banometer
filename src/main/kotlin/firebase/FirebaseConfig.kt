package firebase

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions

sealed class FirebaseConfig {

    companion object {

        const val PHOTOS_PATH: String = "/photos/jorbu"

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
