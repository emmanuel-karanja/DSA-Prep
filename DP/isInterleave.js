/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given three strings s1, s2, and s3, determine if s3 is formed by an interleaving 
 * of s1 and s2. Interleaving means s3 can be formed by merging s1 and s2 in a way 
 * that preserves the order of characters from each string.
 * (LeetCode 97: Interleaving String)
 *
 * Example:
 *   s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 *   Output: true
 *   Explanation: s3 can be formed by taking characters from s1 and s2 in order.
 *
 * Intuition:
 * ----------
 * Use dynamic programming to decide whether prefixes of s1 and s2 can form a 
 * prefix of s3. If a prefix of s3 ends with a character from s1 or s2, 
 * check whether removing that character leaves a smaller interleaving problem 
 * that is already solvable.
 *
 * Logic:
 * ------
 * 1. If lengths don’t match (s1.length + s2.length !== s3.length), return false.
 * 2. Define a DP table dp[m+1][n+1] where dp[i][j] indicates whether the first i 
 *    characters of s1 and first j characters of s2 can form the first i+j characters of s3.
 * 3. Base case: dp[0][0] = true (empty strings match).
 * 4. Fill the table:
 *    - If s1[i-1] == s3[i+j-1], inherit dp[i-1][j].
 *    - If s2[j-1] == s3[i+j-1], inherit dp[i][j-1].
 *    - Use logical OR because either choice may lead to a match.
 * 5. Return dp[m][n] as the final answer.
 */

function isInterleave(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;
    const m = s1.length, n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) {
                dp[i][j] = dp[i][j] || dp[i - 1][j];
            }
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) {
                dp[i][j] = dp[i][j] || dp[i][j - 1];
            }
        }
    }

    return dp[m][n];
}

// -------- Driver Code --------
function main() {
    const s1 = "aabcc";
    const s2 = "dbbca";
    const s3 = "aadbbcbcac";
    const result = isInterleave(s1, s2, s3);
    console.log(`s1: "${s1}", s2: "${s2}", s3: "${s3}"`);
    console.log(`Is interleaving: ${result}`); // Expected: true
}

main();
