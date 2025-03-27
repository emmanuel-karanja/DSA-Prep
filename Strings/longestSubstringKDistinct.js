/**USe a hashmap to keep track of a given character and count, if the size of the map is greater than k, try to shrink
 * the window.
 */

function lengthOfLongestSubstringKDistinct(s, k) {
    if (k === 0 || s.length === 0) return 0;

    let left = 0;
    let maxLen = 0;
    const charMap = new Map();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charMap.set(char, (charMap.get(char) || 0) + 1);

        while (charMap.size > k) {
            const leftChar = s[left];
            //decrement count
            charMap.set(leftChar, charMap.get(leftChar) - 1);
            if (charMap.get(leftChar) === 0) {
                charMap.delete(leftChar);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
