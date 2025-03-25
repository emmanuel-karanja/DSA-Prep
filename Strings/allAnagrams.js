/**Given a string s and a smaller string p, find all the starting indices in s where an anagram of p begins.
 * 
 * LOGIC:
 * 
 * 1. Create a window of size p and sort the chars
 * 2. Slide along the string S and:
 *      - Sort all the characters of the window from left to right
 *      - compare with the sorted p.
 *      - if found add the left pointer to the array of starting indices.
 */

/**SIMPLE CASE WITH O(nlogn) due to sorting*/

function findAnagrams(s, p) {
    var result = [];
    var pLen = p.length;
    var sortedP = p.split('').sort().join('');

    for (var i = 0; i <= s.length - pLen; i++) {
        var window = s.substr(i, pLen);
        var sortedWindow = window.split('').sort().join('');
        if (sortedWindow === sortedP) {
            result.push(i);
        }
    }

    return result;
}

/**EFFICIENT  An anagram has the same letters with the same frequency, just in a different order.

So, we’ll:

1. Count the frequency of letters in p.

2. Use a sliding window over s of size p.length.

3. At every step, compare the letter counts in the current window with that of p.

NOTE: two strings are anagrams if their character counts match.

In this case, we don't have characters beyond 'e' and hence we don't have any markings from 6th to the 26th
they all remian 0.

*/

function findAnagrams(s, p) {
    const result = [];
    const pLength = p.length;
    const sLength = s.length;

    if (pLength > sLength) return result;

    // Initialize count arrays for 26 lowercase letters
    const pCount = Array(26).fill(0);
    const windowCount = Array(26).fill(0);

    const aCode = 'a'.charCodeAt(0);

    // Count characters in pattern p
    for (let i = 0; i < pLength; i++) {
        //p.charCodeAt(i) - aCode gives us the index of the character in the 26 element array.
        // i.e. we assume a will be index 0, b at index 1 etc
        pCount[p.charCodeAt(i) - aCode]++;
        windowCount[s.charCodeAt(i) - aCode]++;
    }

    console.log("pCount",pCount)
    console.log("sCount",windowCount)

    // Compare first window
    if (arraysMatch(pCount, windowCount)) result.push(0);

    // Slide the window
    for (let i = pLength; i < sLength; i++) {
        
        // Add new char to window
        windowCount[s.charCodeAt(i) - aCode]++;
        // Remove leftmost char from window
        // i-pLength is the character leavin the window
        windowCount[s.charCodeAt(i - pLength) - aCode]--;

        // Compare window with pattern count
        if (arraysMatch(pCount, windowCount)) {
            result.push(i - pLength + 1);
        }
        console.log("iter: ",i,"sCount:",windowCount)
    }

    return result;
}

function arraysMatch(arr1, arr2) {
    for (var i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}


const s = "cbazabczbabaczd"
const p = "abcz"

console.log(findAnagrams(s,p))