package ruter.realtime;


import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.time.ZoneId.systemDefault;

public class UpcomingDepartureToDowntown {

    public static final String DOWNTOWN_DIRECTION_NAME = "2";
    public static final String LINE = "5";

    private final Instant expectedDepartureTime;

    public UpcomingDepartureToDowntown(List<BusDepartureDto> departureDtos) {
        this.expectedDepartureTime = findNextDepartureInRightDirection(departureDtos);
    }

    private Instant findNextDepartureInRightDirection(List<BusDepartureDto> departureDtos) {
        Optional<BusDepartureDto> firstDepartingBus = departureDtos.stream()
                .filter(busDepartureDto -> DOWNTOWN_DIRECTION_NAME.equals(busDepartureDto.getDirectionName()))
                .filter(busDepartureDto -> LINE.equals(busDepartureDto.getPublishedLineName()))
                // Minimum expected departing time is the closest bus to leaving
                .min(Comparator.comparing(BusDepartureDto::getExpectedDepartureTime));

        if (!firstDepartingBus.isPresent()) {
            throw new NoBusAvailableException("Couldn't find bus in right direction: " + DOWNTOWN_DIRECTION_NAME + ". Departures: " + departureDtos);
        }
        else {
            return firstDepartingBus.get().getExpectedDepartureTime();
        }
    }

    @Override
    public String toString() {
        return String.format("Next departure is in %s minutes, at %s", getWaitingTimeInMinutes(), LocalTime.from(expectedDepartureTime.atZone(systemDefault())));
    }

    public int getWaitingTimeInMinutes() {
        return (int) Duration.between(Instant.now(), expectedDepartureTime).toMinutes();
    }

}
