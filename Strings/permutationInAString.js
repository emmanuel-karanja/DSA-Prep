/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1,
 * otherwise return false. In other words, check if s2 has any substring
 * that is an anagram of s1.
 * (LeetCode 567: Permutation in String)
 *
 * Example:
 *   s1 = "ab", s2 = "eidbaooo"
 *   Output: true
 *   Explanation: "ba" is a permutation of "ab".
 *
 * Intuition:
 * ----------
 * Use a sliding window of size equal to s1's length over s2. Maintain frequency
 * counts of characters for both s1 and the current window in s2. If at any point
 * the frequency arrays match, a permutation exists.
 *
 * Logic:
 * ------
 * 1. Initialize two frequency arrays of length 26 (for lowercase letters).
 * 2. Populate counts for s1 and the first window of s2.
 * 3. If the counts match, return true.
 * 4. Slide the window through s2:
 *    - Add the next character's count.
 *    - Remove the outgoing character's count.
 *    - Compare arrays. If they match, return true.
 * 5. If no match found, return false.
 *
 * Complexity:
 * -----------
 * - Time: O(m * 26) in worst case due to string comparisons, 
 *   but effectively O(m) where m = s2.length.
 * - Space: O(26) = O(1).
 */

function checkInclusion(s1, s2) {
    const a = Array(26).fill(0), b = Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);

    const n = s1.length;
    const m = s2.length;
    if (n > m) return false;

    // Count frequencies for s1 and the first window in s2
    for (let i = 0; i < n; i++) {
        a[s1.charCodeAt(i) - aCode]++;
        b[s2.charCodeAt(i) - aCode]++;
    }

    // Check initial window
    if (a.toString() === b.toString()) return true;

    // Slide the window through s2
    for (let i = n; i < m; i++) {
        b[s2.charCodeAt(i) - aCode]++;          // add new character
        b[s2.charCodeAt(i - n) - aCode]--;      // remove outgoing character
        if (a.toString() === b.toString()) return true;
    }

    return false;
}

// -------- Driver Code --------
function main() {
    const s1 = "ab";
    const s2 = "eidbaooo";
    const result = checkInclusion(s1, s2);
    console.log(`s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Does s2 contain a permutation of s1? ${result}`); // Expected: true
}

main();
