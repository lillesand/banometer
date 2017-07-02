package ruter.realtime;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class RuterService {

    private final ObjectMapper mapper;
	private final HttpClient httpClient;

	public RuterService() {
        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setPropertyNamingStrategy(new PropertyNamingStrategy.UpperCamelCaseStrategy());

		httpClient = HttpClientBuilder.create()
                .build();
	}

    public UpcomingDepartureToDowntown fetchRealtimeInformation() {
        try {
            HttpResponse response = httpClient.execute(new HttpGet("http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/3012130"));

            try (InputStream inputStream = response.getEntity().getContent()) {
                List<BusDepartureDto> departureDtos = mapper.readValue(inputStream, new TypeReference<List<BusDepartureDto>>() { });

                return new UpcomingDepartureToDowntown(departureDtos);
            }
        }
        catch (IOException e) {
            throw new RuterIOException(e);
        }
    }

}
