package ruter.realtime

class RealTimeRequest(val stopId: String = "3012130",
                      val wantedDirection: Int? = null,
                      val wantedLines: List<Int> = emptyList()) {

    fun acceptsDirection(actualDirection: String?): Boolean {
        if (actualDirection == null || wantedDirection == null) return true

        return actualDirection == wantedDirection.toString()
    }

    fun acceptsLine(actualLine: String?): Boolean {
        if (actualLine == null || wantedLines.isEmpty()) return true

        return wantedLines.contains(Integer.parseInt(actualLine));
    }

}
