/**Given a string s and a dictionary of words wordDict, return true if s can be segmented into
 *  a space-separated sequence of one or more dictionary words.
 * 
 * GOAL: Check if you can break the string into valid words from the dictionary.
 * 
 * RECURRENCE INTUITION
 * At every step, you ask:

Can I split the string at some position i such that:

The prefix s[0..i] is a word in the dictionary, and
The remaining part s[i+1..end] can be segmented (recursively)
 *  */

// Time O(2^n)
function wordBreakRecursive(s, wordDict) {
    const wordSet = new Set(wordDict); //for O(1) lookup

    function canBreak(start) {
        if (start === s.length) return true; //we are at the end

        //given the current start, keep adding one character to it until we find a word.
        for (let end = start + 1; end <= s.length; end++) {
            const prefix = s.slice(start, end);
            if (wordSet.has(prefix) && canBreak(end)) {
                return true;
            }
        }

        return false;
    }

    return canBreak(0);
}


//DP version Time O(n^2)

function wordBreakDP(s, wordDict) {
    const wordSet = new Set(wordDict); // O(1) lookup
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true; // Empty string is segmentable

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.slice(j, i))) {
                dp[i] = true;
                break; // No need to check further
            }
        }
    }

    return dp[s.length];
}

s = "leetcode"
wordDict = ["leet", "code"]
