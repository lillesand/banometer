package photos

import exercise.PhotosFirebaseClient
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDateTime

@Controller
class PhotosController {

    private val client = PhotosFirebaseClient()

    @RequestMapping(path = ["/request_photo"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun requestPhoto() {
        client.requestPhoto(LocalDateTime.now())
    }

}
