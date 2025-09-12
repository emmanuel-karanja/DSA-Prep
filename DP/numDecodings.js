/*#*/
/**
 * Problem Definition:
 * -------------------
 * A message containing letters A-Z is encoded into numbers using the mapping:
 *    'A' -> "1", 'B' -> "2", ..., 'Z' -> "26".
 * Given a string s containing only digits, return the number of ways to decode it.
 * (LeetCode 91: Decode Ways)
 *
 * Example:
 *   s = "226" -> Output: 3
 *   Explanation: "2 2 6" -> "BBF", "22 6" -> "VF", "2 26" -> "BZ"
 *
 * Intuition:
 * ----------
 * Dynamic Programming is ideal because the number of decodings for a prefix 
 * depends on its previous states:
 * - Single-digit decode: If the current digit is not '0', add ways from dp[i-1].
 * - Double-digit decode: If the two-digit number is between 10 and 26, add ways from dp[i-2].
 *
 * Logic:
 * ------
 * 1. Let dp[i] = number of ways to decode substring s[0..i-1].
 * 2. Initialize:
 *    - dp[0] = 1 (empty string has one way).
 * 3. For each position i (1..n):
 *    - If s[i-1] != '0', then dp[i] += dp[i-1] (valid single-digit decode).
 *    - If two-digit number s[i-2..i-1] ∈ [10,26], then dp[i] += dp[i-2].
 * 4. Return dp[n] (total ways to decode entire string).
 */

function numDecodings(s) {
    const n = s.length;
    const dp = Array(n + 1).fill(0);
    dp[0] = 1; // Base case: empty string has one decoding

    for (let i = 1; i <= n; i++) {
        // Single-digit decode
        if (s[i - 1] !== '0') dp[i] += dp[i - 1];

        // Double-digit decode
        if (i > 1) {
            const twoDigit = parseInt(s.slice(i - 2, i), 10);
            if (twoDigit >= 10 && twoDigit <= 26) {
                dp[i] += dp[i - 2];
            }
        }
    }
    return dp[n];
}

// -------- Driver Code --------
function main() {
    const s = "226";
    const result = numDecodings(s);
    console.log(`String: "${s}"`);
    console.log(`Number of decodings: ${result}`); // Expected: 3
}

main();
