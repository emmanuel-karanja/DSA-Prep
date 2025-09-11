/**
 * Encode and Decode Strings
 *
 * Logic:
 * 1. Encoding:
 *    - For each string, prepend its length followed by '#' as a delimiter.
 *      Example: "hello" -> "5#hello"
 *    - Concatenate all encoded strings into one string.
 *
 * 2. Decoding:
 *    - Start from index 0 of the encoded string.
 *    - Read characters until '#' to get the length of the next string.
 *    - Extract the next 'length' characters as the original string.
 *    - Repeat until reaching the end of the encoded string.
 *
 * Benefits:
 * - Handles any characters in strings, including '#' or digits.
 * - Unambiguous: length prefix ensures correct decoding.
 * 
 * Time Complexity: O(n) for both encode and decode, where n = total characters
 * Space Complexity: O(n) for encoded string and result list
 */

class Codec {
    // Encodes a list of strings to a single string
    encode(strs) {
        let encoded = '';
        for (let s of strs) {
            encoded += s.length + '#' + s; // length prefix + delimiter + string
        }
        return encoded;
    }

    // Decodes a single string back to a list of strings
    decode(s) {
        let decoded = [];
        let i = 0;
        while (i < s.length) {
            // Find delimiter to get length of next string
            let j = i;
            while (s[j] !== '#') j++;
            let length = parseInt(s.slice(i, j));
            // Extract the string of given length
            let str = s.slice(j + 1, j + 1 + length);
            decoded.push(str);
            // Move index to start of next encoded string
            i = j + 1 + length;
        }
        return decoded;
    }
}

// Example usage
const codec = new Codec();
const original = ["hello", "world", "123#abc"];
const encoded = codec.encode(original);
console.log("Encoded:", encoded);
const decoded = codec.decode(encoded);
console.log("Decoded:", decoded); // ["hello", "world", "123#abc"]
