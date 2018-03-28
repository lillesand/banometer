package banometer

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import kotlin.concurrent.thread

@Controller
class UpdateController {

    @RequestMapping(path = arrayOf("/update"), method = arrayOf(RequestMethod.POST))
    @ResponseBody
    fun update(): String {
        thread {
            // Allow some time for the request to return first
            Thread.sleep(100);

            Runtime.getRuntime().exec(arrayOf("./scripts/start.sh", "5"))
            System.exit(0);
        }

        return "Okay, restarting.";
    }
}