/**The problem requires us to find the longest contiguous substring that is a palindrome.
 *  A palindrome reads the same forward and backward.
 * 
 * LOGIC:
 * instead of generating all substrings, we expand around possible centers.

1.A palindrome has a center and expands outward symmetrically around each character
2.We consider both odd-length and even-length palindromes.
3.Start from each character and expand in both directions while characters match.
 *  */

function longestPalindrome(s) {
  if (s.length <= 1) return s; // Edge case: single character or empty string

  let maxLength = 0;
  let start = 0;

  // Helper function to expand around a center
  function expandAroundCenter(left, right) {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
          left--; 
          right++; 
      }
      //we do right-left-1 since the checking stops when left and right are too far left.
      //normally, we'd do right-left+1 to get length including, but since now left and right are a step
      //too far left and right, it'd be right-left+1-2 = right-left-1
      return right - left - 1; // Length of the palindrome
  }

  for (let i = 0; i < s.length; i++) {
      let oddLength = expandAroundCenter(i, i); // Odd-length palindrome
      let evenLength = expandAroundCenter(i, i + 1); // Even-length palindrome

      let currentLength = Math.max(oddLength, evenLength);

      if (currentLength > maxLength) {
          maxLength = currentLength;
          //because i is the center of the palindrome and we need to find the beginning of it, removing 1 caters
          //for odd lengths
          start = i - Math.floor((currentLength - 1) / 2);
      }
  }

  return s.substring(start, start + maxLength);
}

// Test cases
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"
console.log(longestPalindrome("a"));     // Output: "a"
console.log(longestPalindrome("racecar")); // Output: "racecar"
console.log(longestPalindrome("abcd"));  // Output: "a" (or any single character)
