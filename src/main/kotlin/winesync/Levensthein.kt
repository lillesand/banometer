package winesync

import kotlin.math.max
import kotlin.math.min

fun levenshtein(lhs : CharSequence, rhs : CharSequence) : Int {
    val lhsLength = lhs.length
    val rhsLength = rhs.length

    var cost = Array(lhsLength) { it }
    var newCost = Array(lhsLength) { 0 }

    for (i in 1 until rhsLength) {
        newCost[0] = i

        for (j in 1 until lhsLength) {
            val match = if(lhs[j - 1] == rhs[i - 1]) 0 else 1

            val costReplace = cost[j - 1] + match
            val costInsert = cost[j] + 1
            val costDelete = newCost[j - 1] + 1

            newCost[j] = min(min(costInsert, costDelete), costReplace)
        }

        val swap = cost
        cost = newCost
        newCost = swap
    }

    return cost[lhsLength - 1]
}

fun biggestSimilarity(lhs : CharSequence, rhs : CharSequence): Double {
    val levenshtein = levenshtein(lhs, rhs)
    val lhsSimilarity = (lhs.length - levenshtein).toDouble() / lhs.length.toDouble()
    val rhsSimilarity = (rhs.length - levenshtein).toDouble() / rhs.length.toDouble()
    return max(lhsSimilarity, rhsSimilarity)
}


fun main() {
    val left = "Gut Von Beiden Scheinwerfer 2015"
    val right = "Gut Von Beiden Scheinwerfer Weinschloss lol 2015"
    println(levenshtein(left, right))
    println(levenshtein(right, left))

    biggestSimilarity(left, right)
}
