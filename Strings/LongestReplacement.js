/**Given a string s and an integer k, return the length of the longest substring that can be obtained by
 *  replacing at most k characters to make all characters in the substring the same.
 * 
 * LOGIC
 * 
 * This sounds like a problem of finding the substring with the most repeated number of chars
 * and then, making sure the window they fit in has k more characters.
 * 
 *  */

function characterReplacement(s, k) {
    const freq = {};
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        freq[char] = (freq[char] || 0) + 1;

        maxFreq = Math.max(maxFreq, freq[char]);

        let windowSize=right-left+1;
        // check if the window is valid, we reduce the size of the window regardless of whether we 
        //leave out some of the maxFreq chars.
        while (windowSize - maxFreq > k) {
            let leftChar=s[left];
            //reduce windowSize
            freq[leftChar]--;
            left++;
        }


        maxLength = Math.max(maxLength, windowSize);
    }

    return maxLength;
}


//My modification to return the substring fyi s.substring(i,end) and s.slice(i,end) give the same result

function characterReplacementSubstring(s, k) {
    const freq = {};
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;
    let maxStart=0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        freq[char] = (freq[char] || 0) + 1;

        maxFreq = Math.max(maxFreq, freq[char]);

        let windowSize=right-left+1;
        // check if the window is valid
        while (windowSize - maxFreq > k) {
            let leftChar=s[left];
            //reduce windowSize
            freq[leftChar]--;
            left++;
        }

        
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            maxStart = left;
        }
    }

    return [maxLength,s.slice(maxStart,maxStart+maxLength)];

}