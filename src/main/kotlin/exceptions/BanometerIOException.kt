package exceptions

import ruter.realtime.RuterException
import java.io.IOException

class BanometerIOException(e: IOException) : RuterException(e)
