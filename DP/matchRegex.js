/*#*/
/**
 * Problem Definition:
 * -------------------
 * Implement regular expression matching with support for '.' and '*'.
 * - '.' Matches any single character.
 * - '*' Matches zero or more of the preceding element.
 * Given a string s and pattern p, return true if p matches the entire string s.
 * (LeetCode 10: Regular Expression Matching)
 *
 * Example:
 *   s = "aab", p = "c*a*b" -> true
 *   Explanation: c* can match empty, a* matches "aa", and b matches "b".
 *
 * Intuition:
 * ----------
 * Use Dynamic Programming to build a table dp[i][j] indicating if the first i characters 
 * of s match the first j characters of p.
 * - Direct matches or '.' consume one character from both s and p.
 * - '*' can eliminate the preceding character (match zero times) or extend a match 
 *   if the preceding character matches the current character in s.
 *
 * Logic:
 * ------
 * 1. Initialize dp[m+1][n+1] with false; dp[0][0] = true (empty string matches empty pattern).
 * 2. Pre-fill dp[0][j] for patterns like a*, a*b*, etc. where '*' can eliminate pairs.
 * 3. Iterate i from 1..m and j from 1..n:
 *    - If p[j-1] matches s[i-1] or is '.', set dp[i][j] = dp[i-1][j-1].
 *    - If p[j-1] is '*', two possibilities:
 *        a. dp[i][j-2] (zero occurrences of preceding char).
 *        b. (p[j-2] matches s[i-1] or '.') && dp[i-1][j] (extend match).
 * 4. Return dp[m][n] as the result.
 */

function isMatch(s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    // Handle patterns with '*' that can match empty prefixes (e.g., a*, a*b*, etc.)
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    // Build the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] =
                    dp[i][j - 2] || // '*' matches zero of the preceding element
                    ((p[j - 2] === s[i - 1] || p[j - 2] === '.') && dp[i - 1][j]);
            }
        }
    }

    return dp[m][n];
}

// -------- Driver Code --------
function main() {
    const s = "aab";
    const p = "c*a*b";
    const result = isMatch(s, p);
    console.log(`String: "${s}", Pattern: "${p}"`);
    console.log(`Matches: ${result}`); // Expected: true
}

main();
