/*#/
/**
 * Problem Definition:
 * -------------------
 * Design an algorithm to encode a list of strings into a single string 
 * and decode that single string back into the original list.
 * This ensures special characters (e.g., '#') inside the strings don’t break decoding.
 * (LeetCode 271: Encode and Decode Strings)
 *
 * Example:
 *   Input: ["lint","code","love","you"]
 *   Encoded: "4#lint4#code4#love3#you"
 *   Decoded: ["lint","code","love","you"]
 *
 * Intuition:
 * ----------
 * Prefix each string with its length and a delimiter (e.g., "#"). 
 * During decoding, read the length, extract the following substring, 
 * and repeat until the string ends. Using lengths ensures even if a string 
 * contains '#', decoding remains unambiguous.
 *
 * Logic:
 * ------
 * Encode:
 *   - For each string s: append "len#s" to the result.
 *   - Join all parts into one big string.
 * Decode:
 *   - Iterate through the string:
 *     * Find '#' to locate the end of the length prefix.
 *     * Parse the length.
 *     * Extract the substring of that length after '#'.
 *     * Repeat until reaching the end.
 *
 * Complexity:
 * -----------
 * Time: O(N) for encoding and decoding combined, where N = total characters.
 * Space: O(N) for the result.
 */

function encode(strs) {
    // Encode each string as "length#string" and join them
    return strs.map(s => s.length + '#' + s).join('');
}

function decode(s) {
    const res = [];
    let i = 0;

    while (i < s.length) {
        // Find the delimiter '#'
        let j = i;
        while (s[j] !== '#') j++;

        // Parse the length of the next string
        const len = parseInt(s.slice(i, j), 10);

        // Extract the string of that length
        const str = s.slice(j + 1, j + 1 + len);
        res.push(str);

        // Move pointer to the start of the next encoded string
        i = j + 1 + len;
    }

    return res;
}

// -------- Driver Code --------
function main() {
    const strs = ["lint","code","love","you"];
    const encoded = encode(strs);
    const decoded = decode(encoded);

    console.log(`Original: ${JSON.stringify(strs)}`);
    console.log(`Encoded: "${encoded}"`);
    console.log(`Decoded: ${JSON.stringify(decoded)}`); // Expected: ["lint","code","love","you"]
}

main();
