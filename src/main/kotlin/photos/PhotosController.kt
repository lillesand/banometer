package photos

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDateTime

@Controller
class PhotosController {

    private val client = PhotosFirebaseClient()

    @RequestMapping(path = ["/photo/request"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun requestPhoto() {
        client.requestPhoto(LocalDateTime.now())
    }

    @RequestMapping(path = ["/photo/delete/{id}"], method = [ RequestMethod.POST ])
    @ResponseBody
    fun hidePhoto(@PathVariable("id") id: String) {
        client.hidePhoto(id)
    }

}
