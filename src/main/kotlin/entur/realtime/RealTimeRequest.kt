package entur.realtime

class RealTimeRequest(val stops: List<String> = listOf("3012130"),
                      private val wantedQuay: String? = null,
                      val wantedLines: List<String> = emptyList()) {

    fun acceptsQuay(quay: String?): Boolean {
        if (wantedQuay == null || quay == null) return true

        return quay == wantedQuay
    }

    fun acceptsLine(actualLine: String?): Boolean {
        if (actualLine == null || wantedLines.isEmpty()) return true

        return wantedLines.contains(actualLine)
    }

}
