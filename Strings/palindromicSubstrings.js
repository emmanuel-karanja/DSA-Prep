/*#*/
/**
 * Problem 46: Palindromic Substrings
 * Problem Statement:
 * Count all palindromic substrings in string.
 * Intuition:
 * Expand around center. 
 *
 * Logic:
 * 1. For each center (i, i) and (i, i+1), expand while palindrome 
 * and keep track of total count for both odd and even length palidromes
 */
function countSubstrings(s) {
    let count = 0;

    function expand (l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
             count++; 
             
             l--; 
             r++; 
        }
    }

    for (let i = 0; i < s.length; i++) { 
        expand(i, i); 
        expand(i, i+1); 
    }
    return count;
}