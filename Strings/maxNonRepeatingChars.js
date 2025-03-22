/**Given a string s, find the length of the longest substring that contains only unique characters
 *  (no repeating characters). 
 * 
 * LOGIC:
 * We can solve this problem efficiently using the Sliding Window + Two Pointers technique.

1️ Use a left pointer (l) and a right pointer (r) to maintain a dynamic window.
2️ Expand r (right pointer) until we find a duplicate character. How? We keep a set where every character
  encountered is stored and we check with every new character encountered is already in the set
3️ Once a duplicate is found, move l to remove characters until uniqueness is restored.
4️ Keep track of the maximum length of a valid window.
5.Left pointer points at the start of that sub-string.
 * */

function longestUniqueSubstring(s) {
    let charSet = new Set();
    let left = 0, maxLength = 0, startIdx = 0;
    let longestSubstring = "";

    for (let right = 0; right < s.length; right++) {
        //reduce the sliding wndow size
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }

        charSet.add(s[right]);

        // Update the longest substring when a new max length is found
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            startIdx = left;
        }
    }

    longestSubstring = s.substring(startIdx, startIdx + maxLength);
    return { length: maxLength, substring: longestSubstring };
}

