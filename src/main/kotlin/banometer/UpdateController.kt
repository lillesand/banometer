package banometer

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import kotlin.concurrent.thread

@Controller
class UpdateController {

    @RequestMapping(path = arrayOf("/update"), method = arrayOf(RequestMethod.POST))
    @ResponseBody
    fun update(): String {
        Runtime.getRuntime().exec(arrayOf("./scripts/start.sh", "5"))

        thread {
            // Allow request to return before restarting.
            Thread.sleep(100);
            System.exit(0);
        }.start()

        return "Okay, restarting.";
    }
}