/**Given a string s, find the longest palindromic substring
 * 
 * LOGIC
 * We use a 2D DP table dp[i][j] that stores:
Whether the substring s[i..j] is a palindrome.

Transition Formula:
dp[i][j] = true if:
s[i] === s[j] AND

dp[i+1][j-1] is also true (i.e., the inside is a palindrome)

Special cases:

 - All 1-letter substrings are palindromes → dp[i][i] = true
 - 2 -letter substrings like "aa" are palindromes if both chars match


 * 
 */

function longestPalindrome(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(false));

    let start = 0;
    let maxLen = 1;

    // we start at the end because we want j to i to be the substring under consideration
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            //is a palindrome
            if (s[i] === s[j]) {
                if (j - i <= 2) { //where substring is a single letter or two letters that are thes same
                    dp[i][j] = true; // substrings of length 1 or 2
                } else {
                    dp[i][j] = dp[i + 1][j - 1]; //look at the previous one
                }

                if (dp[i][j] && (j - i + 1 > maxLen)) {
                    maxLen = j - i + 1;
                    start = i;
                }
            }
        }
    }

    return s.slice(start, start + maxLen);
}

longestPalindrome("babad"); // "bab" or "aba"
longestPalindrome("cbbd");  // "bb"
