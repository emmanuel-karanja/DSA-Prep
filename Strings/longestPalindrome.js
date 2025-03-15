/**The problem requires us to find the longest contiguous substring that is a palindrome.
 *  A palindrome reads the same forward and backward.
 * 
 * LOGIC:
 * instead of generating all substrings, we expand around possible centers.

1.A palindrome has a center and expands outward symmetrically.
2.We consider both odd-length and even-length palindromes.
3.Start from each character and expand in both directions while characters match.
 *  */

function longestPalindrome(s) {
    if (s.length < 2) return s; // Edge case: single character or empty string.

    let start = 0, maxLength = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--; right++; // Expand outward
        }
        return right - left - 1; // Length of palindrome found
    }

    for (let i = 0; i < s.length; i++) {
        let oddLen = expandAroundCenter(i, i);       // Odd-length palindrome (single center)
        let evenLen = expandAroundCenter(i, i + 1);  // Even-length palindrome (double center)
        let len = Math.max(oddLen, evenLen);

        if (len > maxLength) {
            maxLength = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLength);
}

//Time O(N^2) 

// Test
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"
