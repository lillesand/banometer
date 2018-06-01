package odeon



data class NumberOfSeatsRequest(
    val showRemoteEntityIds: List<ShowRemoteEntityId>
) {

    data class ShowRemoteEntityId(
        val value: String
    )
}