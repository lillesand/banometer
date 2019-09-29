package winesync

import com.fasterxml.jackson.annotation.JsonIgnore
import org.supercsv.cellprocessor.Optional
import org.supercsv.cellprocessor.ParseDate
import org.supercsv.cellprocessor.ParseDouble
import org.supercsv.cellprocessor.ParseInt
import org.supercsv.cellprocessor.constraint.NotNull
import org.supercsv.io.CsvMapReader
import org.supercsv.prefs.CsvPreference
import java.io.Reader
import java.time.Instant
import java.util.*
import kotlin.collections.ArrayList

class VivinoCsvReader {

    fun read(cellar: Reader): WinesFromVivino {
        val headers = arrayOf("Winery", "Wine name", "Vintage", "Region", "Country", "Regional wine style", "Average rating", "Scan date", null, null, null, null, null, "Wine type", null, null, null, null, "Bottles in cellar")
        val cellProcessors = arrayOf(NotNull(), NotNull(), Optional(), Optional(), Optional(), Optional(), ParseDouble(), ParseDate("yyyy-MM-dd HH:mm"), null, null, null, null, null, NotNull(), null, null, null, null, ParseInt())

        val csvReader = CsvMapReader(cellar, CsvPreference.STANDARD_PREFERENCE)

        csvReader.getHeader(true) // Skip headers
        val wines = ArrayList<VivinoWine>()
        var row = csvReader.read(headers, cellProcessors)
        while (row != null) {
            val scanDate = row["Scan date"] as Date
            wines.add(VivinoWine(
                    row["Winery"] as String,
                    row["Wine name"] as String,
                    row["Vintage"] as? String,
                    row["Region"] as String?,
                    row["Country"] as String?,
                    row["Regional wine style"] as String?,
                    row["Average rating"] as Double,
                    row["Wine type"] as String,
                    row["Bottles in cellar"] as Int,
                    Instant.ofEpochMilli(scanDate.time)))
            row = csvReader.read(headers, cellProcessors)
        }

        return WinesFromVivino(wines)
    }

}

data class VivinoWine(
        override val winery: String,
        override val name: String,
        override val vintage: String?,
        @JsonIgnore
        val region: String?,
        @JsonIgnore
        val country: String?,
        @JsonIgnore
        val regionalWineType: String?,
        override val rating: Double,
        @JsonIgnore
        val wineType: String,
        override val numberOfBottles: Int,
        override val scanDate: Instant) : Wine, RatedWine, WineAmount, ScannedWine

data class WinesFromVivino(override val wines: List<VivinoWine>): Wines
