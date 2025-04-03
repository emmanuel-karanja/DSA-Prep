/** 
 * Given a string s and an integer k, find the length of the longest substring that contains at most k distinct characters.
 * 
 * Approach: Sliding Window + HashMap
 * 1️ Use two pointers, `left` and `right`, to represent the window.
 * 2️ Expand the window by moving the `right` pointer and adding characters to the hash map.
 * 3️ If the number of distinct characters in the hash map exceeds `k`, move the `left` pointer to shrink the window.
 * 4️ Keep track of the maximum window size (i.e., longest substring).
 */
function lengthOfLongestSubstringKDistinct(s, k) {
    // Return 0 if there are no characters or k is 0
    if (k === 0 || s.length === 0) return 0;

    let left = 0; // Left pointer of the window
    let maxLen = 0; // Variable to track the maximum length
    const charMap = new Map(); // HashMap to store character frequencies

    for (let right = 0; right < s.length; right++) {
        const char = s[right]; // Current character at the right pointer
        charMap.set(char, (charMap.get(char) || 0) + 1); // Update the count of the character

        // If the size of the hashmap exceeds k, shrink the window from the left
        while (charMap.size > k) {
            const leftChar = s[left];
            charMap.set(leftChar, charMap.get(leftChar) - 1); // Decrease the count of the left character
            if (charMap.get(leftChar) === 0) {
                charMap.delete(leftChar); // Remove character from map if its count reaches zero
            }
            left++; // Shrink the window from the left
        }

        // Calculate the current window size and update maxLen if needed
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen; // Return the length of the longest substring with at most k distinct characters
}

// Example Driver Code:
console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // Output: 3 ("ece" or "ba")
console.log(lengthOfLongestSubstringKDistinct("aa", 1));    // Output: 2 ("aa")
console.log(lengthOfLongestSubstringKDistinct("a", 1));     // Output: 1 ("a")
console.log(lengthOfLongestSubstringKDistinct("abcbbbbcccbdddadacb", 3)); // Output: 7 ("bcbbbbc")
