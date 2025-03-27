/**Given two strings s and t, find the minimum-length window in s that contains any anagram of t.

This is similar to the "minimum window substring" problem, but you only need to match the counts of characters in t
 (not the exact order). So any permutation (anagram) is fine.

🧠 Approach (Sliding Window + Frequency Maps):
Count the frequency of characters in t.

Use a sliding window of size up to t.length and track frequencies in s.

As soon as the window contains all characters with the correct count — i.e., forms an anagram —
  try to shrink from the left to get the smallest such window. */

  function minWindowAnagram(s, t) {
    if (t.length > s.length) return "";

    const needed = {};
    const window = {};

    for (let c of t) {
        needed[c] = (needed[c] || 0) + 1;
    }

    let left = 0, right = 0;
    let valid = 0;
    let minLen = Infinity, start = 0;
    const required = Object.keys(need).length;

    while (right < s.length) {
        const c = s[right];
        right++;

        if (c in needed) {
            window[c] = (window[c] || 0) + 1;
            if (window[c] === needed[c]) {
                valid++;
            }
        }

        // Try to shrink the window when valid
        while (valid === required) {
            if (right - left < minLen) {
                minLen = right - left;
                start = left;
            }

            const d = s[left];
            left++;

            if (d in needed) {
                if (window[d] === needed[d]) {
                    valid--;
                }
                window[d]--;
            }
        }
    }

    return minLen === Infinity ? "" : s.substring(start, start + minLen);
}
