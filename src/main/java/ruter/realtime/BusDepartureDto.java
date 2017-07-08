package ruter.realtime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.StringUtils;

import java.time.Instant;
import java.time.format.DateTimeFormatterBuilder;

@JsonIgnoreProperties({"Extensions", "FramedVehicleJourneyRef"})
public class BusDepartureDto {

    /**
     * retarded date strings
     */
    private Instant expectedDepartureTime;

    private String DestinationName, // E.g. "Bygdøy"
            DirectionName, // E.g. "2"
            PublishedLineName; // E.g. "30"

    public Instant getExpectedDepartureTime() {
        return expectedDepartureTime;
    }

    public void setExpectedDepartureTime(String expectedDepartureTime) {
        setExpectedDepartureTime(instant(expectedDepartureTime));
    }

    public void setExpectedDepartureTime(Instant expectedDepartureTime) {
        this.expectedDepartureTime = expectedDepartureTime;
    }

    public String getDestinationName() {
        return DestinationName;
    }

    public void setDestinationName(String destinationName) {
        DestinationName = destinationName;
    }

    public String getDirectionName() {
        return DirectionName;
    }

    public void setDirectionName(String directionName) {
        DirectionName = directionName;
    }

    public String getPublishedLineName() {
        return PublishedLineName;
    }

    public void setPublishedLineName(String publishedLineName) {
        PublishedLineName = publishedLineName;
    }

    private Instant instant(String aimedDepartureTime) {
        String millisString = StringUtils.substringBetween(aimedDepartureTime, "(", "+");
        long millisLong = Long.parseLong(millisString);
        return Instant.ofEpochMilli(millisLong);
    }

    @Override
    public String toString() {
        String departmentTime = new DateTimeFormatterBuilder().appendPattern("HH:mm").toFormatter().format(this.getExpectedDepartureTime());
        return this.getDestinationName() + "(" + this.getDirectionName() + "): " + departmentTime;
    }
}


