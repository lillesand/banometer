package exceptions

import java.io.IOException

class BanometerIOException(e: IOException) : RuntimeException(e)
