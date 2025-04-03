/** 
 * Given two strings s and t, find the minimum-length window in s that contains any anagram of t.
 * 
 * Approach: Sliding Window + Frequency Maps
 * - Count the frequency of characters in t.
 * - Use a sliding window to track frequencies of characters in s.
 * - Once the window contains all characters from t (matching frequencies), 
 *   try to shrink from the left to get the smallest such window.
 */
function minWindowAnagram(s, t) {
    // Return an empty string if t is longer than s
    if (t.length > s.length) return "";

    // Frequency map for characters needed from t
    const needed = {};
    // Frequency map for the current window in s
    const window = {};

    // Populate the needed frequency map for characters in t
    for (let c of t) {
        needed[c] = (needed[c] || 0) + 1;
    }

    let left = 0; // Left pointer of the sliding window
    let right = 0; // Right pointer of the sliding window
    let valid = 0; // Count of valid characters in the current window
    let minLen = Infinity; // Minimum length of the valid window
    let start = 0; // Start index of the minimum window

    // The number of unique characters needed to form an anagram of t
    const required = Object.keys(needed).length;

    // Start sliding the window
    while (right < s.length) {
        const c = s[right]; // Current character at the right pointer
        right++;

        // If the character is in t, update the window frequency map
        if (c in needed) {
            window[c] = (window[c] || 0) + 1;
            // If the current window contains the exact count of this character, it's valid
            if (window[c] === needed[c]) {
                valid++;
            }
        }

        // When all characters are valid (i.e., the window contains an anagram)
        while (valid === required) {
            // Try to shrink the window to find the minimum length
            if (right - left < minLen) {
                minLen = right - left;
                start = left;
            }

            const d = s[left]; // Character at the left pointer to be removed
            left++;

            // If the character is in t, update the window frequency map
            if (d in needed) {
                if (window[d] === needed[d]) {
                    valid--;
                }
                window[d]--;
            }
        }
    }

    // If no valid window was found, return an empty string
    return minLen === Infinity ? "" : s.substring(start, start + minLen);
}

// Example Driver Code
const s = "ADOBECODEBANC";
const t = "ABC";

console.log(minWindowAnagram(s, t)); // Output: "BANC"

const s2 = "AA";
const t2 = "AA";
console.log(minWindowAnagram(s2, t2)); // Output: "AA"

const s3 = "A";
const t3 = "AA";
console.log(minWindowAnagram(s3, t3)); // Output: ""

