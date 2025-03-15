/**Given a text T of length N and a pattern P of length M, find all occurrences of P in T.

BRUTE FORCE: SLIDING WINDOW
1. Slide the s window over t and compare the substring*/

 function findAllOccurrences(t, s) {
    const result = [];
    const textLength = t.length;
    const subLength = s.length;
    const count=0;

    // Edge cases: If s is empty or longer than t, return empty array
    if (subLength === 0 || subLength > textLength) return result;

    // Slide over the text and check for matches
    for (let i = 0; i <= textLength - subLength; i++) {
        if (t.substring(i, i + subLength) === s) {
            result.push(i);
            count++
        }
    }

    return {count:count, startIndices:result}
}

// Test cases
console.log(findAllOccurrences("mississippi", "iss")); 
console.log(findAllOccurrences("aaaaa", "aa"));       
console.log(findAllOccurrences("abc", "d"));          
console.log(findAllOccurrences("hello", ""));         
console.log(findAllOccurrences("", "abc"));           

/*Time O((t-s+1)xs) Space O(1)*/



/*Robin Karp: */

function rabinKarp(text, pattern) {
    let d = 256; // Base for hashing (ASCII character set)
    let q = 101; // Prime number to reduce hash collisions
    let M = pattern.length;
    let N = text.length;
    let pHash = 0; // Hash for pattern
    let tHash = 0; // Hash for text window
    let h = 1; // Value of d^(M-1)

    // Compute h = d^(M-1) % q
    for (let i = 0; i < M - 1; i++) {
        h = (h * d) % q;
    }

    // Compute initial hash values for pattern and first window of text
    for (let i = 0; i < M; i++) {
        pHash = (d * pHash + pattern.charCodeAt(i)) % q;
        tHash = (d * tHash + text.charCodeAt(i)) % q;
    }

    // Slide the window over text
    for (let i = 0; i <= N - M; i++) {
        // Check if hashes match, then compare actual substrings
        if (pHash === tHash) {
            if (text.substring(i, i + M) === pattern) {
                return i; // Return index of match
            }
        }

        // Compute hash for next window (except on last iteration)
        if (i < N - M) {
            tHash = (d * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + M)) % q;

            // Convert negative hash to positive
            if (tHash < 0) {
                tHash += q;
            }
        }
    }

    return -1; // No match found
}

// Test
console.log(rabinKarp("abcdefg", "def")); // Output: 3
console.log(rabinKarp("hello world", "world")); // Output: 6
console.log(rabinKarp("abcdefg", "xyz")); // Output: -1
