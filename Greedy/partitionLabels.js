/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given a string S of lowercase letters, partition the string into as many parts 
 * as possible so that each letter appears in at most one part. 
 * Return a list of integers representing the size of these parts.
 *
 * Intuition:
 * ----------
 * Each character's last occurrence determines how far we must extend a partition 
 * to include all instances of that character. By tracking the furthest last index 
 * encountered while scanning, we know the earliest point we can safely cut.
 *
 * Logic:
 * ------
 * 1. Traverse S once to record the last index of every character in an object `last`.
 * 2. Initialize `start = 0` and `end = 0`.
 * 3. Traverse S again:
 *    - Update `end` to the furthest last index seen for the current character.
 *    - If the current index `i` equals `end`, it means all characters in this partition 
 *      end by `end`. Append the partition size `(end - start + 1)` to the result array, 
 *      and set `start = i + 1` for the next partition.
 * 4. Return the result array.
 */

function partitionLabels(S) {
    const last = {};
    for (let i = 0; i < S.length; i++) {
            last[S[i]] = i;
    }

    const res = [];
    let start = 0, end = 0;
    
    for (let i = 0; i < S.length; i++) {
        end = Math.max(end, last[S[i]]);
        if (i === end) { 
            res.push(end - start + 1); 
            start = i + 1; 
        }
    }
    return res;
}

// -------- Driver Code --------
function main() {
    const S = "ababcbacadefegdehijhklij";
    const result = partitionLabels(S);
    console.log(`Input: "${S}"`);
    console.log(`Partition Sizes: ${result}`); // Expected: [9,7,8]
}

main();
