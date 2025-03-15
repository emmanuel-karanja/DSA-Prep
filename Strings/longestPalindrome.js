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
    //edge case where the s has a single char
    if(s.length===1) return s;

     let maxLength=0;

     let start=0;

   //helper to expand around center
   function expandAroundCenter(left,right){
     
    //we are within bounds and have a palindrome
     if(left>0 && right < s.length && s[left]===s[right]){
         left--; right++; //expand
     }
     return right-left-1; //return the length of the current palindrome
   }

    //expand around each char
   for(let i=0;i<s.length-1;i++){
      let oddLength=expandAroundCenter(i,i); //odd
      let evenLength=expandAroundCenter(i,i+1); //even
      let currentLength=0;
      currentLength=Math.max(oddLength,evenLength)

     if(currentLength > maxLength){
         maxLength=currentLength;
         start=i - Math.floor((len - 1) / 2);
     }
   }

   return s.substring(start, start + maxLength)
   
}

//Time O(N^2) 

// Test
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"
