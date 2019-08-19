package winesync

import org.supercsv.cellprocessor.Optional
import org.supercsv.cellprocessor.ParseDouble
import org.supercsv.cellprocessor.ParseInt
import org.supercsv.cellprocessor.constraint.NotNull
import org.supercsv.io.CsvMapReader
import org.supercsv.prefs.CsvPreference
import java.io.InputStreamReader
import java.io.Reader

class VivinoCsvReader {

    fun read(cellar: Reader): WinesFromVivino {
        val headers = arrayOf("Winery", "Wine name", "Vintage", "Region", "Country", "Regional wine style", "Average rating", null, null, null, null, null, null, "Wine type", null, null, null, null, "Bottles in cellar")
        val cellProcessors = arrayOf(NotNull(), NotNull(), Optional(), Optional(), Optional(), Optional(), ParseDouble(), null, null, null, null, null, null, NotNull(), null, null, null, null, ParseInt())

        val csvReader = CsvMapReader(cellar, CsvPreference.STANDARD_PREFERENCE)

        csvReader.getHeader(true) // Skip headers
        val wines = ArrayList<VivinoWine>()
        var row = csvReader.read(headers, cellProcessors)
        while (row != null) {
            wines.add(VivinoWine(
                    row["Winery"] as String,
                    row["Wine name"] as String,
                    row["Vintage"] as? String,
                    row["Region"] as String?,
                    row["Country"] as String?,
                    row["Regional wine style"] as String?,
                    row["Average rating"] as Double,
                    row["Wine type"] as String,
                    row["Bottles in cellar"] as Int
            ))
            row = csvReader.read(headers, cellProcessors)
        }

        return WinesFromVivino(wines)
    }

}

data class VivinoWine(
        override val winery: String,
        override val name: String,
        override val vintage: String?,
        val region: String?,
        val country: String?,
        val regionalWineType: String?,
        val rating: Double,
        val wineType: String,
        override val numberOfBottles: Int) : Wine

data class WinesFromVivino(override val wines: List<VivinoWine>): Wines
