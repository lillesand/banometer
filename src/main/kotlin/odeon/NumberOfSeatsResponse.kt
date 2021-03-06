package odeon



data class NumberOfSeatsResponse(
    val showRemoteEntityId: String,
    val status: Status,
    val isReservable: Boolean
) {
    data class Status(
        val free: Int,
        val sold: Int,
        val reserved: Int,
        val locked: Int
    )
}
