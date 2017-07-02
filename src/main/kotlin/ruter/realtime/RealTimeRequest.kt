package ruter.realtime

class RealTimeRequest(val stopId: String = "3012130",
                      val wantedDirection: Int? = null,
                      val wantedLine: Int? = null) {

    fun acceptsDirection(actualDirection: String?): Boolean {
        if (actualDirection == null || wantedDirection == null) return true

        return actualDirection == wantedDirection.toString()
    }

    fun acceptsLine(actualLine: String?): Boolean {
        if (actualLine == null || wantedLine == null) return true

        return actualLine == wantedLine.toString();
    }

}
