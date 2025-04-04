/** 
 * Given a string s, find the length of the longest substring that contains only unique characters.
 * 
 * Approach: Sliding Window + Two Pointers
 * 1️ Use a left pointer (l) and a right pointer (r) to maintain a dynamic window.
 * 2️ Expand r (right pointer) until we find a duplicate character.
 * 3️ Once a duplicate is found, move l to remove characters until uniqueness is restored.
 * 4️ Track the maximum length of a valid window.
 */
function longestUniqueSubstring(s) {
    let charSet = new Set(); // To store unique characters in the window
    let left = 0; // Left pointer of the window
    let maxLength = 0; // Maximum length of a valid substring found
    let startIdx = 0; // Starting index of the longest unique substring

    for (let right = 0; right < s.length; right++) {
        // While we find a duplicate, shrink the window by moving left pointer
        while (charSet.has(s[right])) {
            charSet.delete(s[left]); // Remove the character at the left pointer
            left++; // Shrink the window from the left
        }

        // Add the current character to the set (valid character in the window), we re-add it since the one
        //removed is the one pointed to by right.
        charSet.add(s[right]);

        // Update the maximum length and starting index of the longest substring
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            startIdx = left;
        }
    }

    // Get the longest substring using the start index and the max length
    const longestSubstring = s.substring(startIdx, startIdx + maxLength);
    return { length: maxLength, substring: longestSubstring };
}

// Example Driver Code
const s1 = "abcabcbb";
console.log(longestUniqueSubstring(s1)); 
// Output: { length: 3, substring: "abc" }

const s2 = "bbbbb";
console.log(longestUniqueSubstring(s2)); 
// Output: { length: 1, substring: "b
