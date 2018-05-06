package ruter.realtime

open class RuterException : RuntimeException {
    constructor(e: Exception) : super(e) {}

    constructor(s: String) : super(s) {}
}
