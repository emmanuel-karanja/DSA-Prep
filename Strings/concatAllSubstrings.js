/**Given a string s and an array of words words, 
 * return all starting indices of substrings in s that are concatenations of all words exactly once in any order.
 * 
 *1. Constraints and Observations
    - All words have the same length.
    - The total length of the concatenated substring is words.length * words[0].length.
    - The words can appear in any order, but each word must appear exactly once.

2. Sliding Window with Hash Map
    - Precompute the frequency of words in a hash map.
    - Slide a window of length total_length = words.length * word_length over s.
    - At each window start position:
    - Extract each word_length substring.
    - Check if it matches the required frequency.
    - If all words are matched, store the index.

3. Optimizations
   - Instead of checking every character in s, we only check every word boundary.
   - We shift the starting position from 0 to word_length - 1 to ensure we check all possible alignments.
   
   BUT IT'S A ROCK??
      > wordMap and currentMap below allow us to not care about the order of occurences of the words but rather
        the counts and hence takes care of duplicates.
    
    in a nutshell: We save the left index when currentMap is equal to wordMap, we can't do a direct comparison since
     currentMap and wordMap are really just references in memory.
   O(N)
   
**The idea of getting substring permutations of the words in the array is 
   theoretically possible but impractical due to the factorial explosion of permutations
   */

function findSubstring(s, words) {
    if (!s || words.length === 0) return [];
    
    let wordLen = words[0].length;
    let requiredCount = words.length; //basically we'veall them them or we could simply iterate over the wordMap and sum the values
    let wordMap = new Map();
    let result = [];

    // Step 1: Build the frequency map of words
    for (let word of words) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }

    // Step 2: Sliding window for each possible word alignment
    for (let i = 0; i < wordLen; i++) {
        let left = i, right = i;
        let currentWindowMap = new Map();
        let foundCount = 0;

        //iterate to the end, but we move in wordLen steps and not 1s.
        while (right + wordLen <= s.length) {
            // form a word from right to right+wordLen
            let word = s.substring(right, right + wordLen);
            right += wordLen; // Move window right

            if (wordMap.has(word)) { //the word has to first exist in the wordMap otherwise, we move on.
                currentWindowMap.set(word, (currentWindowMap.get(word) || 0) + 1);
                foundCount++; //we've found

                // If word frequency exceeds expected count, shift left, shrink window by advancing left
                while (currentWindowMap.get(word) > wordMap.get(word)) {
                    let leftWord = s.substring(left, left + wordLen);
                    //decrement word count from the currentWordMap
                    currentWindowMap.set(leftWord, currentWindowMap.get(leftWord) - 1);
                    left += wordLen; //advance left
                    foundCount--;
                }

                // If all words match, store the start index
                if (foundCount === requiredCount) {
                    result.push(left);
                }
            } else {
                // Reset the window when encountering an invalid word
                currentWindowMap.clear(); // I didn't know you could do this.
                foundCount = 0;
                left = right;
            }
        }
    }
    
    return result;
}

// Example usage
console.log(findSubstring("barfoothefoobarman", ["foo", "bar"])); // Output: [0, 9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])); // Output: []
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])); // Output: [6,9,12]
