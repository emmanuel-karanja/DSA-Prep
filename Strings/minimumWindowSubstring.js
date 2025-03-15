/**The Minimum Window Substring problem asks you to find the smallest contiguous substring in a given string s that contains all characters of another string t, 
 * including duplicates. 
 * 
 * Problem Statement: Given two strings s and t, return the minimum window substring of s that contains 
 *  all characters in t. If there is no such substring, return an empty string.
 * LOGIC:
 * 
 * We use the Sliding Window + Two Pointers technique:

1️. Create a Map for t where the key is the char and value is the character count in t.
2. Expand the right pointer (r) to include characters from s until all characters in t are present.
3. Contract the left pointer (l) to remove unnecessary characters while still containing t.
4. Track the smallest valid window found.
 * 
 * */

function minWindow(s, t) {
    if (s.length < t.length) return "";

    //Have a map that contains 
    let charMap = new Map();
    for (let char of t) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }

    let left = 0, right = 0, minLen = Infinity, minStart = 0;
    let required = charMap.size; // Unique chars in t
    let formed = 0; // Unique chars matched in window
    let windowCount = new Map();

    while (right < s.length) {
        let char = s[right];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);

        // We check if the character pointed to by right, is in t, and the count of it matches
        if (charMap.has(char) && windowCount.get(char) === charMap.get(char)) {
            formed++;
        }

      //If we have a such a window, we shrink it as much as possible.
        while (formed === required) { // Valid window found
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            let leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            if (charMap.has(leftChar) && windowCount.get(leftChar) < charMap.get(leftChar)) {
                formed--;
            }

            left++; // Shrink window
        }

        right++; // Expand window
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
