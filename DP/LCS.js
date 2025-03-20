/**Longest Common Subsequence between two strings str1,str2 
 * 
 * LOGIC:
 * Idea
Given two strings text1 and text2, the LCS can be found by recursively:
 1. Matching characters: If text1[i] == text2[j], then the LCS expands by 1.
 2. Skipping a character: If text1[i] != text2[j], then the LCS is the maximum of:
      - Skipping a character from text1
      - Skipping a character from text2
*/

//Brute force Time O(2^n)
function LCSRecursive(text1, text2, i, j) {
    if (i == 0 || j == 0) return 0;
    
    if (text1[i - 1] === text2[j - 1]) {
        //matching, we remove one character from each
        return 1 + LCSRecursive(text1, text2, i - 1, j - 1);
    } else {
        return Math.max(LCSRecursive(text1, text2, i - 1, j), LCSRecursive(text1, text2, i, j - 1));
    }
}

// Example usage: Time 
let text1 = "abcde", text2 = "ace";
console.log(LCSRecursive(text1, text2, text1.length, text2.length)); // Output: 3


//Using DP O(mxn)
function longestCommonSubsequence(text1, text2) {
    let m = text1.length, n = text2.length;
    //this, take note
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                //we found matching, increase the sequence and descend
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                //either skip 1 from text1 or text 2
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    //return the bottom right corner
    return dp[m][n];
}

// Example usage:
console.log(longestCommonSubsequence("abcde", "ace")); // Output: 3
