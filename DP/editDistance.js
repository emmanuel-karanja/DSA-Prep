/**The Edit Distance problem (also known as Levenshtein Distance) 
 * finds the minimum number of operations needed to convert one string into another. */

function minEditDistance(word1, word2, i, j) {
    if (i === 0) return j; // If word1 is empty, insert all characters of word2
    if (j === 0) return i; // If word2 is empty, delete all characters of word1

    if (word1[i - 1] === word2[j - 1]) { //no operation is needed
        return minEditDistance(word1, word2, i - 1, j - 1);
    } else {
        return 1 + Math.min(
            minEditDistance(word1, word2, i - 1, j),    // Delete
            minEditDistance(word1, word2, i, j - 1),    // Insert
            minEditDistance(word1, word2, i - 1, j - 1) // Replace
        );
    }
}

// Example usage:
let word1 = "horse", word2 = "ros";
console.log(minEditDistance(word1, word2, word1.length, word2.length)); // Output: 3


function minEditDistanceDP(word1, word2) {
    let m = word1.length, n = word2.length;

    //basically read map each element of the array into an array filled with 0s
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i; // Convert word1 to empty string
    for (let j = 0; j <= n; j++) dp[0][j] = j; // Convert empty string to word2

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],    // Delete
                    dp[i][j - 1],    // Insert
                    dp[i - 1][j - 1] // Replace
                );
            }
        }
    }
    return dp[m][n];
}

// Example usage:
console.log(minEditDistanceDP("horse", "ros")); // Output: 3
